import { InjectRepository } from "@nestjs/typeorm";
import { GroupsRepository } from "./groups.repository";
import { GroupsMapper } from "./groups.mapper";
import { Groups } from '../entities/group.entity';
import { Request } from "express";

import { AdminService } from "../admin/admin.service";
import { SystemRepository } from "../system/system.repository";

import {makeSuccessPaging} from "../util/ajaxreturn.util";
import * as fs from "fs";
import {extname} from "path";

export class GroupsService {
  constructor(
    @InjectRepository(SystemRepository)
    private groupsRepository: GroupsRepository,
    private groupsMapper: GroupsMapper,
    //private adminService: AdminService,
  ) {}

  async insertGroup(params: Map<string, any>): Promise<Groups> {
    let groups: Groups = new Groups();
    let items: Groups;
    let groupsId: string = await this.groupsRepository.makeGroupsId(params.get("system_id"));

    groups.id = groupsId;
    groups.system_id = params.get("system_id");
    groups.group_index = params.get("groupIndex");
    groups.name = params.get("name");
    groups.view_type = params.get("view_type");
    groups.description = params.get("description");
    groups.type = params.get("type");
    groups.is_external_group = params.get("is_external_group");
    groups.is_replay = params.get("is_replay");
    groups.is_pdview = params.get("is_pdview");
    groups.is_interactive = params.get("is_interactive");
    groups.is_timemachine = params.get("is_timemachine");
    groups.default_channel_index = params.get("default_channel_index");
    groups.default_audio_index = params.get("default_audio_index");
    groups.is_default_group = params.get("is_default_group");
    groups.registered_at = new Date(Date.now());

    items = await this.groupsRepository.save(groups);

    return items;
  }

  async updateGroup(params: Map<string,any>): Promise<Groups> {
    let groups: Groups = new Groups();
    let items: Groups;

    groups.id = params.get("groups_id");
    groups.system_id = params.get("system_id");
    groups.group_index = params.get("groupIndex");
    groups.name = params.get("name");
    groups.view_type = params.get("view_type");
    groups.description = params.get("description");
    groups.type = params.get("type");
    groups.is_external_group = params.get("is_external_group");
    groups.is_replay = params.get("is_replay");
    groups.is_pdview = params.get("is_pdview");
    groups.is_interactive = params.get("is_interactive");
    groups.is_timemachine = params.get("is_timemachine");
    groups.default_channel_index = params.get("default_channel_index");
    groups.default_audio_index = params.get("default_audio_index");
    groups.is_default_group = params.get("is_default_group");
    groups.updated_at = new Date(Date.now());

    items = await this.groupsRepository.save(groups);

    return items;
  }

  async listGroups(params: Map<string, any>) {
    return makeSuccessPaging(await this.groupsMapper.listGroups(params));
  }

  async listGroups4Mng(params: Map<string, any>) {
    return makeSuccessPaging(await this.groupsMapper.listGroups4Mng(params));
  }

  async getGroups(params: Map<string, any>) {
    return this.groupsMapper.getGroups(params);
  }

  async getGroupsIncludeChannel(params: Map<string, any>) {
    //TODO
    let retMap = new Map<string, any>();
    return retMap;
  }

  async deleteGroups(params: Map<string, any>) {
    //TODO
    return true;
  }

  async notificationGroupChannelInfo(params: Map<string, any>) {
    //TODO
    let retMap = new Map<string, any>();
    return retMap;
  }

  async uploadFileMemory(system_id: string, files: File[]) {
    const uploadFilePath = `./uploads`;
    if (!fs.existsSync(uploadFilePath)) {
      fs.mkdirSync(uploadFilePath);
    }

    return files.map(async (file: any) => {
      let Result;
      const fileName = `${file.originalname.split(".")[0]}_${Date.now()}${extname(file.originalname)}`;
      const uploadPath = `${uploadFilePath}/${fileName}`;

      fs.writeFileSync(uploadPath, file.buffer);

      if (fs.existsSync(uploadPath)) {

        //Result = await this.adminService.upLoadIMSGroupChannelExcel(uploadPath, system_id);
        console.log(Result);
      }
      return Result;
    })
  }
}
