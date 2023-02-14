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
