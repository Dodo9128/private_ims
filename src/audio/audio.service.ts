import { Injectable } from '@nestjs/common';
import { Audio } from "../entities/audio.entity";
import { AudioRepository } from "./audio.repository";

@Injectable()
export class AudioService {
  constructor(
    private audioRepository: AudioRepository,
  ) {
  }
  async insertAudio(params: Map<string, any>): Promise<Audio> {
    let audio: Audio = new Audio();
    let items: Audio;
    let audioId: string = await this.audioRepository.makeAudioId(params.get("system_id"));

    audio.id = audioId;
    audio.group_id = params.get("group_id");
    audio.codec = params.get("codec");
    audio.channel_type = params.get("channel_type");
    audio.sample_rate = params.get("sample_rate");
    audio.sample_bit = params.get("sample_bit");
    audio.is_input = params.get("is_input");

    items = await this.audioRepository.save(audio);

    return items;
  }

  async updateAudio(params: Map<string, any>): Promise<Audio> {
    let audio: Audio = new Audio();
    let items: Audio;

    audio.id = params.get("audio_id");
    audio.group_id = params.get("group_id");
    audio.codec = params.get("codec");
    audio.channel_type = params.get("channel_type");
    audio.sample_rate = params.get("sample_rate");
    audio.sample_bit = params.get("sample_bit");
    audio.is_input = params.get("is_input");

    items = await this.audioRepository.save(audio);

    return items;
  }
}
