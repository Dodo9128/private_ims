import { catchError, firstValueFrom } from "rxjs";
import {Inject, Logger} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Node } from '../entities/node.entity';
import { Venue } from "../entities/venue.entity";
import {System} from "../entities/system.entity";

import { NodeMapper } from "./node.mapper";
import { ScaleMapper } from "../scale/scale.mapper";
import { NodeRepository } from "./node.repository";
import { EventRepository } from "../web/event/event.repository";
import { SystemRepository } from "../system/system.repository";
import { CodeCommonRepository} from "../code/CodeCommon.repository";
import { WorldCountryRepository } from "../world/world.repository";
import { VenueRepository } from "../venue/venue.repository";
import {
  APIMethod,
  ApplicationConstants,
  instanceStatus,
  IsYN,
  mlType,
  nodeStatus,
  nodeType
} from "../global/commonCode";

import { makeSuccessPaging } from "../util/ajaxreturn.util";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import {WorldCountry} from "../entities/worldCountry.entity";

export class NodeService {
  private readonly logger = new Logger(NodeService.name);
  constructor(
    @InjectRepository(NodeRepository)
    private nodeRepository: NodeRepository,
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    //@InjectRepository(CodeCommonRepository)
    //private codeCommonRepository: CodeCommonRepository,
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
    private nodeMapper: NodeMapper,
    private scaleMapper: ScaleMapper,
    private readonly httpService: HttpService,
    private venueRepository: VenueRepository,
    //private worldCountryRepository: WorldCountryRepository,
  ) {}

  public async scaleOut4DSS(
    systemId: string,
    instanceId: string,
    privateIp: string,
    privatePort: number,
    initialStateValue: string,
    region: string
  ) {
    //const regionCode = this.codeCommonRepository.findByCode(region);
/*    if (regionCode === null) {
      const system: System = this.systemRepository.findById(systemId);
      const venue: Venue = this.venueRepository.findById(system.venue_id);
      //const worldCountry: WorldCountry = this.worldCountryRepository.findById(venue.country_id.toString());

      let regionCode
    }*/
  }
  async listNode(params: Map<string, any>): Promise<Map<string, any>> {
    return makeSuccessPaging(await this.nodeMapper.listNode(params));
  }

  async insertNode(
    params: Map<string, any>,
  ): Promise<Node> {

    let node: Node = new Node();
    let isAutoScaleOut: string;
    let nodeId: string = await this.nodeRepository.makeNodeId(params.get("system_id"));
    let items: Node = null;

    if (params.get("is_auto_scale_out") === null) {
      isAutoScaleOut = IsYN.N;
    }

    node.id = nodeId;
    node.name = params.get("name");
    node.system_id = params.get("system_id");
    node.public_ip = params.get("public_ip");
    node.public_port = params.get("public_port");
    node.private_ip = params.get("private_ip");
    node.private_port = params.get("private_port");
    node.domain = params.get("domain");
    node.region = params.get("region");
    node.region_name = params.get("region_name");
    node.instance_id = params.get("instance_id");
    node.node_type = params.get("node_type");
    node.is_origin = params.get("is_origin");
    node.initial_state = params.get("initial_state");
    node.state = params.get("state");
    node.is_auto_scale_out = isAutoScaleOut;
    node.ls_type = params.get("ls_type");
    node.ml_type = params.get("ml_type");
    node.deploy_type = params.get("deploy_type");
    node.parent_node_id = params.get("parent_node_id");
    node.registered_at = new Date(Date.now());

    items = await this.nodeRepository.save(node)

    if (params.get("isCcall4DLSPut") && (IsYN.N === isAutoScaleOut)) {
      if (nodeType.FDSS === items.node_type) {
        await this.call4DLSPut(items, true, false);
      } else if (nodeType.FDML === items.node_type
        && mlType.FDML_MEDIA_PIPELINE === items.ml_type) {
        await this.call4DMLPut(items, true, false)
      }
    }

    return items;
  }

  async updateNode(
    params: Map<string, any>,
  ) {

    let node: Node = new Node();
    let items: Node = null;
    let isCall4DLSStatusAPI: boolean = false;
    let isCall4DLSPutAPI: boolean = false;

    node.id = params.get("node_id");
    node.name = params.get("name");
    node.system_id = params.get("system_id");
    node.public_ip = params.get("public_ip");
    node.public_port = params.get("public_port");
    node.private_ip = params.get("private_ip");
    node.private_port = params.get("private_port");
    node.domain = params.get("domain");
    node.region = params.get("region");
    node.region_name = params.get("region_name");
    node.instance_id = params.get("instance_id");
    node.node_type = params.get("node_type");
    node.is_origin = params.get("is_origin");
    node.initial_state = params.get("initial_state");
    node.state = params.get("state");
    node.is_auto_scale_out = params.get("is_auto_scale_out");
    node.ls_type = params.get("ls_type");
    node.ml_type = params.get("ml_type");
    node.deploy_type = params.get("deploy_type");
    node.parent_node_id = params.get("parent_node_id");
    node.updated_at = new Date(Date.now());
    //저장
    items = await this.nodeRepository.save(node);

    if (
      params.get("public_ip") !== node["public_ip"] ||
      params.get("public_port") !== node["public_port"] ||
      params.get("private_ip") !== node["private_ip"] ||
      params.get("private_port") !== node["private_port"]
    ) { isCall4DLSPutAPI = true; }

    if (params.get("state") !== node["state"]) { isCall4DLSStatusAPI = true; }

    if (IsYN.N === items.is_auto_scale_out) {
      if (isCall4DLSPutAPI) {
        if (nodeType.FDSS === items.node_type) {
          await this.call4DLSPut(items, false, false);
        } else if ((nodeType.FDML === items.node_type) && (mlType.FDML_MEDIA_PIPELINE === items.ml_type)) {
          await this.call4DMLPut(items, false, false)
        }
      }

      if (isCall4DLSStatusAPI) {
        if (nodeType.FDSS === items.node_type) {
           this.call4DLSState(items);
        } else if (nodeType.FDML === items.node_type && mlType.FDML_MEDIA_PIPELINE === items.ml_type) {
          // 여긴 주석 처리되어 있음...
          // this.call4DMLState(items);
        }
      }
    }

    return items;
  }


  async listRegion4OnlyTemporaryInstance(params: Map<string, any>): Promise<Map<string, any>> {
    let retMap = new Map<string, string>();
    retMap.set("data", await this.nodeMapper.listRegion4OnlyTemporaryInstance(params));
    return retMap;
  }

  async deleteTemporaryInstance(params: Map<string, any>): Promise<any> {
    params
      .set('nodeType', nodeType.FDML)
      .set('mlType', mlType.FDML_MANAGER)

    const data: Map<string, string> = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(params);

    data.forEach( item => {
      const stringUrl = `http://${item['private_ip']}:${item['private_port']}/service/scale/temporary`;
      this.httpService.request({
        url: stringUrl,
        method: APIMethod.DELETE
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      )
    })

    return true;
  }

  async deleteNode(id: string): Promise<any> {
    const node: Node = await this.nodeRepository.findOneBy({id});

    if (IsYN.N === node.is_auto_scale_out) {
      if ((nodeType.FDML === node.node_type) && (mlType.FDML_MEDIA_PIPELINE === node.ml_type)) {
        await this.call4DMLPut(node, false, true);
      }
    }

    await this.nodeRepository.delete(id);

    return true;
  }


  public async nodeIp44DLS(srcServerIp: string, systemId: string): Promise<Map<string, any>> {
    let retMap = new Map<string, string>();
    let lsParam = new Map<string, string>();

    lsParam
      .set("systemId", systemId)
      .set("serverIp", srcServerIp)
      .set("nodeType", nodeType.FDLS)

    let requestLSList: Map<string, any> = await this.nodeMapper.listNodeForSelf(lsParam);

    if (requestLSList.get("data").size === 1) { retMap.set("node", requestLSList.get("data")); }
    else {
      //TODO : 에러처리
      /*자바에서는
      requestLSList.get("data").size === 0 이면
        throw new ExceptionBase( EnumException.SRC_IP_NOT_EXIST_4DLS, systemId + ":" + srcServerIp);
      requestLSList.get("data").size > 0 이면
        throw new ExceptionBase( EnumException.SRC_IP_HAS_ONE_MORE_4DLS, systemId + ":" + srcServerIp);
      * */
    }

    return retMap;
  }

  public async getTemporaryInstanceInfo(params: Map<string, string>): Promise<Map<string, any>> {
    let retMap = new Map<string, any>();
    let enableInstancesCount: number = await this.nodeMapper.enableInstancesCount(params);
    let instanceCountList = [];

    for (let i = 0; i < enableInstancesCount; i+= 1) {
      let instanceCountMap = new Map<string, any>();
      instanceCountMap.set("code", i+1).set("name", i+1);
      instanceCountList.push(instanceCountMap);
    }
    const instanceTypeList: Map<string, any> = await this.scaleMapper.getScaleInstanceType(params);
    const regionList: Map<string, any> = await this.nodeMapper.listRegion4TemporaryInstance(params);

    retMap
      .set("instanceCountList", instanceCountList)
      .set("instanceTypeList", instanceTypeList)
      .set("instanceRegionList", regionList)

    return retMap;
  }

  /*
  * eventMapper와 연결 되야 함... */
  public async getCFurl(eventId: string): Promise<any> {
    let systemId = await this.eventRepository.findBy({id: eventId});
    console.log(systemId)
  }

  public async call4DLSPut(node: Node, isInsert: boolean, isDelete: boolean): Promise<void> {
    //TODO : thread를 쓸 것인가 말 것인가...
    await this._call4DLSAfter4DSSUpsertDelete(node, isInsert, isDelete);
  }

  public async _call4DLSAfter4DSSUpsertDelete(node: Node, isInsert: boolean, isDelete: boolean): Promise<boolean> {
    const jsonMap = new Map<string, any>();
    jsonMap
      .set("id", node.id)
      .set("public_ip", node.public_ip)
      .set("public_port", node.public_port)
      .set("private_ip", node.private_ip)
      .set("private_port", node.private_port)
      .set("domain", node.domain)

    let method = null;

    if (isDelete) {
      method = APIMethod.DELETE;
    } else {
      if (isInsert) {
        method = APIMethod.POST;
      } else {
        method = APIMethod.PUT;
      }
    }

    if (isInsert) {
      let initialState = node.initial_state;

      switch(initialState) {
        case instanceStatus.RUNNING:
          initialState = ApplicationConstants.INSTANCE_STATUS_RUNNING;
          break;
        case instanceStatus.TEMPORARY:
          initialState = ApplicationConstants.INSTANCE_STATUS_TEMPORARY;
          break;
        case instanceStatus.TERMINATED:
          initialState = ApplicationConstants.INSTANCE_STATUS_TERMINATED;
          break;
      }
      jsonMap
        .set("instance_id", node.instance_id)
        .set("initial_state", initialState)
        .set("name", node.name)
        .set("region", node.region)
    }

    let region4DLSparam = new Map<string, any>()
    region4DLSparam
      .set("systemId", node.system_id)
      .set("region", node.region)
      .set("nodeType", nodeType.FDLS)

    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DSSUpdateTarget4DLS(region4DLSparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: number = item.private_port;
      const stringUrl = `http://${serverIp}:${serverPort}/service/4dss/info?id=${node.id}`;
      const result = this.httpService.request({
        url: stringUrl,
        method: APIMethod.POST,
        data: Object.fromEntries(jsonMap),
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      );
      console.log(result);
    })

    return true;
  }

  public async call4DMLPut(node: Node, isInsert: boolean, isDelete: boolean) {
    await this._call4DMLAfter4DSSUpsertDelete(node, isInsert, isDelete);
  }

  private async _call4DMLAfter4DSSUpsertDelete(node: Node, isInsert: boolean, isDelete: boolean): Promise<boolean> {
    const nodeId = node.id;
    const mlTypes = node.ml_type;
    let region4DMLParam = new Map<string, any>();
    let jsonMap = new Map<string, any>();
    let mlTypeInt: number = 0;

    if (isDelete) {
      const method = APIMethod.DELETE;
    } else {
      if (isInsert) {
        const method = APIMethod.POST;
      } else {
        const method = APIMethod.PUT;
      }
    }

    switch(mlTypes) {
      case mlType.DISPATCHER:
        mlTypeInt = 1;
        break;
      case mlType.EMSG:
        mlTypeInt = 2;
        break;
      case mlType.FDML_MEDIA_PIPELINE:
        mlTypeInt = 3;
        break;
      case mlType.VOD_PIPELINE:
        mlTypeInt = 4;
        break;
      case mlType.IVOD_PIPELINE:
        mlTypeInt = 5;
        break;
      case mlType.MEDIASTORE:
        mlTypeInt = 6;
        break;
      case mlType.FDML_MANAGER:
        mlTypeInt = 7;
        break;
      case mlType.CLOUD_FRONT:
        mlTypeInt = 8;
    }

    jsonMap
      .set('id', nodeId)
      .set("public_ip", node.public_ip)
      .set("public_port", node.public_port)
      .set("private_ip", node.private_ip)
      .set("private_port", node.private_port)
      .set("domain", node.domain)
      .set("instance_id", node.instance_id)
      .set("initial_state", node.initial_state)
      .set("name", node.name)
      .set("region", node.region)
      .set("service_type", mlTypeInt)

    region4DMLParam
      .set("systemId", node.system_id)
      .set("region", node.region)
      .set("nodeType", nodeType.FDML)
      .set("mlType", mlType.FDML_MANAGER)


    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLParam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      const stringUrl = `http://${serverIp}:${serverPort}/service/4dml/info?id=${nodeId}`;
      const result = this.httpService.request({
        url: stringUrl,
        method: APIMethod.POST,
        data: Object.fromEntries(jsonMap),
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      );
      console.log(result);
    });

    return true;
  }

  public startStopInstance(
    systemId: string,
    action: string,
    nodeIdStr: string): boolean {
    let regionNodeIdMap = new Map<string, any>();
    let nodeIds = nodeIdStr.split(",");

    for(let regionNode of nodeIds) {
      let region: string = regionNode.split("\\|")[0];
      let nodeId: string = regionNode.split("\\|")[1];

      if (regionNodeIdMap.has(region)) {
        (regionNodeIdMap.get(region)).push(nodeId);
      } else {
        let nodeIdList = [];
        nodeIdList.push(nodeId);
        regionNodeIdMap.set(region, nodeIdList);
      }
    }
    let keys = regionNodeIdMap.keys();

    for(var key of keys) {
      let nodeIdList = regionNodeIdMap.get(key);
      let _nodeIds = nodeIdList.toArray(new String(nodeIdList.size));
      this._startStopInstance(systemId, action, _nodeIds, key);
    }

    return true;
  }

  public async _startStopInstance(systemId: string, action: string, nodeIds: object, region: string): Promise<boolean> {
    let jsonMap = new Map<string, any>();
    let region4DMLparam = new Map<string, any>();

    jsonMap.set("node_ids", nodeIds);
    region4DMLparam
      .set("systemId", systemId)
      .set("region", region)
      .set("nodeType", nodeType.FDML)
      .set("mlType", mlType.FDML_MANAGER);

    const rsList = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: number = item.private_port;
      let stringUrl: string = `http://${serverIp}:${serverPort}/service/scale/${action}`
      const result = this.httpService.request({
          url: stringUrl,
          method: APIMethod.POST,
          data: Object.fromEntries(jsonMap)
        }
      ).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      );
      console.log(result);
    });
    return true;
  }

  public async listNodeForInstanceMng(params): Promise<Map<string, any>> {
      params
        .set("nodeType", nodeType.FDML)
        .set("mlType", mlType.FDML_MEDIA_PIPELINE);

    return makeSuccessPaging(await this.nodeMapper.listNode(params));
  }

  public async insertNode4Web(params: Map<string, any>): Promise<Map<string, any>> {
    let node: Node = await this.insertNode(params);
    let systemParam = new Map<string, any>();
    let retMap = new Map<string, any>();
    systemParam.set("id", node.id);
    retMap.set('data', await this.getNode4Mng(systemParam))

    return retMap;
  }

  public async getNode4Mng(params: Map<string, any>): Promise<object> {
    let result = await this.nodeMapper.getNode4Mng(params)
    return result[0];
  }

  public async updateNode4Web(params: Map<string, any>): Promise<Map<string, any>> {
    let node: Node = await this.updateNode(params);
    let param = new Map<string, any>();
    let retMap = new Map<string, any>();
    param.set("id", node.id);
    retMap.set('data', await this.getNode4Mng(params));

    return retMap;
  }

  private async call4DLSState(node: Node) {
    this._call4DLSAfter4DSSStateUpdate(node)
  }

  private async _call4DLSAfter4DSSStateUpdate(node: Node): Promise<boolean> {
    let jsonMap: Map<string, any> = new Map<string, any>();
    let region4DLSparam: Map<string, any> = new Map<string, any>();
    let nodeId: string  = node.id;
    let state: string = node.state;

    state = (nodeStatus.ENABLE === state) ? ApplicationConstants.NODE_STATUS_ENABLE : ApplicationConstants.NODE_STATUS_DISABLE;

    region4DLSparam
      .set("systemId", node.system_id)
      .set("region", node.region)
      .set("nodetype", nodeType.FDLS)

    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DSSUpdateTarget4DLS(region4DLSparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      const stringUrl = `http://${serverIp}:${serverPort}/service/4dss/state?4dss_id=${node.id}&state=${state}`;

      const result = this.httpService.request({
        url: stringUrl,
        method: APIMethod.POST,
        data: Object.fromEntries(jsonMap)
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      );
      console.log(result);
    });

    return true;
  }

  public async addTemporaryInstance(params: Map<string, any>): Promise<any> {
    //let jsonMap = new Map<string, any>();
    let region4DMLparam = new Map<string, any>();
    let rsList = new Map<string, any>();

    region4DMLparam
      .set("systemId", params.get("system_id"))
      .set("region", params.get("region"))
      .set("nodeType", nodeType.FDML)
      .set("mlType", mlType.FDML_MANAGER)

    rsList = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      const stringUrl = `http://${serverIp}:${serverPort}/service/scale/temporary?count=${params.get("instanceCount")}&instanceType=${params.get("instanceType")}`;

      const result = this.httpService.request({
        url: stringUrl,
        method: APIMethod.POST,
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      );
      console.log(result);
    })

    return true;
  }

  public async listService4Monit(params: Map<string, any>): Promise<Map<string, any>> {
    return this.nodeMapper.listMlType4Monit(params);
  }

  public async listRegion4Monit(params: Map<string, any>): Promise<Map<string, any>> {
    return this.nodeMapper.listRegion4Monit(params);
  }

  public async listNode4Monit(params: Map<string, any>): Promise<Map<string, any>> {
    return this.nodeMapper.listNode4Monit(params);
  }

  public async listNode4MonitAction(params: Map<string,any>): Promise<Map<string, any>> {
    return this.nodeMapper.listNode4MonitAction(params);
  }

  public async listMlType4Monit(params: Map<string, any>): Promise<Map<string, any>> {
    return this.nodeMapper.listMlType4Monit(params);
  }
}
