#########################################################
#		root 권한으로 수행									#
#		mysql -u root -p								#
#########################################################
create database ims;
create user 'ims'@'localhost' identified by 'Cipet0217';
GRANT ALL PRIVILEGES ON *.* TO 'ims'@'%' IDENTIFIED BY 'Cipet0217';
flush privileges;
#########################################################


#########################################################
#		CHAR-SET 관련 이미 생성된 테이블이 있다면 아래 쿼리문을 수행합니다.
ALTER DATABASE `ims` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

#ALTER TABLE ims.code_group DEFAULT CHARSET=utf8;
#ALTER TABLE ims.code_common DEFAULT CHARSET=utf8;
#ALTER TABLE ims.api_execute_time DEFAULT CHARSET=utf8;
#ALTER TABLE ims.world_country DEFAULT CHARSET=utf8;
#ALTER TABLE ims.world_state DEFAULT CHARSET=utf8;
#ALTER TABLE ims.world_city DEFAULT CHARSET=utf8;
#ALTER TABLE ims.venue DEFAULT CHARSET=utf8;
#ALTER TABLE ims.event DEFAULT CHARSET=utf8;
#ALTER TABLE ims.system DEFAULT CHARSET=utf8;
#ALTER TABLE ims.groups DEFAULT CHARSET=utf8;
#ALTER TABLE ims.channel DEFAULT CHARSET=utf8;
#ALTER TABLE ims.node DEFAULT CHARSET=utf8;

#ALTER TABLE ims.code_group CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.code_common CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.api_execute_time CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.world_country CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.world_state CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.world_city CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.venue CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.event CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.system CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.groups CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.channel CONVERT TO CHARACTER SET utf8;
#ALTER TABLE ims.node CONVERT TO CHARACTER SET utf8;
#########################################################

CREATE TABLE world_country (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100)  NOT NULL ,
  iso3 char(3)   DEFAULT NULL ,
  iso2 char(2)   DEFAULT NULL ,
  phonecode varchar(255)   DEFAULT NULL ,
  capital varchar(255)   DEFAULT NULL ,
  currency varchar(255)   DEFAULT NULL ,
  natives varchar(255)   DEFAULT NULL ,
  flag tinyint(4)  NOT NULL ,
  wiki_data_id varchar(255)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE world_state (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255)  NOT NULL ,
  country_id int(10) unsigned NOT NULL ,
  country_code char(2)  NOT NULL ,
  fips_code varchar(255)   DEFAULT NULL ,
  iso2 varchar(255)   DEFAULT NULL ,
  flag tinyint(4)  NOT NULL ,
  wiki_data_id varchar(255)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE world_city (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255)  NOT NULL ,
  state_id int(10) unsigned NOT NULL ,
  state_code varchar(255)  NOT NULL ,
  country_id int(10) unsigned NOT NULL ,
  country_code char(2)  NOT NULL ,
  latitude decimal(10,8)  NOT NULL ,
  longitude decimal(11,8)  NOT NULL ,
  flag tinyint(4)  NOT NULL ,
  wiki_data_id varchar(255)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#########################################################
#		world_country
#		world_state
#		world_city
#		CSV 파일 import 수행
#########################################################




# 공통코드
CREATE TABLE code_group (
	code varchar(20) not null,
	description varchar(200),
	is_use varchar(20) not null,
	name varchar(100) not null,
	order_seq integer not null,
	primary key (code)
);

CREATE TABLE code_common (
	group_code varchar(20) not null,
	code varchar(20) not null,
	description varchar(200),
	is_use varchar(20) not null,
	name varchar(100) not null,
	order_seq integer not null,
	primary key (group_code, code)
);


CREATE TABLE api_execute_time (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  ip varchar(20)   DEFAULT NULL ,
  api varchar(200)   DEFAULT NULL ,
  execute_time int(10)   DEFAULT NULL ,
  data longtext   DEFAULT NULL ,
  registered_at datetime(6)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



CREATE TABLE venue (  
  id varchar(100)  NOT NULL ,
  country_id int(10) unsigned NOT NULL ,
  state_id int(10) unsigned  DEFAULT NULL ,
  city_id int(10) unsigned  DEFAULT NULL ,
  event_name varchar(20)  NOT NULL ,
  event_code varchar(100)   DEFAULT NULL ,
  name varchar(255)  NOT NULL ,
  description longtext   DEFAULT NULL ,
  timezone_name varchar(100)   DEFAULT NULL ,
  timezone_offset varchar(100)   DEFAULT NULL ,
  comment longtext   DEFAULT NULL ,
  updated_at datetime(6)   DEFAULT NULL ,
  registered_at datetime(6)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE event (
  id varchar(100)  NOT NULL ,
  name varchar(255)   DEFAULT NULL ,
  description longtext   DEFAULT NULL ,
  system_id varchar(100)  NOT NULL ,
  scheduled_at datetime(6)   DEFAULT NULL ,
  live_status varchar(20)   DEFAULT NULL ,
  is_public varchar(20)   DEFAULT NULL ,
  banner varchar(255)   DEFAULT NULL ,
  updated_at datetime(6)   DEFAULT NULL ,
  registered_at datetime(6)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE system (
  id varchar(100)  NOT NULL ,
  name varchar(255)   DEFAULT NULL ,
  description longtext   DEFAULT NULL ,
  venue_id varchar(100)  NOT NULL ,
  fps decimal(20,15)   DEFAULT NULL ,
  width int(10) unsigned  DEFAULT NULL ,
  height int(10) unsigned  DEFAULT NULL ,
  is_extra varchar(20)   DEFAULT NULL ,
  comment longtext   DEFAULT NULL ,
  subinfo_updated_at datetime(6)   DEFAULT NULL ,
  updated_at datetime(6)   DEFAULT NULL ,
  registered_at datetime(6)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE groups (  
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255)   DEFAULT NULL ,
  system_id varchar(100)  NOT NULL ,
  description longtext   DEFAULT NULL ,
  gop int(10) unsigned  DEFAULT NULL ,
  fps decimal(20,15)   DEFAULT NULL ,
  width int(10) unsigned  DEFAULT NULL ,
  height int(10) unsigned  DEFAULT NULL ,
  bitrate int(20) unsigned  DEFAULT NULL ,
  is_replay varchar(20)   DEFAULT NULL ,
  is_pdview varchar(20)   DEFAULT NULL ,
  is_multiview varchar(20)   DEFAULT NULL ,
  is_interactive varchar(20)   DEFAULT NULL ,
  is_timemachine varchar(20)   DEFAULT NULL ,
  codec_info varchar(255)   DEFAULT NULL ,
  comment longtext   DEFAULT NULL ,
  updated_at datetime(6)   ,
  registered_at datetime(6)   ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE channel (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255)   DEFAULT NULL ,
  system_id varchar(100)   DEFAULT NULL ,
  group_id int(10) unsigned  DEFAULT NULL ,
  description longtext   DEFAULT NULL ,
  live_index int(10) unsigned  DEFAULT NULL ,
  pdview_master_index int(10) unsigned  DEFAULT NULL ,
  camera_ip varchar(39)   DEFAULT NULL ,
  server_ip varchar(39)   DEFAULT NULL ,
  server_port int(10) unsigned  DEFAULT NULL ,
  status varchar(20)   DEFAULT NULL ,
  audio varchar(255)   DEFAULT NULL ,
  updated_at datetime(6)   ,
  registered_at datetime(6)   ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE node (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255)   DEFAULT NULL ,
  system_id varchar(100)  NOT NULL ,
  public_ip varchar(39)   DEFAULT NULL ,
  public_port int(10)   DEFAULT NULL ,
  private_ip varchar(39)   DEFAULT NULL ,
  private_port int(10)   DEFAULT NULL ,
  node_type varchar(20)   DEFAULT NULL ,
  is_origin varchar(20)   DEFAULT NULL ,
  domain varchar(255)   DEFAULT NULL ,
  region varchar(100)   DEFAULT NULL ,
  region_name varchar(100)   DEFAULT NULL ,
  instance_id varchar(255)   DEFAULT NULL ,
  initial_state varchar(255)   DEFAULT NULL ,
  is_auto_scale_out varchar(20)   DEFAULT NULL ,
  parent_node_id int(10) unsigned  DEFAULT NULL ,
  updated_at datetime(6)   ,
  registered_at datetime(6)   ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM01','여부코드','여부, 유무 코드',1,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM02','라이브상태','라이브 상태 코드',2,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM03','채널상태','채널 상태 코드',3,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','노드유형','노드 유형 코드',4,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM05','이벤트상태','이벤트상태코드',5,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM06','AWS인스턴스상태','AWS인스턴스상태',6,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','리전정보','리전정보',7,'Y'); 

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM01','CM01Y','Y','Y','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM01','CM01N','N','N','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM02','CM0201','scheduled','SCHEDULED','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM02','CM0202','live','LIVE','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM02','CM0203','canceled','CANCELED','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM02','CM0204','finished','FINISHED','4','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM03','CM0301','active','ACTIVE','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM03','CM0302','inactive','INACTIVE','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0401','4dc','FDC','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0402','4drs','FDRS','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0403','4dsr','FDSR','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0404','4drm','FDRM','4','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0405','4dss','FDSS','5','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0406','4dls','FDLS','6','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM05','CM0501','pause','PAUSE','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM05','CM0502','resume','RESUME','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM05','CM0503','end','END','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM06','CM0601','running','RUNNING','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM06','CM0602','temporary','TEMPORARY','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM06','CM0603','terminated','TERMINATED','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-northeast-2','Incheon','SEOUL','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-west-1','California','CAL','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-east-2','Ohio','OHIO','3','Y'); 



INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM08','4DLS유형','4인 유형 코드',8,'Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM08','CM0801','master','MASTER','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM08','CM0802','slave','SLAVE','2','Y'); 

ALTER TABLE ims.node ADD ls_type varchar(20) DEFAULT NULL NULL AFTER is_auto_scale_out;

CREATE TABLE rule (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  system_id varchar(100)  NOT NULL ,
  name varchar(255)   DEFAULT NULL ,
  description longtext   DEFAULT NULL ,
  node_type varchar(20)   DEFAULT NULL ,
  session int(10) unsigned  DEFAULT NULL ,
  max_instances int(10) unsigned  DEFAULT NULL ,
  updated_at datetime(6)   ,
  registered_at datetime(6)   ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE scale (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  system_id varchar(100)  NOT NULL ,
  scale_group_count int(10) unsigned  DEFAULT NULL ,
  scale_image_id varchar(255)   DEFAULT NULL ,
  scale_instance_type varchar(255)   DEFAULT NULL ,
  scale_security_group_ids varchar(255)   DEFAULT NULL ,
  scale_subnet_ids varchar(255)   DEFAULT NULL ,
  scale_monitoring_tag_name varchar(255)   DEFAULT NULL ,
  scale_monitoring_tag_value varchar(255)   DEFAULT NULL ,
  scale_on varchar(20)   DEFAULT NULL ,
  scale_out_resource int(10) unsigned  DEFAULT NULL ,
  scale_int_resource int(10) unsigned  DEFAULT NULL ,
  scale_out_limit_time int(10) unsigned  DEFAULT NULL ,
  scale_ss_name varchar(255)   DEFAULT NULL ,
  updated_at datetime(6)   ,
  registered_at datetime(6)   ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


ALTER TABLE ims.rule ADD region varchar(100) DEFAULT NULL NULL AFTER max_instances;
ALTER TABLE ims.scale ADD region varchar(100) DEFAULT NULL NULL AFTER scale_ss_name;

ALTER TABLE ims.event ADD status varchar(20) DEFAULT NULL NULL AFTER is_public;

ALTER TABLE ims.`scale` CHANGE scale_int_resource scale_in_resource int(10) unsigned NULL;

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-east-1','Virginia','VIR','4','Y'); 

ALTER TABLE ims.`scale` ADD scale_key_name varchar(255) NULL AFTER scale_ss_name;


INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM09','nodeStatus','nodeStatus',9,'Y');
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM09','CM0901','enable','ENABLE','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM09','CM0902','disable','DISABLE','2','Y'); 
 
ALTER TABLE ims.`node` ADD state varchar(255) NULL AFTER initial_state;



INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM10','그룹유형','그룹유형',10,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM11','미디어유형','미디어유형',11,'Y'); 
INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM12','오디오채널유형','오디오채널유형',12,'Y'); 

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM10','CM1001','1','MAINVIEW','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM10','CM1002','2','SUBVIEW','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM11','CM1101','1','VIDEO','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM11','CM1102','2','AUDIO','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM11','CM1103','3','ALL','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM12','CM1201','1','모노','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM12','CM1202','2','스테레오','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM12','CM1203','3','서라운드','3','Y'); 


ALTER TABLE ims.groups DROP COLUMN gop;
ALTER TABLE ims.groups DROP COLUMN fps;
ALTER TABLE ims.groups DROP COLUMN width;
ALTER TABLE ims.groups DROP COLUMN height;
ALTER TABLE ims.groups DROP COLUMN bitrate;
ALTER TABLE ims.groups DROP COLUMN is_multiview;
ALTER TABLE ims.groups DROP COLUMN codec_info;
ALTER TABLE ims.groups DROP COLUMN comment;


ALTER TABLE ims.`groups` ADD type varchar(20) NULL AFTER description;
ALTER TABLE ims.`groups` ADD is_external_group varchar(20) NULL AFTER type;


CREATE TABLE video (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  group_id varchar(100)  NOT NULL ,
  codec varchar(255)   DEFAULT NULL ,
  width int(10) unsigned  DEFAULT NULL ,
  height int(10) unsigned  DEFAULT NULL ,
  bitrate int(20) unsigned  DEFAULT NULL ,
  gop int(10) unsigned  DEFAULT NULL ,
  fps decimal(20,15)   DEFAULT NULL ,
  is_input varchar(20)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE audio (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  group_id varchar(100)  NOT NULL ,
  codec varchar(255)   DEFAULT NULL ,
  channel_type varchar(20)   DEFAULT NULL ,
  sample_rate varchar(255)   DEFAULT NULL ,
  sample_bit varchar(255)   DEFAULT NULL ,
  is_input varchar(20)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


ALTER TABLE ims.`channel` ADD media_type varchar(20) NULL AFTER server_port;

delete from code_common where group_code = 'CM07';
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-east-1','VIR','미국동부 버지니아 북부','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-east-2','OH','미국동부 오하이오','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-west-1','CAL','미국서부 캘리포니아','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','us-west-2','OR','미국서부오레곤','4','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-northeast-2','KR','아시아태평양 서울','5','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-southeast-1','SIN','아시아태평양 싱가포르','6','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-southeast-2','SYD','아시아태평양 시드니','7','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-northeast-1','JP','아시아태평양 도쿄','8','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ca-central-1','CAN','캐나다 중부','9','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-central-1','GER','유럽 프랑크푸르트','10','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-west-2','UK','유럽 런던','11','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-south-1','ITA','유럽 밀라노','12','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-west-3','FRA','유럽 파리','13','Y'); 



ALTER TABLE ims.`groups` ADD default_channel_index int(10) NULL AFTER is_timemachine;
ALTER TABLE ims.`groups` ADD group_index int(10) NULL AFTER default_channel_index;



INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0407','cms','CMS','7','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0408','4dml','FDML','8','Y'); 

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-east-1','HK','아시아태평양 홍콩','14','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','af-south-1','KT','아프리카 케이프타운','15','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-south-1','MB','아시아태평양 뭄바이','16','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','ap-northeast-3','OS','아시아태평양 오사카','17','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-west-1','IL','유럽 아일랜드','18','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','eu-north-1','SH','유럽 스톡홀름','19','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','me-south-1','BA','중동 바레인','20','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM07','sa-east-1','BRA','남아메리카 상파울루','21','Y'); 



ALTER TABLE ims.`groups` ADD default_audio_index int(10) NULL AFTER default_channel_index;
ALTER TABLE ims.`groups` ADD is_default_group varchar(20) NULL AFTER default_audio_index;


ALTER TABLE ims.`groups` ADD view_type varchar(20) NULL AFTER group_index;


INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','viewType','viewType',13,'Y'); 

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1301','MAINVIEWA','MAINVIEWA','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1302','MAINVIEWB','MAINVIEWB','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1303','MAINVIEWC','MAINVIEWC','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1304','MAINVIEWD','MAINVIEWD','4','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1305','MAINVIEWE','MAINVIEWE','5','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1306','MAINVIEWF','MAINVIEWF','6','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1307','MAINVIEWG','MAINVIEWG','7','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1308','MAINVIEWH','MAINVIEWH','8','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1309','MAINVIEWI','MAINVIEWI','9','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1310','MAINVIEWJ','MAINVIEWJ','10','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1311','MULTIVIEWA','MULTIVIEWA','11','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1312','MULTIVIEWB','MULTIVIEWB','12','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1313','MULTIVIEWC','MULTIVIEWC','13','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1314','MULTIVIEWD','MULTIVIEWD','14','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1315','MULTIVIEWE','MULTIVIEWE','15','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1316','MULTIVIEWF','MULTIVIEWF','16','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1317','BIRDVIEWA','BIRDVIEWA','17','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1318','BIRDVIEWB','BIRDVIEWB','18','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1319','BIRDVIEWC','BIRDVIEWC','19','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1320','EXTERNALA','EXTERNALA','20','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1321','EXTERNALB','EXTERNALB','21','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1322','EXTERNALC','EXTERNALC','22','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1323','PDVIEWA','PDVIEWA','23','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1324','PDVIEWB','PDVIEWB','24','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM13','CM1325','PDVIEWC','PDVIEWC','25','Y'); 




ALTER TABLE ims.`event` ADD content_id int(10) NULL AFTER id;


INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0409','ims','IMS','9','Y'); 


ALTER TABLE ims.`channel` ADD gimbal_ip varchar(39) NULL AFTER media_type;
ALTER TABLE ims.`channel` ADD is_gimbal_reset varchar(20) NULL AFTER gimbal_ip;


INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','4DML유형','4DML유형',14,'Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1401','1','Dispatcher','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1402','2','EMSG','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1403','3','4DML_Media_Pipeline','3','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1404','4','Vod_Pipeline','4','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1405','5','iVod_PipeLine','5','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1406','6','Mediastore','6','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1407','7','4DML_Manager','7','Y'); 



ALTER TABLE ims.`node` ADD ml_type varchar(20) NULL AFTER ls_type;
ALTER TABLE ims.`scale` ADD scale_instance_type2 varchar(20) NULL AFTER scale_instance_type;


INSERT INTO code_group (`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM15','deployType','deployType',15,'Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM15','CM1501','mediastore','MEDIASTORE','1','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM15','CM1502','s3','S3','2','Y'); 
INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM15','CM1503','file_server','FILE_SERVER','3','Y'); 


ALTER TABLE ims.`node` ADD deploy_type varchar(20) NULL AFTER ml_type;



CREATE TABLE adaptive_streaming (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  group_id int(10) unsigned NOT NULL ,
  codec varchar(255)   DEFAULT NULL ,
  width int(10) unsigned  DEFAULT NULL ,
  height int(10) unsigned  DEFAULT NULL ,
  bitrate int(20) unsigned  DEFAULT NULL ,
  gop int(10) unsigned  DEFAULT NULL ,
  fps decimal(20,15)   DEFAULT NULL ,
  is_input varchar(20)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



ALTER TABLE ims.world_country ADD code INT(11) NULL;
update world_country set code = 4 where id = 1;
update world_country set code = 248 where id = 2;
update world_country set code = 8 where id = 3;
update world_country set code = 12 where id = 4;
update world_country set code = 16 where id = 5;
update world_country set code = 20 where id = 6;
update world_country set code = 24 where id = 7;
update world_country set code = 660 where id = 8;
update world_country set code = 10 where id = 9;
update world_country set code = 28 where id = 10;
update world_country set code = 32 where id = 11;
update world_country set code = 51 where id = 12;
update world_country set code = 533 where id = 13;
update world_country set code = 36 where id = 14;
update world_country set code = 40 where id = 15;
update world_country set code = 31 where id = 16;
update world_country set code = 44 where id = 17;
update world_country set code = 48 where id = 18;
update world_country set code = 50 where id = 19;
update world_country set code = 52 where id = 20;
update world_country set code = 112 where id = 21;
update world_country set code = 56 where id = 22;
update world_country set code = 84 where id = 23;
update world_country set code = 204 where id = 24;
update world_country set code = 60 where id = 25;
update world_country set code = 64 where id = 26;
update world_country set code = 68 where id = 27;
update world_country set code = 70 where id = 28;
update world_country set code = 72 where id = 29;
update world_country set code = 74 where id = 30;
update world_country set code = 76 where id = 31;
update world_country set code = 86 where id = 32;
update world_country set code = 96 where id = 33;
update world_country set code = 100 where id = 34;
update world_country set code = 854 where id = 35;
update world_country set code = 108 where id = 36;
update world_country set code = 116 where id = 37;
update world_country set code = 120 where id = 38;
update world_country set code = 124 where id = 39;
update world_country set code = 136 where id = 41;
update world_country set code = 140 where id = 42;
update world_country set code = 148 where id = 43;
update world_country set code = 152 where id = 44;
update world_country set code = 156 where id = 45;
update world_country set code = 162 where id = 46;
update world_country set code = 166 where id = 47;
update world_country set code = 170 where id = 48;
update world_country set code = 174 where id = 49;
update world_country set code = 178 where id = 50;
update world_country set code = 180 where id = 51;
update world_country set code = 184 where id = 52;
update world_country set code = 188 where id = 53;
update world_country set code = 384 where id = 54;
update world_country set code = 191 where id = 55;
update world_country set code = 192 where id = 56;
update world_country set code = 196 where id = 57;
update world_country set code = 203 where id = 58;
update world_country set code = 208 where id = 59;
update world_country set code = 262 where id = 60;
update world_country set code = 212 where id = 61;
update world_country set code = 214 where id = 62;
update world_country set code = 626 where id = 63;
update world_country set code = 218 where id = 64;
update world_country set code = 818 where id = 65;
update world_country set code = 222 where id = 66;
update world_country set code = 226 where id = 67;
update world_country set code = 232 where id = 68;
update world_country set code = 233 where id = 69;
update world_country set code = 231 where id = 70;
update world_country set code = 238 where id = 71;
update world_country set code = 234 where id = 72;
update world_country set code = 242 where id = 73;
update world_country set code = 246 where id = 74;
update world_country set code = 250 where id = 75;
update world_country set code = 254 where id = 76;
update world_country set code = 258 where id = 77;
update world_country set code = 260 where id = 78;
update world_country set code = 266 where id = 79;
update world_country set code = 270 where id = 80;
update world_country set code = 268 where id = 81;
update world_country set code = 276 where id = 82;
update world_country set code = 288 where id = 83;
update world_country set code = 292 where id = 84;
update world_country set code = 300 where id = 85;
update world_country set code = 304 where id = 86;
update world_country set code = 308 where id = 87;
update world_country set code = 312 where id = 88;
update world_country set code = 316 where id = 89;
update world_country set code = 320 where id = 90;
update world_country set code = 831 where id = 91;
update world_country set code = 324 where id = 92;
update world_country set code = 624 where id = 93;
update world_country set code = 328 where id = 94;
update world_country set code = 332 where id = 95;
update world_country set code = 334 where id = 96;
update world_country set code = 340 where id = 97;
update world_country set code = 344 where id = 98;
update world_country set code = 348 where id = 99;
update world_country set code = 352 where id = 100;
update world_country set code = 356 where id = 101;
update world_country set code = 360 where id = 102;
update world_country set code = 364 where id = 103;
update world_country set code = 368 where id = 104;
update world_country set code = 372 where id = 105;
update world_country set code = 376 where id = 106;
update world_country set code = 380 where id = 107;
update world_country set code = 388 where id = 108;
update world_country set code = 392 where id = 109;
update world_country set code = 832 where id = 110;
update world_country set code = 400 where id = 111;
update world_country set code = 398 where id = 112;
update world_country set code = 404 where id = 113;
update world_country set code = 296 where id = 114;
update world_country set code = 408 where id = 115;
update world_country set code = 410 where id = 116;
update world_country set code = 414 where id = 117;
update world_country set code = 417 where id = 118;
update world_country set code = 418 where id = 119;
update world_country set code = 428 where id = 120;
update world_country set code = 422 where id = 121;
update world_country set code = 426 where id = 122;
update world_country set code = 430 where id = 123;
update world_country set code = 434 where id = 124;
update world_country set code = 438 where id = 125;
update world_country set code = 440 where id = 126;
update world_country set code = 442 where id = 127;
update world_country set code = 446 where id = 128;
update world_country set code = 807 where id = 129;
update world_country set code = 450 where id = 130;
update world_country set code = 454 where id = 131;
update world_country set code = 458 where id = 132;
update world_country set code = 462 where id = 133;
update world_country set code = 466 where id = 134;
update world_country set code = 470 where id = 135;
update world_country set code = 584 where id = 137;
update world_country set code = 474 where id = 138;
update world_country set code = 478 where id = 139;
update world_country set code = 480 where id = 140;
update world_country set code = 175 where id = 141;
update world_country set code = 484 where id = 142;
update world_country set code = 583 where id = 143;
update world_country set code = 498 where id = 144;
update world_country set code = 492 where id = 145;
update world_country set code = 496 where id = 146;
update world_country set code = 499 where id = 147;
update world_country set code = 500 where id = 148;
update world_country set code = 504 where id = 149;
update world_country set code = 508 where id = 150;
update world_country set code = 104 where id = 151;
update world_country set code = 516 where id = 152;
update world_country set code = 520 where id = 153;
update world_country set code = 524 where id = 154;
update world_country set code = 528 where id = 156;
update world_country set code = 540 where id = 157;
update world_country set code = 554 where id = 158;
update world_country set code = 558 where id = 159;
update world_country set code = 562 where id = 160;
update world_country set code = 566 where id = 161;
update world_country set code = 570 where id = 162;
update world_country set code = 574 where id = 163;
update world_country set code = 580 where id = 164;
update world_country set code = 578 where id = 165;
update world_country set code = 512 where id = 166;
update world_country set code = 586 where id = 167;
update world_country set code = 585 where id = 168;
update world_country set code = 275 where id = 169;
update world_country set code = 591 where id = 170;
update world_country set code = 598 where id = 171;
update world_country set code = 600 where id = 172;
update world_country set code = 604 where id = 173;
update world_country set code = 608 where id = 174;
update world_country set code = 612 where id = 175;
update world_country set code = 616 where id = 176;
update world_country set code = 620 where id = 177;
update world_country set code = 630 where id = 178;
update world_country set code = 634 where id = 179;
update world_country set code = 638 where id = 180;
update world_country set code = 642 where id = 181;
update world_country set code = 643 where id = 182;
update world_country set code = 646 where id = 183;
update world_country set code = 654 where id = 184;
update world_country set code = 659 where id = 185;
update world_country set code = 662 where id = 186;
update world_country set code = 666 where id = 187;
update world_country set code = 670 where id = 188;
update world_country set code = 882 where id = 191;
update world_country set code = 674 where id = 192;
update world_country set code = 678 where id = 193;
update world_country set code = 682 where id = 194;
update world_country set code = 686 where id = 195;
update world_country set code = 688 where id = 196;
update world_country set code = 690 where id = 197;
update world_country set code = 694 where id = 198;
update world_country set code = 702 where id = 199;
update world_country set code = 703 where id = 200;
update world_country set code = 705 where id = 201;
update world_country set code = 90 where id = 202;
update world_country set code = 706 where id = 203;
update world_country set code = 710 where id = 204;
update world_country set code = 239 where id = 205;
update world_country set code = 728 where id = 206;
update world_country set code = 724 where id = 207;
update world_country set code = 144 where id = 208;
update world_country set code = 729 where id = 209;
update world_country set code = 740 where id = 210;
update world_country set code = 744 where id = 211;
update world_country set code = 748 where id = 212;
update world_country set code = 752 where id = 213;
update world_country set code = 756 where id = 214;
update world_country set code = 760 where id = 215;
update world_country set code = 158 where id = 216;
update world_country set code = 762 where id = 217;
update world_country set code = 834 where id = 218;
update world_country set code = 764 where id = 219;
update world_country set code = 768 where id = 220;
update world_country set code = 772 where id = 221;
update world_country set code = 776 where id = 222;
update world_country set code = 780 where id = 223;
update world_country set code = 788 where id = 224;
update world_country set code = 792 where id = 225;
update world_country set code = 795 where id = 226;
update world_country set code = 796 where id = 227;
update world_country set code = 798 where id = 228;
update world_country set code = 800 where id = 229;
update world_country set code = 804 where id = 230;
update world_country set code = 784 where id = 231;
update world_country set code = 826 where id = 232;
update world_country set code = 840 where id = 233;
update world_country set code = 581 where id = 234;
update world_country set code = 858 where id = 235;
update world_country set code = 860 where id = 236;
update world_country set code = 548 where id = 237;
update world_country set code = 862 where id = 239;
update world_country set code = 704 where id = 240;
update world_country set code = 92 where id = 241;
update world_country set code = 850 where id = 242;
update world_country set code = 876 where id = 243;
update world_country set code = 732 where id = 244;
update world_country set code = 887 where id = 245;
update world_country set code = 894 where id = 246;
update world_country set code = 716 where id = 247;



INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM14','CM1408','8','CLOUD_FRONT','8','Y'); 



#########################################################
#		2021.12.06 외부 배포 전혀 없음						#
#		2021.12.09 RAPA 적용함						    #
#		ID int ==> varchar 변경 작업 						#
#		node, rule, scale								#
#		groups											#
#			channel, video, audio, adaptive_streaming	#
#########################################################
ALTER TABLE ims.node MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.node MODIFY COLUMN parent_node_id varchar(100) DEFAULT NULL NULL;
ALTER TABLE ims.rule MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.scale MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.groups MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.channel MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.video MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.audio MODIFY COLUMN id varchar(100) NOT NULL;
ALTER TABLE ims.adaptive_streaming MODIFY COLUMN id varchar(100) NOT NULL;

ALTER TABLE ims.channel MODIFY COLUMN group_id varchar(100) DEFAULT NULL NULL;
ALTER TABLE ims.adaptive_streaming MODIFY COLUMN group_id varchar(100) NOT NULL;


#set sql_safe_updates=0;

UPDATE node SET id = CONCAT(system_id,  LPAD( id, 3, '0')), parent_node_id = IF(parent_node_id = 0, NULL, CONCAT(system_id,  LPAD( parent_node_id, 3, '0')));
UPDATE rule SET id = CONCAT(system_id,  LPAD( id, 3, '0'));
UPDATE scale SET id = CONCAT(system_id,  LPAD( id, 3, '0'));
UPDATE channel SET id = CONCAT(system_id,  LPAD( id, 3, '0')), group_id = CONCAT(system_id,  LPAD( group_id, 3, '0'));
UPDATE video SET id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( RIGHT( id, 3 ), 3, '0')), group_id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( group_id, 3, '0'));
UPDATE audio SET id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( RIGHT( id, 3 ), 3, '0')), group_id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( group_id, 3, '0'));
UPDATE adaptive_streaming SET id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( RIGHT( id, 3 ), 3, '0')), group_id = CONCAT((SELECT system_id FROM groups WHERE id = group_id),  LPAD( group_id , 3, '0'));
UPDATE groups SET id = CONCAT(system_id,  LPAD( id, 3, '0'));


CREATE TABLE monit (
  id varchar(100)  NOT NULL ,
  system_id varchar(100)  NOT NULL ,
  node_type varchar(20)   DEFAULT NULL ,
  region varchar(100)   DEFAULT NULL ,
  node_id varchar(100)   DEFAULT NULL ,
  node_name varchar(255)   DEFAULT NULL ,
  private_ip varchar(39)   DEFAULT NULL ,
  private_port int(10)   DEFAULT NULL ,
  action varchar(50)   DEFAULT NULL ,
  status varchar(50)   DEFAULT NULL ,
  message longtext   DEFAULT NULL ,
  registered_at datetime(6)   DEFAULT NULL ,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


UPDATE code_common SET name = 'cms_w', description ='CMS_W' WHERE code = 'CM0409';

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0410','ims','IMS','10','Y');

INSERT INTO code_common (`group_code`,`code`,`name`,`description`,`order_seq`,`is_use`) VALUES ('CM04','CM0411','prewarmer','PREWARM','11','Y');
