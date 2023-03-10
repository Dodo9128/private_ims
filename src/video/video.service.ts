import { Injectable } from '@nestjs/common';
import { Video } from "../entities/video.entity";
import { VideoRepository } from "./video.repository";


@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
  ) {
  }
  async insertVideo(params: Map<string, any>): Promise<Video> {
    let video: Video = new Video();
    let items: Video;
    let videoId: string = await this.videoRepository.makeVideoId(params.get("system_id"));

    video.id = videoId;
    video.group_id = params.get("group_id");
    video.codec = params.get("codec");
    video.width = params.get("width");
    video.height = params.get("height");
    video.bitrate = params.get("bitrate");
    video.gop = params.get("gop");
    video.fps = params.get("fps");
    video.is_input = params.get("isInput");

    items = await this.videoRepository.save(video);

    return items;
  }

  async updateVideo(params: Map<string, any>): Promise<Video> {
    let video: Video = new Video();
    let items: Video;

    video.id = params.get("video_id");
    video.group_id = params.get("group_id");
    video.codec = params.get("codec");
    video.width = params.get("width");
    video.height = params.get("height");
    video.bitrate = params.get("bitrate");
    video.gop = params.get("gop");
    video.fps = params.get("fps");
    video.is_input = params.get("isInput");

    items = await this.videoRepository.save(video);

    return items;
  }
}
