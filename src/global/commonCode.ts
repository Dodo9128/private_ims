  export enum IsYN {
    Y = "CM01Y",
    N = "CM01Y"
  }

  export enum liveStatus {
    SCHEDULED = "CM0201",
    LIVE = "CM0202",
    CANCELED = "CM0203",
    FINISHED = "CM0204",
  }

  export enum channelStatus {
    ACTIVE = "CM0301",
    INACTIVE = "CM0302",
  }

  export enum nodeType {
    FDC = "CM0401",
    FDRS = "CM0402",
    FDSR = "CM0403",
    FDRM = "CM0404",
    FDSS = "CM0405",
    FDLS = "CM0406",
    CMS = "CM0407",
    FDML = "CM0408",
    CMS_W = "CM0409",
    IMS = "CM0410",
    PREWARM = "CM0411",
  }

  export enum eventStatus {
    PAUSE = "CM0501",
    RESUME = "CM0502",
  }

  export enum instanceStatus {
    RUNNING = "CM0601",
    TEMPORARY = "CM0602",
    TERMINATED = "CM0603",
  }

  export enum regionType {
    VIR = "us-east-1",
    OH = "us-east-2",
    CAL = "us-west-1",
    OR = "us-west-2",
    KR = "ap-northeast-2",
    SIN = "ap-southeast-1",
    SYD = "ap-southeast-2",
    JP = "ap-northeast-1",
    CAN = "ca-central-1",
    GER = "eu-central-1",
    UK = "eu-west-2",
    ITA = "eu-south-1",
    FRA = "eu-west-3",
    HK = "ap-east-1",
    KT = "af-south-1",
    MB = "ap-south-1",
    OS = "ap-northeast-3",
    IL = "eu-west-1",
    SH = "eu-north-1",
    BA = "me-south-1",
    BRA = "sa-east-1",
  }

  export enum lsType {
    MASTER = "CM0801",
    SLAVE = "CM0802",
  }

  export enum nodeStatus {
    ENABLE = "CM0901",
    DISABLE = "CM0902",
  }

  export enum groupType {
    MAINVIEW = "CM1001",
    SUBVIEW = "CM1002",
  }

  export enum mediaType {
    VIDEO = "CM1101",
    AUDIO = "CM1102",
    ALL = "CM1103",
  }

  export enum audioChannelType {
    MONO = "CM1201",
    STEREO = "CM1202",
    SURROUND = "CM1203",
  }

  export enum viewType {
    MAINVIEWA = "CM1301",
    MAINVIEWB = "CM1302",
    MAINVIEWC = "CM1303",
    MAINVIEWD = "CM1304",
    MAINVIEWE = "CM1305",
    MAINVIEWF = "CM1306",
    MAINVIEWG = "CM1307",
    MAINVIEWH = "CM1308",
    MAINVIEWI = "CM1309",
    MAINVIEWJ = "CM1310",
    MULTIVIEWA = "CM1311",
    MULTIVIEWB = "CM1312",
    MULTIVIEWC = "CM1313",
    MULTIVIEWD = "CM1314",
    MULTIVIEWE = "CM1315",
    MULTIVIEWF = "CM1316",
    BIRDVIEWA = "CM1317",
    BIRDVIEWB = "CM1318",
    BIRDVIEWC = "CM1319",
    EXTERNALA = "CM1320",
    EXTERNALB = "CM1321",
    EXTERNALC = "CM1322",
    PDVIEWA = "CM1323",
    PDVIEWB = "CM1324",
    PDVIEWC = "CM1325",
  }

  export enum mlType {
    DISPATCHER = "CM1401",
    EMSG = "CM1402",
    FDML_MEDIA_PIPELINE = "CM1403",
    VOD_PIPELINE = "CM1404",
    IVOD_PIPELINE = "CM1405",
    MEDIASTORE = "CM1406",
    FDML_MANAGER = "CM1407",
    CLOUD_FRONT = "CM1408",
  }

  export enum deployType {
    MEDIASTORE = "CM1501",
    S3 = "CM1502",
    FILE_SERVER = "CM1503",
  }

  export enum APIMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
  }

  export enum AjaxConstants {
    DATA = "data",
    TOTAL_COUNT = "totalCount",
    LIST_COUNT = "listCount",
    I_TOTAL_COUNT = "iTotalDisplayRecords",
    I_LIST_COUNT = "iTotalRecords",
    DEFAULT_DATA = "",
    RESULT_OK = "ok",
    RESULT_FAIL = "fail",
    RESULT = "result",
    MESSAGE = "message",
    DEFAULT_MESSAGE = "SUCCESS",
    CODE_AJAX_SUCCESS = 1001,
    CODE_AJAX_FAIL = 9001
  }

  export enum ApplicationConstants {
  PROFILE_LOCAL = "local",
  PROFILE_DEV = "dev",
  PROFILE_PROD = "prod",

  FLAG_VALUE_Y = "Y",
  FLAG_VALUE_N = "N",

  EVENT_LIVE_STATUS_SCHEDULED = "scheduled",
  EVENT_LIVE_STATUS_LIVE = "live",
  EVENT_LIVE_STATUS_CANCELED = "canceled",
  EVENT_LIVE_STATUS_FINISHED = "finished",

  EVENT_STATUS_RESUME = "resume",
  EVENT_STATUS_PAUSE = "pause",
  EVENT_STATUS_END = "end",

  CHANNEL_ACTIVE = "active",
  CHANNEL_INACTIVE = "inactive",
  NODE_STATUS_ENABLE = "enable",
  NODE_STATUS_DISABLE = "disable",

  INSTANCE_STATUS_RUNNING = "running",
  INSTANCE_STATUS_TEMPORARY = "temporary",
  INSTANCE_STATUS_TERMINATED = "terminated",
  }