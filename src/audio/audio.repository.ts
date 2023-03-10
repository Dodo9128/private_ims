import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Audio } from '../entities/audio.entity';
import { Row } from "exceljs";

@CustomRepository(Audio)
export class AudioRepository extends Repository<Audio> {
  async setAudio(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async makeAudioId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as audioId FROM audio WHERE id LIKE #{system_id}`);
    switch(tmpIds[0].audioId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].audioId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].audioId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].audioId}`;
        break;
    }
    return tmpId;
  }
}