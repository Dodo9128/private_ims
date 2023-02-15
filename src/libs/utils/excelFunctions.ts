export const downloadFileNameMakerForVenue = systemId => {
  const currentDate = new Date();
  const timeHour =
    currentDate.getHours().toString().length === 2 ? currentDate.getHours() : "0" + currentDate.getHours();
  const timeMinute =
    currentDate.getMinutes().toString().length === 2 ? currentDate.getMinutes() : "0" + currentDate.getMinutes();

  const currentTime = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}_${timeHour}${timeMinute}`;

  return `${process.env.HOSTNAME}_${systemId}_INFO_${currentTime}`;
};

export const downloadFileNameMakerForCameraGroup = systemId => {
  const currentDate = new Date();
  const timeHour =
    currentDate.getHours().toString().length === 2 ? currentDate.getHours() : "0" + currentDate.getHours();
  const timeMinute =
    currentDate.getMinutes().toString().length === 2 ? currentDate.getMinutes() : "0" + currentDate.getMinutes();

  const currentTime = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}_${timeHour}${timeMinute}`;

  return `${process.env.HOSTNAME}_${systemId}_CAMERA_GROUP_INFO_${currentTime}`;
};

export const venueExportVenueDataAdd = (venueData, row) => {
  row.getCell(1).value = "VENUE";
  row.getCell(2).value = "O";
  row.getCell(3).value = venueData.id;
  row.getCell(4).value = venueData.country_id;
  row.getCell(5).value = venueData.state_id;
  row.getCell(6).value = venueData.city_id;
  row.getCell(7).value = venueData.event_name;
  row.getCell(8).value = venueData.event_yymm;
  row.getCell(9).value = venueData.name;
  row.getCell(10).value = venueData.description;
  row.getCell(11).value = venueData.timezone_name;
  row.getCell(12).value = venueData.timezone_offset;
  row.getCell(13).value = venueData.comment;
};

export const venueExportSystemDataAdd = (systemData, row) => {
  row.getCell(1).value = "SYSTEM";
  row.getCell(2).value = "O";
  row.getCell(16).value = systemData.name;
  row.getCell(17).value = systemData.description;
  row.getCell(18).value = systemData.fps;
  row.getCell(19).value = systemData.width;
  row.getCell(20).value = systemData.height;
  row.getCell(21).value = systemData.is_extra;
};

export const venueExportRuleDataAdd = (ruleData, row) => {
  row.getCell(1).value = "RULE";
  row.getCell(2).value = "O";
  row.getCell(25).value = ruleData.name;
  row.getCell(26).value = ruleData.description;
  row.getCell(27).value = ruleData.node_type.toUpperCase();
  row.getCell(28).value = ruleData.session;
  row.getCell(29).value = ruleData.max_instances;
  row.getCell(30).value = ruleData.region;
};

export const venueExportScaleDataAdd = (scaleData, row) => {
  row.getCell(1).value = "SCALE";
  row.getCell(2).value = "O";
  row.getCell(33).value = scaleData.scale_group_count;
  row.getCell(34).value = scaleData.scale_image_id;
  row.getCell(35).value = scaleData.scale_instance_type;
  row.getCell(36).value = scaleData.scale_instance_type2;
  row.getCell(37).value = scaleData.scale_security_group_ids;
  row.getCell(38).value = scaleData.scale_subnet_ids;
  row.getCell(39).value = scaleData.scale_monitoring_tag_name;
  row.getCell(40).value = scaleData.scale_monitoring_tag_value;
  row.getCell(41).value = scaleData.scale_on;
  row.getCell(42).value = scaleData.scale_out_resource;
  row.getCell(43).value = scaleData.scale_in_resource;
  row.getCell(44).value = scaleData.scale_out_limit_time;
  row.getCell(45).value = scaleData.scale_ss_name;
  row.getCell(46).value = scaleData.scale_key_name;
  row.getCell(47).value = scaleData.region;
};

export const venueExportNodeDataAdd = (nodeData, devWorkSheet) => {
  // nodeData의 갯수만큼 row 생성, 로직 작성해야 함
  // node의 row는 8부터 시작
  for (let i = 8; i < 8 + nodeData.length; i++) {
    const row = devWorkSheet.getRow(i);
    const currentNode = nodeData[i - 8];

    row.getCell(1).value = "NODE";
    row.getCell(2).value = "O";

    row.getCell(51).value = String(i - 8).length === 2 ? `ID-${i - 8}` : `ID-0${i - 8}`;
    row.getCell(53).value = currentNode.name;

    // cms_w 는 바꿔줘야함
    if (currentNode.node_type === "cms_w") {
      currentNode.node_type = "cmsw";
    }
    if (currentNode.node_type === "prewarmer") {
      currentNode.node_type = "prewarm";
    }
    row.getCell(54).value = currentNode.node_type.toUpperCase();

    row.getCell(55).value = currentNode.public_ip;
    row.getCell(56).value = currentNode.public_port === 0 ? "" : currentNode.public_port;
    row.getCell(57).value = currentNode.private_ip;
    row.getCell(58).value = currentNode.private_port === 0 ? "" : currentNode.private_port;
    row.getCell(59).value = currentNode.domain;
    row.getCell(60).value = currentNode.region;
    row.getCell(62).value = currentNode.is_origin;
    row.getCell(63).value = currentNode.ls_type.toLowerCase();
    if (currentNode.ml_type === "4DML_Media_Pipeline") {
      currentNode.ml_type = "Media_Pipeline";
    }
    row.getCell(64).value = currentNode.ml_type;
    row.getCell(65).value = currentNode.deploy_type.toLowerCase();
    row.getCell(66).value = currentNode.instance_id;
    row.getCell(67).value = currentNode.initial_state.toLowerCase();
  }
};

export const cameraGroupExportStarter = (dataSet, channelWorkSheet, adaptiveStreamingWorkSheet) => {
  const systemId = dataSet.systemId;
  const node = dataSet.node;
  const channel = dataSet.channel;
  const group = dataSet.group;
  const video = dataSet.video;
  const audio = dataSet.audio;
  const adaptiveStreaming = dataSet.adaptiveStreaming;

  // node 관련
  // Bell은 ims ip가 두개 들어가야 해서 환경 변수에 따라 분기해야 함
  if (
    process.env.NODE_ENV.includes("bell") ||
    process.env.NODE_ENV.includes("Bell") ||
    process.env.NODE_ENV.includes("BELL")
  ) {
    let ims;
    let cms;
    const imsIpArr = [];
    for (const elem of node) {
      if (elem.node_type === "IMS") {
        imsIpArr.push(elem.public_ip);
        ims = elem;
      }
      if (elem.node_type === "CMS") {
        cms = elem;
      }
    }
    channelWorkSheet.getRow(1).getCell(14).value = imsIpArr.join(" or ");
    channelWorkSheet.getRow(1).getCell(21).value = ims.domain;
    channelWorkSheet.getRow(2).getCell(14).value = systemId;
    channelWorkSheet.getRow(2).getCell(21).value = cms.domain;
  } else {
    // Bell 이외 베뉴
    for (const elem of node) {
      if (elem.node_type === "IMS") {
        channelWorkSheet.getRow(1).getCell(14).value = elem.public_ip;
        channelWorkSheet.getRow(1).getCell(21).value = elem.domain;
        channelWorkSheet.getRow(2).getCell(14).value = systemId;
      }
      if (elem.node_type === "CMS") {
        channelWorkSheet.getRow(2).getCell(21).value = elem.domain;
      }
    }
  }

  // 그룹채널정보 정보 등록 row number
  const startIdx = 13;

  // channel 관련
  let channelStartIdx = startIdx;
  for (const elem of channel) {
    channelWorkSheet.getRow(channelStartIdx).getCell(1).value = elem.channel_index;
    channelWorkSheet.getRow(channelStartIdx).getCell(2).value = elem.camera_ip;
    channelWorkSheet.getRow(channelStartIdx).getCell(3).value = elem.name;
    channelWorkSheet.getRow(channelStartIdx).getCell(4).value = elem.status;
    channelWorkSheet.getRow(channelStartIdx).getCell(5).value = elem.media_type;
    channelWorkSheet.getRow(channelStartIdx).getCell(6).value = elem.gimbal_ip;
    channelWorkSheet.getRow(channelStartIdx).getCell(7).value = elem.gimbal_preset;
    channelWorkSheet.getRow(channelStartIdx).getCell(8).value = elem.server_ip;
    channelWorkSheet.getRow(channelStartIdx).getCell(9).value = elem.server_port;
    channelWorkSheet.getRow(channelStartIdx).getCell(10).value = elem.pdview_master_index;
    channelStartIdx++;
  }

  // group 관련
  const groupIdxArr = [];
  for (let i = 0; i < group.length; i++) {
    let groupStartIdx;
    if (i === 0) {
      groupStartIdx = 13;
    } else {
      groupStartIdx = group[i].default_video_channel_index + startIdx - 1;
    }
    channelWorkSheet.getRow(groupStartIdx).getCell(12).value = group[i].group_id;
    channelWorkSheet.getRow(groupStartIdx).getCell(13).value = group[i].name;
    channelWorkSheet.getRow(groupStartIdx).getCell(14).value = group[i].view_type;
    channelWorkSheet.getRow(groupStartIdx).getCell(15).value = group[i].description;
    channelWorkSheet.getRow(groupStartIdx).getCell(16).value = group[i].type;
    channelWorkSheet.getRow(groupStartIdx).getCell(17).value = group[i].external_group;
    channelWorkSheet.getRow(groupStartIdx).getCell(18).value = group[i].default_video_channel_index;
    channelWorkSheet.getRow(groupStartIdx).getCell(19).value = group[i].default_audio_channel_index;
    channelWorkSheet.getRow(groupStartIdx).getCell(20).value = group[i].default_group;
    channelWorkSheet.getRow(groupStartIdx).getCell(21).value = group[i].interactive;
    channelWorkSheet.getRow(groupStartIdx).getCell(22).value = group[i].replay;
    channelWorkSheet.getRow(groupStartIdx).getCell(23).value = group[i].timemachine;
    channelWorkSheet.getRow(groupStartIdx).getCell(24).value = group[i].pdview;
    groupIdxArr.push(groupStartIdx);
  }

  // video 관련
  for (const key in video) {
    const videoInsertIdx = Number(key) === 0 ? groupIdxArr[`${Number(key)}`] : groupIdxArr[`${Number(key) - 1}`];

    channelWorkSheet.getRow(videoInsertIdx).getCell(26).value = video[key][0].codec;
    channelWorkSheet.getRow(videoInsertIdx).getCell(27).value = video[key][0].width;
    channelWorkSheet.getRow(videoInsertIdx).getCell(28).value = video[key][0].height;
    channelWorkSheet.getRow(videoInsertIdx).getCell(29).value = video[key][0].bitrate;
    channelWorkSheet.getRow(videoInsertIdx).getCell(30).value = video[key][0].gop;
    channelWorkSheet.getRow(videoInsertIdx).getCell(31).value = video[key][0].fps;
    channelWorkSheet.getRow(videoInsertIdx).getCell(32).value = video[key][1].codec;
    channelWorkSheet.getRow(videoInsertIdx).getCell(33).value = video[key][1].width;
    channelWorkSheet.getRow(videoInsertIdx).getCell(34).value = video[key][1].height;
    channelWorkSheet.getRow(videoInsertIdx).getCell(35).value = video[key][1].bitrate;
    channelWorkSheet.getRow(videoInsertIdx).getCell(36).value = video[key][1].gop;
    channelWorkSheet.getRow(videoInsertIdx).getCell(37).value = video[key][1].fps;
  }

  // audio 관련
  for (const key in audio) {
    const audioInsertIdx = Number(key) === 0 ? groupIdxArr[`${Number(key)}`] : groupIdxArr[`${Number(key) - 1}`];
    channelWorkSheet.getRow(audioInsertIdx).getCell(39).value = audio[key][0].channel_type;
    channelWorkSheet.getRow(audioInsertIdx).getCell(40).value = audio[key][0].codec;
    channelWorkSheet.getRow(audioInsertIdx).getCell(41).value = audio[key][0].sample_rate;
    channelWorkSheet.getRow(audioInsertIdx).getCell(42).value = audio[key][0].sample_bit;
    channelWorkSheet.getRow(audioInsertIdx).getCell(43).value = audio[key][1].channel_type;
    channelWorkSheet.getRow(audioInsertIdx).getCell(44).value = audio[key][1].codec;
    channelWorkSheet.getRow(audioInsertIdx).getCell(45).value = audio[key][1].sample_rate;
    channelWorkSheet.getRow(audioInsertIdx).getCell(46).value = audio[key][1].sample_bit;
  }

  // groupId 에 매칭되는 row의 정보가 들어있는 객체 반환
  const asGroupMatchingInfo = {};
  for (let i = 0; i <= groupIdxArr.length - 1; i++) {
    asGroupMatchingInfo[i] = { [video[i + 1][0].group_id]: groupIdxArr[i] };
  }

  // adaptive 관련
  /**
   * if Object.keys(adaptiveStreamingGroups).length === 1 이면
   * 모든 그룹의 AS_No는 1
   * else
   * Object.keys(adaptiveStreamingGroups).length 만큼의 그룹 갯수가 있음
   * group_*의 group_id를 검색해 group_1외의 그룹들은 해당 group_id의 adaptive_streaming ID,
   * 나머지는 모두 group_1과 같은 AS_group id를 부여하면 됨
   */
  let adaptiveStreamingGroupIdx = 1;
  let adaptiveStreamingStartIdx = startIdx;
  const adaptiveStreamingGroupCount = Object.keys(adaptiveStreaming).length;
  const adaptiveStreamingGroupIdArr = [];
  for (const keyKey in adaptiveStreaming) {
    adaptiveStreamingGroupIdArr.push(adaptiveStreaming[keyKey][0].group_id);
  }
  const lastAsGroupGroupId = adaptiveStreaming[adaptiveStreamingGroupCount][0].group_id;

  for (const key in adaptiveStreaming) {
    const adaptiveStreamingGroupLength = Object.keys(adaptiveStreaming).length;

    // AS 그룹이 하나인 경우
    if (adaptiveStreamingGroupLength === 1) {
      // AS group 1개, 모든 그룹이 동일한 AS group
      // camera group 만큼 insert 해야 함
      for (const insertIdx of groupIdxArr) {
        channelWorkSheet.getRow(insertIdx).getCell(48).value = 1;
      }

      for (let i = 1; i <= adaptiveStreaming[key].length; i++) {
        // 첫번째만 AS_No, input, output insert
        if (i === 1 && Number(key) === i) {
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(1).value = 1;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(2).value =
            adaptiveStreaming[key][0].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(3).value =
            adaptiveStreaming[key][0].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(4).value =
            adaptiveStreaming[key][0].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(5).value =
            adaptiveStreaming[key][0].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(6).value = adaptiveStreaming[key][0].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(7).value = adaptiveStreaming[key][0].fps;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(8).value =
            adaptiveStreaming[key][1].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(9).value =
            adaptiveStreaming[key][1].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(10).value =
            adaptiveStreaming[key][1].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(11).value =
            adaptiveStreaming[key][1].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(12).value =
            adaptiveStreaming[key][1].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(13).value =
            adaptiveStreaming[key][1].fps;
          adaptiveStreamingStartIdx++;
        } else {
          // 첫번째 줄 아닌 입력값들_output 2 ~ until end
          if (i === adaptiveStreaming[key].length) {
            // 반복문 마지막의 adaptiveStreaming[key][i] 값은 없음
            continue;
          }
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(1).value = 1;

          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(8).value =
            adaptiveStreaming[key][i].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(9).value =
            adaptiveStreaming[key][i].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(10).value =
            adaptiveStreaming[key][i].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(11).value =
            adaptiveStreaming[key][i].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(12).value =
            adaptiveStreaming[key][i].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(13).value =
            adaptiveStreaming[key][i].fps;
          adaptiveStreamingStartIdx++;
        }
      }
    } else {
      /**
       * AS group 1개 이상
       * 카메라 그룹 정보 입력 엑셀 AS_no는
       * AS_group 내부 마지막 그룹의 [0]의 group_id와
       * 같은 group_id를 가진 카메라 그룹은 AS_no 2,
       * 나머지 그룹은 모두 1
       */

      for (const idx in asGroupMatchingInfo) {
        const currentGroupId = Object.keys(asGroupMatchingInfo[Number(idx)])[0];
        if (Number(idx) === 0) {
          // 첫 idx 는 무조건 adaptiveStreaming의 첫번째 객체의 정보다
          channelWorkSheet.getRow(asGroupMatchingInfo[Number(idx)][currentGroupId]).getCell(48).value =
            adaptiveStreamingGroupIdx;
        } else {
          // groupId indexof '판별
          if (adaptiveStreamingGroupIdArr.indexOf(currentGroupId) === -1) {
            // 2번째그룹부터 이후 adaptive 세팅되어있는 그룹 ID와 비교,
            // indexOf가 -1(없을시) 일때, 이전에 이미 등록한 groupId로 판별
            channelWorkSheet.getRow(asGroupMatchingInfo[Number(idx)][currentGroupId]).getCell(48).value =
              adaptiveStreamingGroupIdx;
          } else if (adaptiveStreamingGroupIdArr.indexOf(currentGroupId) !== -1 && Number(key) !== 1) {
            // 다음 adaptiveStreaming group의 groupId와 매칭이 되었음
            // adaptiveStreamingGroupIdx를 하나 업

            adaptiveStreamingGroupIdx++;
            channelWorkSheet.getRow(asGroupMatchingInfo[Number(idx)][currentGroupId]).getCell(48).value =
              adaptiveStreamingGroupIdx;
          }
        }
      }

      // AS_NO 먼저 채우고
      let adaptiveStreamingAsNoIdx = 1;
      let startIndexForAsNoAdd = 13;
      for (let i = 0; i < adaptiveStreamingGroupIdArr.length; i++) {
        for (let j = 1; j < adaptiveStreaming[key].length; j++) {
          adaptiveStreamingWorkSheet.getRow(startIndexForAsNoAdd).getCell(1).value = adaptiveStreamingAsNoIdx;
          startIndexForAsNoAdd++;
        }
        adaptiveStreamingAsNoIdx++;
      }

      // 데이터셋 채우기
      for (let i = 1; i <= adaptiveStreaming[key].length; i++) {
        if (i === 1 && Number(key) === i) {
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(2).value =
            adaptiveStreaming[key][0].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(3).value =
            adaptiveStreaming[key][0].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(4).value =
            adaptiveStreaming[key][0].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(5).value =
            adaptiveStreaming[key][0].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(6).value = adaptiveStreaming[key][0].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(7).value = adaptiveStreaming[key][0].fps;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(8).value =
            adaptiveStreaming[key][1].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(9).value =
            adaptiveStreaming[key][1].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(10).value =
            adaptiveStreaming[key][1].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(11).value =
            adaptiveStreaming[key][1].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(12).value =
            adaptiveStreaming[key][1].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(13).value =
            adaptiveStreaming[key][1].fps;
          adaptiveStreamingStartIdx++;
        } else {
          // 첫번째 줄 아닌 입력값들_output 2 ~ until end
          if (i === adaptiveStreaming[key].length) {
            // 반복문 마지막의 adaptiveStreaming[key][i] 값은 없음
            continue;
          }

          if ((adaptiveStreamingStartIdx - 13) % 6 === 0) {
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(2).value =
              adaptiveStreaming[key][0].codec;
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(3).value =
              adaptiveStreaming[key][0].width;
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(4).value =
              adaptiveStreaming[key][0].height;
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(5).value =
              adaptiveStreaming[key][0].bitrate;
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(6).value =
              adaptiveStreaming[key][0].gop;
            adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(7).value =
              adaptiveStreaming[key][0].fps;
          }
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(8).value =
            adaptiveStreaming[key][i].codec;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(9).value =
            adaptiveStreaming[key][i].width;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(10).value =
            adaptiveStreaming[key][i].height;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(11).value =
            adaptiveStreaming[key][i].bitrate;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(12).value =
            adaptiveStreaming[key][i].gop;
          adaptiveStreamingWorkSheet.getRow(adaptiveStreamingStartIdx).getCell(13).value =
            adaptiveStreaming[key][i].fps;
          adaptiveStreamingStartIdx++;
        }
      }
    }
  }
};
