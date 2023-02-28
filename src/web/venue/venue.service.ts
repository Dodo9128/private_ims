import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVenueDto, UpdateVenueDto } from "./venue.dto";
import { Venue } from '../../entities/venue.entity';

import * as MybatisMapper from "mybatis-mapper";
import * as fs from "fs";
import { extname } from "path";

import { Workbook, Row } from "exceljs";
import * as Constant from "../../global/constant";

import { VenueRepository } from "../../repository/venue.repository";
import { SystemRepository } from "../../repository/system.repository";
import { RuleRepository } from "../../repository/rule.repository";
import { ScaleRepository } from "../../repository/scale.repository";
import { NodeRepository } from "../../repository/node.repository";
import { GroupsRepository} from "../../repository/groups.repository";
import { VideoRepository } from "../../repository/video.repository";
import { AudioRepository } from "../../repository/audio.repository";
import { ChannelRepository } from "../../repository/channel.repository";

MybatisMapper.createMapper(['./src/database/sqlmapper/Venue.xml', './src/database/sqlmapper/System.xml', './src/database/sqlmapper/Node.xml',  './src/database/sqlmapper/Rule.xml', './src/database/sqlmapper/Scale.xml', './src/database/sqlmapper/Monit.xml', './src/database/sqlmapper/Groups.xml', './src/database/sqlmapper/Channel.xml', './src/database/sqlmapper/Event.xml']);
@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(VenueRepository)
    private venueRepository: VenueRepository,
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
    @InjectRepository(RuleRepository)
    private ruleRepository: RuleRepository,
    @InjectRepository(ScaleRepository)
    private scaleRepository: ScaleRepository,
    @InjectRepository(NodeRepository)
    private nodeRepository: NodeRepository,
    @InjectRepository(GroupsRepository)
    private groupRepository: GroupsRepository,
    @InjectRepository(VideoRepository)
    private videoRepository: VideoRepository,
    @InjectRepository(AudioRepository)
    private audioRepository: AudioRepository,
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
  ) {}

  async listVenue(): Promise<object> {
    let param = {
      id: "",
      pageNo: 1,
      sortColStr: ["id asc"],
      pageSize: 9999,
      pageOffset: 0,
    };

    const query = MybatisMapper.getStatement('Venue', 'listVenue', param, {language: 'sql'});

    return  await this.venueRepository.findAll(query);
  }

  async getTotalCount() {
    const query = MybatisMapper.getStatement('Venue', 'listVenueCount', {}, {language: "sql"});
    return await this.venueRepository.count();
  }
  async getVenue(id: string): Promise<object> {
    let param = {id};

    const query = MybatisMapper.getStatement('Venue', 'getVenue', param, {language: 'sql'});

    return this.venueRepository.findById(query)
  }
  async insertVenue(createVenueDto: CreateVenueDto): Promise<object> {
    return this.venueRepository.onCreate(createVenueDto);
  }

  async updateVenue(id: string, updateVenueDto: UpdateVenueDto): Promise<object> {
    return this.venueRepository.onUpdate(id, updateVenueDto);
  }

  async deleteVenue(id: string): Promise<boolean> {
    return this.venueRepository.onDelete(id);
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
        Result = await this.IMSExcelInsert(uploadPath, venue_id, system_id);
        //console.log(Result);
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

  async IMSExcelInsert(excelFile: string, venueId: string, systemId: string) {
    let newOne: boolean;
    (!venueId) ? newOne = true : newOne = false;
    (!venueId || venueId === null) ? venueId = await this.venueRepository.makeVenueId() : venueId = null;
    (venueId && (systemId === null || !systemId)) ? systemId = await this.systemRepository.makeSystemId(venueId) : systemId = null;

    const wb = new Workbook();
    let cellIndexMap = new Map<string, number>();

    wb.xlsx.readFile(excelFile).then(async () => {
      const sheet = wb.worksheets[0];

      for (let i = 1; i < sheet.rowCount+1; i+=1) {
        let rows = sheet.getRow(i);
        if (rows === null) { continue; }

        if (i === 2) {
          let cellIndex = 1;

          rows.eachCell({includeEmpty: true}, c => {
            let cellKey = c.value?.toString();
            if (cellKey !== null) {
              cellIndexMap.set(cellKey, cellIndex);
            }
            cellIndex+=1;
          })
        } else if (i === 3) { continue; }

        let type = rows.getCell(Constant.COLINDEX_TYPE + 1).toString();
        let temp = rows.getCell(Constant.COLINDEX_IS_EXECUTE + 1).toString()

        let isExecute: string = 'O';
        if(temp === isExecute) {
          switch (type) {
            case Constant.TYPE_VENUE:
              const rst1 = await this.setVenue(rows, cellIndexMap, venueId, newOne)
            case Constant.TYPE_SYSTEM:
              if (!rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_NAME) as number).toString().trim()) continue;
              const rst2 = await this.setSystem(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_RULE:
              const rst3 = await this.setRule(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_SCALE:
              const rst4 = await this.setScale(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_NODE:
              const rst5 = await this.setNode(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_GROUP:
              const rst6 = await this.setGroup(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_VIDEO:
              const rst7 = await this.setVideo(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_AUDIO:
              const rst8 = await this.setAudio(rows, cellIndexMap, venueId, systemId, newOne);
              break;
            case Constant.TYPE_CHANNEL:
              const rst9 = await this.setChannel(rows, cellIndexMap, venueId, systemId, newOne);
              break;
          }
        }
      }
    })

    return {
      "system_id": systemId
    };
  }

  async setVenue(rows: Row, cellIndexMap: Map<string, number>, venueId: string, newOne: boolean) {
    const rst = await this.venueRepository.setVenue(rows, cellIndexMap, venueId, newOne);
  }

  async setSystem(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await this.systemRepository.setSystem(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setNode(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.nodeRepository.setNode(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setGroup(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.groupRepository.setGroup(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setRule(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.ruleRepository.setRule(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setScale(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.scaleRepository.setScale(rows, cellIndexMap, venueId, systemId, newOne)
  }

  async setVideo(rows: any, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.videoRepository.setVideo(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setAudio(rows: any, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.audioRepository.setAudio(rows, cellIndexMap, venueId, systemId, newOne);
  }

  async setChannel(rows: any, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    const rst = await await this.channelRepository.setChannel(rows, cellIndexMap, venueId, systemId, newOne);
  }
}