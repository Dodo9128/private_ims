import { InjectRepository } from "@nestjs/typeorm";
import { NodeRepository } from "./node.repository";
import { Node } from "../entities/node.entity";
import * as MybatisMapper from "mybatis-mapper";
import { PageUtil } from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Node.xml'])

const myBatisFormat: object = { language: 'sql' };

export class NodeMapper {
  constructor(
    @InjectRepository(NodeRepository)
    private nodeRepository: NodeRepository,
  ) {}

  public async listNode(params: Map<any, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listNodeCount(params);
    const query = MybatisMapper.getStatement('Node', 'listNode', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.nodeRepository.query(query), totalCount);
  }

  public async listNodeCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement('Node', 'listNodeCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.nodeRepository.query(query);

    return Result[0].cnt;
  }

  public async listNodeFor4DRS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DRS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNodeFor4DSS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DSS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeForRelay4DRS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForRelay4DRS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNodeFor4DLS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DLS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNodeForCMS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForCMS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNodeForSelf(params: Map<any, any>): Promise<Map<string, any>> {
    let retMap = new Map<string, any>();
    const query = MybatisMapper.getStatement('Node', 'listNodeForSelf', Object.fromEntries(params), myBatisFormat);

    retMap.set('data', await this.nodeRepository.query(query));

    return retMap;
  }
  public async listNodeForNodeType(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForNodeType', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async getNode(params: Map<string, any>): Promise<Node> {
    const query: string  = MybatisMapper.getStatement('Node', 'getNode', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async getNode4Mng(params: Map<string, any>): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Node', 'getNode4Mng', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNode4Cms(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNode4Cms', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async getScaleOutInstanceMaxName(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'getScaleOutInstanceMaxName', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async scaleOut4DSSOk(params: Map<string, any>): Promise<number> {
    const query = MybatisMapper.getStatement('Node', 'scaleOut4DSSOk', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeForScaleOutOrInTarget4DRS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForScaleOutOrInTarget4DRS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeForScaleInfoUpdateTarget4DLS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForScaleInfoUpdateTarget4DLS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeFor4DSSUpdateTarget4DLS(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DSSUpdateTarget4DLS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeForScaleInfoUpdateTarget4DML(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForScaleInfoUpdateTarget4DML', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeFor4DMLUpdateTarget4DML(params: Map<string, any>): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DMLUpdateTarget4DML', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async scaleIn4DSS(params: Map<string, any>): Promise<number> {
    const query = MybatisMapper.getStatement('Node', 'scaleIn4DSS', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listNodeFor4DML(params: Map<string, any>): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DML', Object.fromEntries(params), myBatisFormat);
    console.log(query);
    console.log(await this.nodeRepository.query(query));
    return await this.nodeRepository.query(query);
  }
  public async listNodeFor4DMLIncludeRsPair(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeFor4DMLIncludeRsPair', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }
  public async listService4Monit(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listService4Monit', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listMlType4Monit(params: Map<string, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listMlType4Monit', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listRegion4Monit(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listRegion4Monit', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNode4Monit(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNode4Monit', Object.fromEntries(params), myBatisFormat);
    console.log(query);
    return await this.nodeRepository.query(query);
  }

  public async listNode4MonitAction(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNode4MonitAction', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async enableInstancesCount(params: Map<any, any>): Promise<number> {
    const query = MybatisMapper.getStatement('Node', 'enableInstancesCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.nodeRepository.query(query);
    return Result[0].enable_instances_count;
  }

  public async listRegion4TemporaryInstance(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listRegion4TemporaryInstance', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listRegion4OnlyTemporaryInstance(params: Map<string, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listRegion4OnlyTemporaryInstance', Object.fromEntries(params), myBatisFormat);

    return await this.nodeRepository.query(query);
  }

  public async listNodeForInstanceMng(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodeForInstanceMng', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async listNodePrewarmer(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'listNodePrewarmer', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async getCFurl(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'getCFurl', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

  public async getNodeByNodeType(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Node', 'getNodeByNodeType', Object.fromEntries(params), myBatisFormat);
    return await this.nodeRepository.query(query);
  }

}