export interface IResultReturn {
  result: "OK" | "FAIL";
  message: string | null;
  data: object | null;
}

export interface ICreateOrderParams {
  key: string;
  elem1?: string | number | boolean;
  elem2?: number;
}

export interface IChannelList {
  name: string;
  index: number;
  ip: string;
}

export interface IInsertChannelParams {
  system_id: string;
  channel_list: IChannelList[];
}
export type TEventStatus = "resume" | "pause" | "end";

export interface IMakeContent {
  title: string;
  description: string;
  recording_name: string;
  start_frame_no: number;
  end_frame_no: number;
  channel_list: number[];
}
