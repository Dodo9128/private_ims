import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Video } from '../entities/video.entity';
import { Row } from "exceljs";

@CustomRepository(Video)
export class VideoRepository extends Repository<Video> {
  async setVideo(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async makeVideoId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as videoId FROM video WHERE id LIKE #{system_id}`);
    switch(tmpIds[0].videoId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].videoId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].videoId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].videoId}`;
        break;
    }
    return tmpId;
  }
}