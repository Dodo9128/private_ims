import { InjectRepository } from "@nestjs/typeorm";
import { VenueRepository } from "./venue.repository";
import { VenueMapper } from "./venue.mapper";
import { Venue } from '../entities/venue.entity';
import { Request } from "express";

import { AdminService } from "../admin/admin.service";

import {makeSuccessPaging} from "../util/ajaxreturn.util";
import * as fs from "fs";
import { extname } from "path";

export class VenueService {
  constructor(
    @InjectRepository(VenueRepository)
    private venueRepository: VenueRepository,
    private venueMapper: VenueMapper,
    private adminService: AdminService,
  ) {}

  async insertVenue4Web(

  ): Promise<any> {

  }

  async updateVenue4Web(): Promise<any> {

  }

  async listVenue4Mng(params: Map<string, any>) {
    return makeSuccessPaging(await this.venueMapper.listVenue(params));
  }

  async listVenue(params: Map<string, any>) {
    return makeSuccessPaging(await this.venueMapper.listVenue(params));
  }

  async getVenue(id: string): Promise<object> {
    return this.venueMapper.getVenue(id)
  }


 /* async updateVenue(id: string, updateVenueDto: UpdateVenueDto): Promise<object> {
    return this.venueRepository.onUpdate(id, updateVenueDto);
  }*/

  async deleteVenue(id: string): Promise<boolean> {
    return this.venueMapper.deleteVenue(id);
  }

  async uploadFileMemory(venue_id: string, system_id: string, venue_delete: string, files: File[]): Promise<object> {
    const isVenueDel = (venue_delete === 'true');

    const uploadFilePath = `./uploads`;
    if (!fs.existsSync(uploadFilePath)) {
      fs.mkdirSync(uploadFilePath);
    }

    return files.map(async (file: any) => {
      let Result;
      const fileName = `${file.originalname.split(".")[0]}_${Date.now()}${extname(file.originalname)}`;
      const uploadPath = `${uploadFilePath}/${fileName}`;

      fs.writeFileSync(uploadPath, file.buffer);

      if (isVenueDel) {
        //TODO: true인 경우 venueId 및 systemId로 디비에서 모두 삭제한다.
      }

      if (fs.existsSync(uploadPath)) {

        Result = await this.adminService.uploadIMSExcel(uploadPath, venue_id, system_id);
        console.log(Result);
      }
      return Result;
    })
  }

  /**
   * // 언젠가 사용한다~
  uploadFileDiskDestination(venue_id: string, system_id: string, venue_delete: string, files: File[]) {
    const venueDeleteBoolean = (venue_delete === 'true');
    const uploadFilePath = './uploads';
    if (!fs.existsSync(uploadFilePath)) {
      fs.mkdirSync(uploadFilePath);
    }

    return files.map((file: any) => {
      const fileName = `${file.originalname.split(".")[0]}_${Date.now()}${extname(file.originalname)}`;
      const uploadPath =`${uploadFilePath}/${fileName}`;

      fs.writeFileSync(uploadPath, file.path);

      return `${uploadFilePath}/${fileName}`
    })
  }*/
}