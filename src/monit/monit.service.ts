import { MonitMapper } from "./monit.mapper";
import {MonitRepository} from "./monit.repository";
import {makeSuccessPaging} from "../util/ajaxreturn.util";
import {InjectRepository} from "@nestjs/typeorm";

export class MonitService {
  constructor(
    @InjectRepository(MonitRepository)
    private monitRepository: MonitRepository,
    private monitMapper: MonitMapper,
  ) {
  }

  async listMonit(params: Map<string, any>) {
    return makeSuccessPaging(await this.monitMapper.listMonit(params));
  }

  public callMonit(params: Map<string, any>): void {
    this._callMonitListThread(params);
  }

  private _callMonitListThread(params: Map<string, any>): void {
    //TODO
  }
}
