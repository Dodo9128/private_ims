import {catchError} from "rxjs";
import {Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Node} from '../entities/node.entity';
import {Venue} from "../entities/venue.entity";
import {System} from "../entities/system.entity";

import {NodeMapper} from "./node.mapper";
import {ScaleMapper} from "../scale/scale.mapper";
import {ChannelMapper} from "../channel/channel.mapper";
import { EventMapper } from "../event/event.mapper";
import {NodeRepository} from "./node.repository";
import {EventRepository} from "../event/event.repository";
import {SystemRepository} from "../system/system.repository";
import {CodeCommonRepository} from "../code/CodeCommon.repository";
import {WorldCountryRepository} from "../world/world.repository";
import {VenueRepository} from "../venue/venue.repository";
import * as CommonCode from "../global/commonCode";

import {makeSuccessPaging} from "../util/ajaxreturn.util";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { WorldCountry } from "../entities/worldCountry.entity";
import { CodeCommon } from "../entities/codeCommon.entity";


export class NodeService {
  private readonly logger = new Logger(NodeService.name);
  constructor(
    @InjectRepository(NodeRepository)
    private nodeRepository: NodeRepository,
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    @InjectRepository(CodeCommonRepository)
    private codeCommonRepository: CodeCommonRepository,
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
    private nodeMapper: NodeMapper,
    private scaleMapper: ScaleMapper,
    private httpService: HttpService,
    private venueRepository: VenueRepository,
    @InjectRepository(WorldCountryRepository)
    private worldCountryRepository: WorldCountryRepository,
    private channelMapper: ChannelMapper,
    private eventMapper: EventMapper,
  ) {}

  private async call4DMLAfter4DMLStateUpdate(nodeId: string, state: string): Promise<boolean> {
    let node: Node = await this.getNode(new Map(Object.entries({id: nodeId})));
    node.state = state;
    node = await this.nodeRepository.save(node);

    return this._call4DMLAfter4DMLStateUpdate(node);
  }
  private async _call4DMLAfter4DMLStateUpdate(node: Node): Promise<boolean> {
    const region4DMLparam = new Map<string, any>();
    let state: string;

    if (CommonCode.nodeStatus.ENABLE === node.state) {
      state = CommonCode.ApplicationConstants.NODE_STATUS_ENABLE;
    } else if ( CommonCode.nodeStatus.DISABLE === node.state) {
      state = CommonCode.ApplicationConstants.NODE_STATUS_DISABLE;
    }

    region4DMLparam
      .set("systemId", node.system_id)
      .set("region", node.region)
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MANAGER);

    let rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLparam);

    rsList.forEach(item => {
      let stringUrl = `http://${item.private_ip}:${item.private_port}/service/4dml/state?4dml_id=${item.nodeId}&state=${state}`;
      this.httpService.request({
        "url": stringUrl,
        "method": CommonCode.APIMethod.PUT,
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      )
    })
    return true;
  }
  private call4DMLState(node: Node): void {
    this._call4DMLAfter4DMLStateUpdate(node);
  }
  public async getNode(param: Map<string, any>): Promise<Node> {
    return this.nodeMapper.getNode(param);
  }
  public async listNode4Cms(param: Map<string,any>): Promise<Map<string, any>> {
    return await this.nodeMapper.listNode4Cms(param);
  }
  public async scaleIn4DML(systemId: string, nodeId: string, rsId: string): Promise<boolean> {
    let params = {
      id: nodeId,
      systemId
    };
    await this.nodeMapper.scaleIn4DSS(new Map(Object.entries(params)));

    params.id = rsId;
    await this.nodeMapper.scaleIn4DSS(new Map(Object.entries(params)));

    return true;
  }

  public async call4DLSAfter4DSSUpsertDelete(nodeId: string, isInsert: boolean, isDelete: boolean): Promise<boolean> {
    let node: Node = await this.getNode(new Map(Object.entries({ id: nodeId })));
    return this._call4DLSAfter4DSSUpsertDelete(node, isInsert, isDelete)
  }
  public async scaleOut4DMLOk(systemId: string, nodeId: string, rsId: string, publicIp: string, publicPort: string, domain: string): Promise<boolean> {
    let param = {
      systemId,
      "id": nodeId,
      publicIp,
      publicPort: 5003,
      "updatedAt": new Date(Date.now())
    }
    await this.channelMapper.changeCameraIpMapping(new Map(Object.entries(param)));

    param["domain"] = domain;
    param["updatedAt"] = new Date(Date.now())
    await this.nodeMapper.scaleOut4DSSOk(new Map(Object.entries(param)));

    param["publicPort"] = 8554
    param["updatedAt"] = new Date(Date.now())
    await this.nodeMapper.scaleOut4DSSOk(new Map(Object.entries(param)));

    return true;
  }
  public async scaleOut4DML(systemId: string, instanceId: string, privateIp: string, privatePort: number, initialStateValue: string, region: string ): Promise<Map<string, any>> {
    let retMap = new Map<string, any>();
    let node: Node = null, rsNode: Node = null;
    let regionCode: CodeCommon = await this.codeCommonRepository.findByCode(region);

    if (regionCode === null) {
      const system: System = await this.systemRepository.findById(systemId);
      const venue: Venue = await this.venueRepository.findById(system.venue_id);
      const worldCountry: WorldCountry = await this.worldCountryRepository.findById(venue.country_id);

      regionCode = new CodeCommon();
      regionCode.group_code = "CM07";
      regionCode.code = region;
      regionCode.description = worldCountry.iso3;
      regionCode.is_use = "Y"
      regionCode.name = worldCountry.iso3;
      regionCode.order_seq = 1;
      regionCode = await this.codeCommonRepository.save(regionCode);
    }
    const scaleParam = {systemId, region};
    let regionName = regionCode.name;
    let scaleMap: Map<string, any> = await this.scaleMapper.getScaleBySystemId(new Map(Object.entries(scaleParam)));
    const scaleName: string = scaleMap.get("scale_ss_name");

    let nodeName: string = null,
      publicIp: string = null,
      publicPort: number = 0,
      nodeType: string = CommonCode.nodeType.FDML,
      isOrigin: string = null,
      domain: string = null,
      initialState: string = null,
      isAutoScaleOut: string = CommonCode.IsYN.Y,
      lsType: string = null,
      mlType: string = CommonCode.mlType.FDML_MEDIA_PIPELINE,
      deployType: string = null,
      parentNodeId: string = null;

    if (scaleMap.get("region") === region) { isOrigin = CommonCode.IsYN.Y }
    if (initialStateValue === "running") { initialState = CommonCode.instanceStatus.RUNNING }
    else if (initialStateValue === "terminated") {initialState = CommonCode.instanceStatus.TERMINATED }
    else if (initialStateValue === "temporary") { initialStateValue= CommonCode.instanceStatus.TEMPORARY }

    let state = CommonCode.nodeStatus.ENABLE;

    let nodeNameParam = { systemId, region, nodeType, mlType }
    let instancenameList = await this.nodeMapper.getScaleOutInstanceMaxName(new Map(Object.entries(nodeNameParam)));
    let instanceNameMap = new Map<string, any>();
    if (instancenameList.length === 2) {
      //TODO: 이걸 어쩌지...
    } else {
      nodeName = `${scaleName}01-A`;
    }

    let insertParams = new Map<string, any>();
    insertParams
      .set("name", nodeName)
      .set("system_id", systemId)
      .set("public_ip", publicIp)
      .set("public_port", publicPort)
      .set("private_ip", privateIp)
      .set("private_port", privatePort)
      .set("domain", domain)
      .set("region", region)
      .set("region_name", regionName)
      .set("instance_id", instanceId)
      .set("node_type", nodeType)
      .set("is_origin", isOrigin)
      .set("initial_state", initialState)
      .set("state", state)
      .set("is_auto_scale_out", isAutoScaleOut)
      .set("ls_type", lsType)
      .set("ml_type", mlType)
      .set("deploy_type", deployType)
      .set("parent_node_id", parentNodeId)

    //4DML-MP
    node = await this.insertNode(insertParams);
    //4DRS
    let rsNodeName: string = nodeName.replace("4DML-MP", "4DRS");
    let rsNodeType: string = CommonCode.nodeType.FDRS;
    let rsMlType: string = null;
    let rsPublicPort: number = 8554;
    let rsPrivatePort: number = 8554;
    insertParams
      .set("name", rsNodeName)
      .set("public_port", rsPublicPort)
      .set("private_port", rsPrivatePort)
      .set("node_type", rsNodeType)
      .set("ml_type", rsMlType)

    rsNode = await this.insertNode(insertParams);

    retMap.set("id", node.id).set("name", node.name).set("rs_id", rsNode.id);

    return retMap;
  }

  public async call4DRSAfterScaleOutOrIn(systemId: string, nodeId: string, method: CommonCode.APIMethod): Promise<boolean> {
    let fdss: Node = await this.nodeRepository.findById(nodeId);
    let region: string = fdss.region;
    const jsonMap = new Map<string, any>();
    const region4DRSparam = new Map<string, any>();

    jsonMap
      .set("id", fdss.id)
      .set("name", fdss.name)
      .set("region", region)
      .set("private_ip", fdss.private_ip)
      .set("private_port", fdss.private_port);

    region4DRSparam
      .set("systemId", systemId)
      .set("region", region)
      .set("nodeType", CommonCode.nodeType.FDRS);

    let data: Map<string, any> = await this.nodeMapper.listNodeForScaleOutOrInTarget4DRS(region4DRSparam);
    data.forEach(item => {
      let stringUrl = `http://${item.private_ip}:${item.private_port}/live/4drs/target/${nodeId}`;
      this.httpService.request({
        "url": stringUrl,
        "method": method,
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      )
    })
    return true;
  }

  public async nodeIp44DML(srcServerIp: string, systemId: string): Promise<Map<string, any>> {
    let retMap = new Map<string, any>();
    let lsParam = new Map<string, any>();

    lsParam
      .set("systemId", systemId)
      .set("serverIp", srcServerIp)
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MANAGER);

    let requestMLList: Map<string, any> = await this.nodeMapper.listNodeFor4DML(lsParam);

    if (!(requestMLList.size === 0) || !(requestMLList.size > 1)) {
      //retMap.set("node", requestMLList(0))
    }

    return retMap;
  }
  public call4DRS(systemId: string, nodeId: string, method: CommonCode.APIMethod): void {
    this.call4DRSAfterScaleOutOrIn(systemId, nodeId, method);
  }
  public async scaleIn4DSS(systemId: string, nodeId: string): Promise<boolean> {
    let param = new Map<string, any>();
    param.set("id", nodeId).set("systemId", systemId);
    await this.nodeMapper.scaleIn4DSS(param);
    //TelegramUtil.sendMsg("4DSS scaleIn[" + nodeId + "] OK!");
    this.call4DRS(systemId, nodeId, CommonCode.APIMethod.DELETE);
    return true;
  }

  public async scaleOut4DSSOk(systemId: string, nodeId: string, publicIp: string, publicPort: string, doamin: string): Promise<boolean> {
    let param = new Map<string, any>();
    param
      .set("systemId", systemId)
      .set("idd", nodeId)
      .set("publicIp", publicIp)
      .set("publicPort", publicPort)
      .set("doamin", doamin)
      .set("updatedAt", new Date(Date.now()))

    await this.nodeMapper.scaleOut4DSSOk(param);

    return true;
  }

  public async scaleOut4DSS(
    systemId: string,
    instanceId: string,
    privateIp: string,
    privatePort: number,
    initialStateValue: string,
    region: string
  ) {
    let regionCode: CodeCommon = await this.codeCommonRepository.findByCode(region);
    if (regionCode === null) {
      const system: System = this.systemRepository.findById(systemId);
      const venue: Venue = this.venueRepository.findById(system.venue_id);
      const worldCountry: WorldCountry = await this.worldCountryRepository.findById(venue.country_id);

      regionCode = new CodeCommon();
      regionCode.group_code = "CM07"
      regionCode.code = region;
      regionCode.description = worldCountry.iso3;
      regionCode.is_use = "Y";
      regionCode.name = worldCountry.iso3;
      regionCode.order_seq = 1;
      regionCode = await this.codeCommonRepository.save(regionCode);
    }
    let regionName = regionCode.name;
    let scaleMap = new Map<string, any>();
    let scaleParam = new Map<string, any>();
    let nodeNameParam = new Map<string, any>();
    let instancenameList = new Map<string, any>();
    let instanceNameMap = new Map<string, any>();

    scaleParam.set("systemId", systemId).set("region", region);
    scaleMap = await this.scaleMapper.getScaleBySystemId(scaleParam);

    const scaleName = scaleMap.get("scale_ss_name")
    let
      nodeName: string = null,
      publicIp: string = null,
      publicPort: number = 0,
      nodeType: string = CommonCode.nodeType.FDSS,
      isOrigin: string = null,
      domain: string = null,
      initialState: string = null,
      isAutoScaleOut: string = null,
      lsType: string = null,
      mlType: string = null,
      deployType: string = null,
      parentNodeId: string = null,
      state: string = CommonCode.nodeStatus.ENABLE;

    if (initialStateValue === "running") {
      initialState = CommonCode.instanceStatus.RUNNING;
    } else if (initialStateValue === "temporary") {
      initialState = CommonCode.instanceStatus.TEMPORARY;
    } else if (initialStateValue === "terminated") {
      initialState = CommonCode.instanceStatus.TERMINATED;
    }
    nodeNameParam.set("systemId", systemId).set("region", region).set("nodeType", nodeType);
    instancenameList = await this.nodeMapper.getScaleOutInstanceMaxName(nodeNameParam);

    if (instancenameList.size === 2) {
    //  instanceNameMap = instancenameList(1)
    }
    //TODO : 함수 완성 필요
    //let node: Node = this.insertNode()

    let retMap = new Map<string, any>();
    return retMap;
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
      isAutoScaleOut = CommonCode.IsYN.N;
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

    if (params.get("isCcall4DLSPut") && (CommonCode.IsYN.N === isAutoScaleOut)) {
      if (CommonCode.nodeType.FDSS === items.node_type) {
        await this.call4DLSPut(items, true, false);
      } else if (CommonCode.nodeType.FDML === items.node_type
        && CommonCode.mlType.FDML_MEDIA_PIPELINE === items.ml_type) {
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

    if (CommonCode.IsYN.N === items.is_auto_scale_out) {
      if (isCall4DLSPutAPI) {
        if (CommonCode.nodeType.FDSS === items.node_type) {
          await this.call4DLSPut(items, false, false);
        } else if ((CommonCode.nodeType.FDML === items.node_type) && (CommonCode.mlType.FDML_MEDIA_PIPELINE === items.ml_type)) {
          await this.call4DMLPut(items, false, false)
        }
      }

      if (isCall4DLSStatusAPI) {
        if (CommonCode.nodeType.FDSS === items.node_type) {
           this.call4DLSState(items);
        } else if (CommonCode.nodeType.FDML === items.node_type && CommonCode.mlType.FDML_MEDIA_PIPELINE === items.ml_type) {
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
      .set('nodeType', CommonCode.nodeType.FDML)
      .set('mlType', CommonCode.mlType.FDML_MANAGER)

    const data: Map<string, string> = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(params);

    data.forEach( item => {
      let stringUrl = `http://${item['private_ip']}:${item['private_port']}/service/scale/temporary`;
      this.httpService.request({
        url: stringUrl,
        method: CommonCode.APIMethod.DELETE
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happend!';
        })
      )
    })

    return true;
  }

  async deleteNode(id: string): Promise<boolean> {
    const node: Node = await this.nodeRepository.findOneBy({id});

    if (CommonCode.IsYN.N === node.is_auto_scale_out) {
      if ((CommonCode.nodeType.FDML === node.node_type) && (CommonCode.mlType.FDML_MEDIA_PIPELINE === node.ml_type)) {
        await this.call4DMLPut(node, false, true);
      }
    }

    await this.nodeRepository.delete(node.id);

    return true;
  }


  public async nodeIp44DLS(srcServerIp: string, systemId: string): Promise<Map<string, any>> {
    let retMap = new Map<string, string>();
    let lsParam = new Map<string, string>();

    lsParam
      .set("systemId", systemId)
      .set("serverIp", srcServerIp)
      .set("nodeType", CommonCode.nodeType.FDLS)

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

  public async getTemporaryInstanceInfo(params: Map<string, string>): Promise<Map<string, object>> {
    let retMap = new Map<string, any>();
    let enableInstancesCount: number = await this.nodeMapper.enableInstancesCount(params);

    let instanceCountList = [];

    for (let i = 0; i < enableInstancesCount; i+= 1) {
      let instanceCountMap = new Map<string, any>();
      instanceCountMap.set("code", i+1).set("name", i+1);
      instanceCountList.push(Object.fromEntries(instanceCountMap));
    }

    const instanceTypeList = await this.scaleMapper.getScaleInstanceType(params);
    const regionList = await this.nodeMapper.listRegion4TemporaryInstance(params);

    retMap
      .set("instanceCountList", instanceCountList)
      .set("instanceTypeList", instanceTypeList)
      .set("instanceRegionList", regionList)

    return retMap;
  }

  /*
  * eventMapper와 연결 되야 함... */
  public async getCFurl(eventId: string): Promise<any> {
    let systemId: string = await this.eventMapper.getSystemId(new Map(Object.entries({"event_id": eventId} )));
    let cloudFrontParam = new Map<string, any>();
    cloudFrontParam
      .set("systemId", systemId)
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.CLOUD_FRONT);

    let cfurl = await this.nodeMapper.getCFurl(cloudFrontParam);

    return cfurl;
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
      method = CommonCode.APIMethod.DELETE;
    } else {
      if (isInsert) {
        method = CommonCode.APIMethod.POST;
      } else {
        method = CommonCode.APIMethod.PUT;
      }
    }

    if (isInsert) {
      let initialState = node.initial_state;

      switch(initialState) {
        case CommonCode.instanceStatus.RUNNING:
          initialState = CommonCode.ApplicationConstants.INSTANCE_STATUS_RUNNING;
          break;
        case CommonCode.instanceStatus.TEMPORARY:
          initialState = CommonCode.ApplicationConstants.INSTANCE_STATUS_TEMPORARY;
          break;
        case CommonCode.instanceStatus.TERMINATED:
          initialState = CommonCode.ApplicationConstants.INSTANCE_STATUS_TERMINATED;
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
      .set("nodeType", CommonCode.nodeType.FDLS)

    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DSSUpdateTarget4DLS(region4DLSparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: number = item.private_port;
      let stringUrl = `http://${serverIp}:${serverPort}/service/4dss/info?id=${node.id}`;
      const result = this.httpService.request({
        url: stringUrl,
        method: CommonCode.APIMethod.POST,
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

  public async call4DMLAfter4DSSUpsertDelete(nodeId: string, isInsert: boolean, isDelete: boolean): Promise<boolean> {
    let node: Node = await this.getNode(new Map(Object.entries({ id: nodeId })));
    return this._call4DLSAfter4DSSUpsertDelete(node, isInsert, isDelete);
  }
  private async _call4DMLAfter4DSSUpsertDelete(node: Node, isInsert: boolean, isDelete: boolean): Promise<boolean> {
    const nodeId = node.id;
    const mlType = node.ml_type;
    let region4DMLParam = new Map<string, any>();
    let jsonMap = new Map<string, any>();
    let mlTypeInt: number = 0;

    if (isDelete) {
      const method = CommonCode.APIMethod.DELETE;
    } else {
      if (isInsert) {
        const method = CommonCode.APIMethod.POST;
      } else {
        const method = CommonCode.APIMethod.PUT;
      }
    }

    switch(mlType) {
      case CommonCode.mlType.DISPATCHER:
        mlTypeInt = 1;
        break;
      case CommonCode.mlType.EMSG:
        mlTypeInt = 2;
        break;
      case CommonCode.mlType.FDML_MEDIA_PIPELINE:
        mlTypeInt = 3;
        break;
      case CommonCode.mlType.VOD_PIPELINE:
        mlTypeInt = 4;
        break;
      case CommonCode.mlType.IVOD_PIPELINE:
        mlTypeInt = 5;
        break;
      case CommonCode.mlType.MEDIASTORE:
        mlTypeInt = 6;
        break;
      case CommonCode.mlType.FDML_MANAGER:
        mlTypeInt = 7;
        break;
      case CommonCode.mlType.CLOUD_FRONT:
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
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MANAGER)


    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLParam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      let stringUrl = `http://${serverIp}:${serverPort}/service/4dml/info?id=${nodeId}`;
      const result = this.httpService.request({
        url: stringUrl,
        method: CommonCode.APIMethod.POST,
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
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MANAGER);

    const rsList = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: number = item.private_port;
      let stringUrl: string = `http://${serverIp}:${serverPort}/service/scale/${action}`
      const result = this.httpService.request({
          url: stringUrl,
          method: CommonCode.APIMethod.POST,
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
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MEDIA_PIPELINE);

    //return makeSuccessPaging(await this.nodeMapper.listNode(params));
    return await this.nodeMapper.listNode(params);
  }

  public async insertNode4Web(params: Map<string, any>): Promise<Map<string, any>> {
    let node: Node = await this.insertNode(params);
    let systemParam = new Map<string, any>();
    let retMap = new Map<string, any>();

    systemParam.set("id", node.id);
    retMap.set("data", await this.getNode4Mng(systemParam))

    return retMap;
  }

  public async getNode4Mng(params: Map<string, any>) {
    return await this.nodeMapper.getNode4Mng(params);
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

  public async call4DLSAfter4DSSStateUpdate(nodeId: string, state: string): Promise<boolean> {
    let node: Node = await this.getNode(new Map(Object.entries({ id: nodeId})));
    node.state = state;
    node = await this.nodeRepository.save(node);
    return this._call4DLSAfter4DSSStateUpdate(node);
  }
  private async _call4DLSAfter4DSSStateUpdate(node: Node): Promise<boolean> {
    let jsonMap: Map<string, any> = new Map<string, any>();
    let region4DLSparam: Map<string, any> = new Map<string, any>();
    let nodeId: string  = node.id;
    let state: string = node.state;

    state = (CommonCode.nodeStatus.ENABLE === state) ? CommonCode.ApplicationConstants.NODE_STATUS_ENABLE : CommonCode.ApplicationConstants.NODE_STATUS_DISABLE;

    region4DLSparam
      .set("systemId", node.system_id)
      .set("region", node.region)
      .set("nodetype", CommonCode.nodeType.FDLS)

    const rsList: Map<string, any> = await this.nodeMapper.listNodeFor4DSSUpdateTarget4DLS(region4DLSparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      let stringUrl = `http://${serverIp}:${serverPort}/service/4dss/state?4dss_id=${node.id}&state=${state}`;

      const result = this.httpService.request({
        url: stringUrl,
        method: CommonCode.APIMethod.POST,
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
      .set("nodeType", CommonCode.nodeType.FDML)
      .set("mlType", CommonCode.mlType.FDML_MANAGER)

    rsList = await this.nodeMapper.listNodeFor4DMLUpdateTarget4DML(region4DMLparam);

    rsList.forEach(item => {
      let serverIp: string = item.private_ip;
      let serverPort: string = item.private_port;
      let stringUrl = `http://${serverIp}:${serverPort}/service/scale/temporary?count=${params.get("instanceCount")}&instanceType=${params.get("instanceType")}`;

      const result = this.httpService.request({
        url: stringUrl,
        method: CommonCode.APIMethod.POST,
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
