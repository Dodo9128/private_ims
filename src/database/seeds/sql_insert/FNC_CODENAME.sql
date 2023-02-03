CREATE FUNCTION `FNC_CODENAME`(req_code VARCHAR(20))
	RETURNS varchar(100) CHARSET utf8
begin	
   DECLARE getname varchar(100);
   DECLARE find_groupCode varchar(20);
   
   SET getname = null;
   SET find_groupCode = left(req_code, 4);
         
   SELECT name
   INTO getname
   FROM ims.code_common
   WHERE group_code = find_groupCode
   AND code = req_code;
   RETURN getname;
end





###########################################################


DELIMITER $$
CREATE DEFINER=`ims`@`localhost` FUNCTION `FNC_CODENAME`(req_code VARCHAR(20)) RETURNS varchar(100) CHARSET utf8mb3
begin	
   DECLARE getname varchar(100);
   DECLARE find_groupCode varchar(20);
   
   SET getname = null;
   SET find_groupCode = left(req_code, 4);
         
   SELECT name
   INTO getname
   FROM ims.code_common
   WHERE group_code = find_groupCode
   AND code = req_code;
   RETURN getname;
  
end$$
DELIMITER ;