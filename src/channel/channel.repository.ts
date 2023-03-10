import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Channel } from '../entities/channel.entity';
import { Row } from "exceljs";

@CustomRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  async setChannel(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async lstChannel4Mng(query) {
    return await this.query(query);
  }

  async makeChannelId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as channelId FROM channel WHERE id LIKE #{system_id}`);
    switch(tmpIds[0].channelId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].channelId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].channelId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].channelId}`;
        break;
    }
    return tmpId;
  }


}