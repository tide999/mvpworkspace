
CREATE DATABASE `DB_DATASET` DEFAULT CHARACTER SET utf8;

CREATE TABLE DB_DATASET.`TAB_DEEPDECT_HISTORY` (
  `timeTag` datetime NOT NULL,
  `devId` varchar(20) NOT NULL,
  `oceanDeep` float DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_DATASET.`TAB_DEEPDECT_REALTIME` (
  `timeTag` datetime NOT NULL,
  `devId` varchar(20) NOT NULL,
  `oceanDeep` float DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_DATASET.`TAB_IDATA_ARGUMENTS` (
  `serialNo` int NOT NULL AUTO_INCREMENT,
  `devId` varchar(20) DEFAULT NULL,
  `arguName` varchar(20) NOT NULL,
  `arguData` float NOT NULL,
  PRIMARY KEY (`serialNo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

insert into DB_DATASET.TAB_IDATA_ARGUMENTS values
(1,'MFish-8','PH-offSet',2.542),
(2,'MFish-8','PH-slope',4.6207),
(3,'MFish-8','浊度-offSet',30),
(4,'MFish-8','叶绿素-ScaleFactory',0.0076),
(5,'MFish-8','叶绿素-DarkCounts',44);

CREATE TABLE DB_DATASET.`TAB_INSTRUMENT` (
  `devId` varchar(20) NOT NULL,
  `devName` varchar(50) DEFAULT NULL,
  `proDate` date DEFAULT NULL,
  `useUnit` varchar(100) DEFAULT NULL,
  `parseFile` varchar(200) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`devId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO DB_DATASET.TAB_INSTRUMENT values
 ('MFish-8','8参数拖鱼','2020-5-1','中科院青岛海洋所','d:\MVP4000\dataset\mfish-8.exe','多参数拖鱼，最大投深4000米');

CREATE TABLE DB_DATASET.`TAB_LOCATION_HISTORY` (
  `timeTag` datetime NOT NULL,
  `devId` varchar(20) NOT NULL,
  `iatitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `shipSpeed` float DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_DATASET.`TAB_LOCATION_REALTIME` (
  `timeTag` datetime NOT NULL,
  `devId` varchar(20) NOT NULL,
  `iatitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `shipSpeed` float DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_DATASET.`TAB_ORIGINAL_HISTORY` (
  `timeTag` datetime(3) NOT NULL,
  `devId` varchar(20) NOT NULL,
  `datas` varchar(500) NOT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_DATASET.`TAB_ORIGINAL_REALTIME` (
  `timeTag` datetime(3) NOT NULL,
  `devId` varchar(20) NOT NULL,
  `datas` varchar(500) NOT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create view DB_DATASET.VW_DEEPDECT_REALTIME as
 select timeTag, oceanDeep
 from DB_DATASET.TAB_DEEPDECT_REALTIME
 order by timeTag desc
 limit 50;

create view DB_DATASET.VW_LOCATION_REALTIME as
 select timeTag, iatitude, longitude, shipSpeed
 from DB_DATASET.TAB_LOCATION_REALTIME
 order by timeTag desc
 limit 50;

create view DB_DATASET.VW_IDATA_ARGUMENTS as

 select A.serialNo,
  A.devId,
  B.dptName as devName,
  A.arguName,
  A.arguData

 from DB_DATASET.TAB_IDATA_ARGUMENTS A, DB_SYSTEM.TAB_SYSTEM_DEFINE B

 where A.devId = B.dptId;

DELIMITER $$
#drop procedure if exists DB_DATASET.`sp_dataInit_MFish-8`;
CREATE PROCEDURE DB_DATASET.`sp_dataInit_MFish-8` ()
BEGIN
#创建8参数拖鱼相关的数据表和视图
#步骤说明：
#1 创建MFish-8的实时数据表
#2 创建MFish-8的历史数据表
#3 重新构建实时仪器数据视图（DB_DATASET.VW_DATA_REALTIME）
#4 核实显示数据表中数据量是否符合默认要求（DB_SYSTEM.TAB_SHOW_DEFINE）
#5 检查MFish-8报警信息数据量是否符合默认要求（DB_SYSTEM.TAB_ALARM_DEFINE）
#6 将当前的实时数据全部迁移到历史数据表中
#需要根据MFish-8最新的程序确定各数据是否正确

declare i_dataCount int;  #MFish-8字段数量
declare i_dataIndex int;  #MFish-8相关的数据索引
#建立MFish-8的实时数据表
CREATE TABLE if not exists DB_DATASET.`TAB_MFish-8_REALTIME` (
  `timeTag` datetime(3) NOT NULL,
  `devStatus` tinyInt not NULL default 0,
  `devSpeed` float NULL,
  `devDeep` float NULL,
  `dataTemp` float NULL,
  `dataConv` float NULL,
  `dataP` float NULL,
  `dataSal` float NULL,
  `dataSV` float NULL,
  `dataPH` float NULL,
  `dataZ` float NULL,
  `dataY` float NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#建立MFish-8的历史数据表
CREATE TABLE if not exists DB_DATASET.`TAB_MFish-8_HISTORY` (
  `timeTag` datetime(3) NOT NULL,
  `devStatus` tinyInt not NULL default 0,
  `devSpeed` float NULL,
  `devDeep` float NULL,
  `dataTemp` float NULL,
  `dataConv` float NULL,
  `dataP` float NULL,
  `dataSal` float NULL,
  `dataSV` float NULL,
  `dataPH` float NULL,
  `dataZ` float NULL,
  `dataY` float NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#重构仪器实时数据视图
drop view if exists DB_DATASET.VW_DATA_REALTIME;
CREATE VIEW DB_DATASET.`VW_DATA_REALTIME` AS
 select

  substring(A.`timeTag`,1,19) AS `timeTag`,
  max(`devStatus`) AS `devStatus`,
  avg(`devSpeed`) AS `devSpeed`,
  avg(`devDeep`) AS `devDeep`,
  avg(`dataTemp`) AS `dataTemp`,
  avg(`dataConv`) AS `dataConv`,
  avg(`dataP`) AS `dataP`,
  avg(`dataSal`) AS `dataSal`,
  avg(`dataSV`) AS `dataSV`,
  avg(`dataPH`) AS `dataPH`,
  avg(`dataZ`) AS `dataZ`,
  avg(`dataY`) AS `dataY`,
  `B`.`iatitude` AS `iatitude`,
  `B`.`longitude` AS `longitude`,
  `B`.`shipSpeed` AS `shipSpeed`,
  `C`.`oceanDeep` AS `oceanDeep`

 from
  DB_DATASET.`TAB_MFish-8_REALTIME` `A`,
  DB_DATASET.`VW_LOCATION_REALTIME` `B`,
  DB_DATASET.`VW_DEEPDECT_REALTIME` `C`
 where
  substring(A.`timeTag`,1,19) = `B`.`timeTag` and
  substring(A.`timeTag`,1,19) = `C`.`timeTag`
 group by substring(A.`timeTag`,1,19),`B`.`timeTag`,`C`.`timeTag`;

#检查显示定义表中MFish-8显示数据的量是否满足要求
select count(fieldName) into i_dataCount from DB_SYSTEM.TAB_SHOW_DEFINE
 where dptId = 'MFish-8';
if ( i_dataCount is null ) or ( i_dataCount <> 10 ) then  #MFish-8数据量需要后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_SHOW_DEFINE where dptId = 'MFish-8';
  insert into DB_SYSTEM.TAB_SHOW_DEFINE( dptID, fieldName, dataName, dataUnit, showInChart, topLeft, sameAs) values
   ('MFish-8','devDeep','仪器深度','米',TRUE,TRUE,null),
   ('MFish-8','devSpeed','仪器速度','米/秒',FALSE,null,null),
   ('MFish-8','devTemp','温度','℃',TRUE,FALSE,null),
   ('MFish-8','dataCon','电导率','S/m',TRUE,FALSE,null),
   ('MFish-8','dataP','压力','bar',TRUE,TRUE,null),
   ('MFish-8','dataSal','盐度','psu',TRUE,TRUE,null),
   ('MFish-8','dataSV','声速','m/s',TRUE,TRUE,null),
   ('MFish-8','dataPH','PH值',null,TRUE,TRUE,null),
   ('MFish-8','dataZ','浊度','ug/l',TRUE,TRUE,null),
   ('MFish-8','dataY','叶绿素','ug/l',TRUE,TRUE,null);

  select serialNo into i_dataIndex
   from DB_SYSTEM.SHOW_DEFINE
   where dptId = 'MFish-8' and fieldName = 'devDeep';

  SET SQL_SAFE_UPDATES = 0;
  update DB_SYSTEM.TAB_SHOW_DEFINE set sameAs = i_dataIndex
   where dptId = 'MFish-8' and fieldName = 'dataP';
end if;

#检查报警信息表中是否满足MFish-8的报警信息量
select count(dptId) into i_dataCount from DB_SYSTEM.TAB_ALARM_DEFINE
 where dptId = 'MFish-8';
if ( i_dataCount is null ) or ( i_dataCount <> 3 ) then  #实际报警量根据后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_ALARM_DEFINE where dptId = 'MFish-8';
  insert into DB_SYSTEM.TAB_ALARM_DEFINE values
   ('MFish-8',0,1,'串口故障'),
   ('MFish-8',1,1,'数据传输错误'),
   ('MFish-8',1,2,'数据校验错误');
end if;

#将现有的实时数据全部迁移到历史数据表中
insert into DB_DATASET.`TAB_MFish-8_HISTORY` select * from DB_DATASET.`TAB_MFish-8_REALTIME`;
SET SQL_SAFE_UPDATES = 0;
TRUNCATE `DB_DATASET`.`TAB_MFish-8_REALTIME`;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_DATASET.`sp_dataInit_KX`()
BEGIN
#创建科学号船用海深探测相关的数据表和视图
#步骤说明：
#1 如默认海深探测数据表不能满足KX信息要求，则创建新的海深探测实时数据表
#2 如默认海深探测数据表不能满足KX信息要求，则创建新的海深探测历史数据表
#3 如默认海深探测数据表不能满足KX信息要求，则创建新的海深探测数据视图（DB_DATASET.VW_DEEPDECT_REALTIME）
#4 核实显示数据表中数据量是否符合默认要求（DB_SYSTEM.TAB_SHOW_DEFINE）
#5 检查KX海深探测报警信息数据量是否符合默认要求（DB_SYSTEM.TAB_ALARM_DEFINE）
#需要根据KX海深探测最新的程序确定各数据是否正确

declare i_dataCount int;  #KX字段数量
declare i_dataIndex int;  #KX相关的数据索引
declare s_devId varchar(20);  #在用仪器编号

#目前海深探测数据表满足KX海深探测信息要求，不用新建KX的实时数据表

#目前海深探测历史数据表满足KX海深探测信息要求，不用新建KX的历史数据表

#目前海深探测数据视图满足KX海深探测信息要求，不用新建实时数据视图

#检查显示定义表中KX显示数据的量是否满足要求
select count(fieldName) into i_dataCount from DB_SYSTEM.TAB_SHOW_DEFINE
 where dptId = 'KX';
if ( i_dataCount is null ) or ( i_dataCount <> 1 ) then  #KX数据量需要后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_SHOW_DEFINE where dptId = 'KX';
  insert into DB_SYSTEM.TAB_SHOW_DEFINE( dptID, fieldName, dataName, dataUnit, showInChart, topLeft, sameAs) values
   ('KX','oceanDeep','当前海深','米',true,true,null);
#需要和仪器深度数据在同一个坐标轴上
#查找在用设备编号
  select dptId into s_devId
   from DB_SYSTEM.TAB_SYSTEM_DEFINE
   where dptType = 2 and dptStatus = true;

#查找仪器设备字段名为devDeep的索引，devDeep是默认所有仪器都有的字段名。
  select serialNo into i_dataIndex
   from DB_SYSTEM.VW_ISHOW_DEFINE
   where dptId = s_devId and fieldName = 'devDeep';
  if not i_dataIndex is null then  #查找成功，则更新显示设置。
    SET SQL_SAFE_UPDATES = 0;
    update DB_SYSTEM.TAB_SHOW_DEFINE
     set sameAs = i_dataIndex
     where dptId = 'KX' and fieldName = 'oceanDeep';
  end if;
end if;

#检查报警信息表中是否满足KX的报警信息量
select count(dptId) into i_dataCount from DB_SYSTEM.TAB_ALARM_DEFINE
 where dptId = 'KX';
if ( i_dataCount is null ) or ( i_dataCount <> 2 ) then  #实际报警量根据后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_ALARM_DEFINE where dptId = 'KX';
  insert into DB_SYSTEM.TAB_ALARM_DEFINE values
   ('KX',0,1,'串口故障'),
   ('KX',1,1,'数据错误');
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_DATASET.`sp_dataInit_GPS`()
BEGIN
#创建GPS定位相关的数据表和视图
#步骤说明：
#1 如默认定位数据表不能满足GPS信息要求，则创建新的定位实时数据表
#2 如默认定位数据表不能满足GPS信息要求，则创建新的定位历史数据表
#3 如默认定位数据表不能满足GPS信息要求，则创建新的定位数据视图（DB_DATASET.VW_LOCATION_REALTIME）
#4 核实显示数据表中数据量是否符合默认要求（DB_SYSTEM.TAB_SHOW_DEFINE）
#5 检查GPS定位报警信息数据量是否符合默认要求（DB_SYSTEM.TAB_ALARM_DEFINE）
#需要根据GPS定位最新的程序确定各数据是否正确

declare i_dataCount int;  #GPS字段数量
declare i_dataIndex int;  #GPS相关的数据索引
#目前定位数据表满足GPS定位信息要求，不用新建GPS的实时数据表

#目前定位历史数据表满足GPS定位信息要求，不用新建GPS的历史数据表

#目前定位数据视图满足GPS定位信息要求，不用新建实时数据视图

#检查显示定义表中GPS显示数据的量是否满足要求
select count(fieldName) into i_dataCount from DB_SYSTEM.TAB_SHOW_DEFINE
 where dptId = 'GPS';
if ( i_dataCount is null ) or ( i_dataCount <> 3 ) then  #GPS数据量需要后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_SHOW_DEFINE where dptId = 'GPS';
  insert into DB_SYSTEM.TAB_SHOW_DEFINE( dptID, fieldName, dataName, dataUnit, showInChart, topLeft, sameAs) values
   ('GPS','iatitude','经度',null,false,null,null),
   ('GPS','longitude','维度',null,FALSE,null,null),
   ('GPS','shipSpeed','航速','节',false,null,null);
end if;

#检查报警信息表中是否满足GPS的报警信息量
select count(dptId) into i_dataCount from DB_SYSTEM.TAB_ALARM_DEFINE
 where dptId = 'GPS';
if ( i_dataCount is null ) or ( i_dataCount <> 2 ) then  #实际报警量根据后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_ALARM_DEFINE where dptId = 'GPS';
  insert into DB_SYSTEM.TAB_ALARM_DEFINE values
   ('GPS',0,1,'串口故障'),
   ('GPS',1,1,'数据错误');
end if;
END$$
DELIMITER ;

DELIMITER $$

create procedure DB_DATASET.`sp_crtJobHis_MFish-8`(
  in s_JobId varchar(20)  #任务编号
)
begin
#由于涉及仪器部分的字段定义，因此由仪器来创建任务历史数据表。

set @s_Command = concat("drop table if exists DB_JOB.TAB_JOB_", s_JobId, ";");
PREPARE s_Exec FROM @s_Command;
EXECUTE s_Exec;
deallocate prepare s_Exec;

set @s_Command = concat("create table DB_JOB.TAB_JOB_", s_JobId, "(");
set @s_Command = concat(@s_Command, "timeTag datetime(3),");
set @s_Command = concat(@s_Command, "wId varchar(20),");
set @s_Command = concat(@s_Command, "devId varchar(20),");
set @s_Command = concat(@s_Command, "locId varchar(20),");
set @s_Command = concat(@s_Command, "deepId varchar(20),");
set @s_Command = concat(@s_Command, "runTimes int,");
set @s_Command = concat(@s_Command, "devStatus tinyint,");
#特定仪器相关字段
set @s_Command = concat(@s_Command, "dataName1 varchar(50),");
set @s_Command = concat(@s_Command, "devSpeed float,");
set @s_Command = concat(@s_Command, "dataUnit1 varchar(50),");
set @s_Command = concat(@s_Command, "dataName2 varchar(50),");
set @s_Command = concat(@s_Command, "devDeep float,");
set @s_Command = concat(@s_Command, "dataUnit2 varchar(50),");
set @s_Command = concat(@s_Command, "dataName3 varchar(50),");
set @s_Command = concat(@s_Command, "dataTemp float,");
set @s_Command = concat(@s_Command, "dataUnit3 varchar(50),");
set @s_Command = concat(@s_Command, "dataName4 varchar(50),");
set @s_Command = concat(@s_Command, "dataConv float,");
set @s_Command = concat(@s_Command, "dataUnit4 varchar(50),");
set @s_Command = concat(@s_Command, "dataName5 varchar(50),");
set @s_Command = concat(@s_Command, "dataP float,");
set @s_Command = concat(@s_Command, "dataUnit5 varchar(50),");
set @s_Command = concat(@s_Command, "dataName6 varchar(50),");
set @s_Command = concat(@s_Command, "dataSal float,");
set @s_Command = concat(@s_Command, "dataUnit6 varchar(50),");
set @s_Command = concat(@s_Command, "dataName7 varchar(50),");
set @s_Command = concat(@s_Command, "dataSV float,");
set @s_Command = concat(@s_Command, "dataUnit7 varchar(50),");
set @s_Command = concat(@s_Command, "dataName8 varchar(50),");
set @s_Command = concat(@s_Command, "dataPH float,");
set @s_Command = concat(@s_Command, "dataUnit8 varchar(50),");
set @s_Command = concat(@s_Command, "dataName9 varchar(50),");
set @s_Command = concat(@s_Command, "dataZ float,");
set @s_Command = concat(@s_Command, "dataUnit9 varchar(50),");
set @s_Command = concat(@s_Command, "dataName10 varchar(50),");
set @s_Command = concat(@s_Command, "dataY float,");
set @s_Command = concat(@s_Command, "dataUnit10 varchar(50),");
#特定仪器相关字段定义结束
set @s_Command = concat(@s_Command, "iatitude varchar(50),");
set @s_Command = concat(@s_Command, "longitude varchar(50),");
set @s_Command = concat(@s_Command, "shipSpeed float,");
set @s_Command = concat(@s_Command, "oceanDeep float, PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

PREPARE s_Exec FROM @s_Command;
EXECUTE s_Exec;
deallocate prepare s_Exec;

end$$
DELIMITER ;

DELIMITER $$
create procedure DB_DATASET.`sp_data2Jobs_MFish-8`(
  in s_JobId varchar(20),  #任务编号
  in i_RunTimes int,  #任务执行次数
  in s_StartTime varchar(25),  #当前执行次数的开始时间
  in s_WinchId varchar(20),  #绞车编号
  in s_LocationId varchar(20),  #定位设备编号
  in s_DeepId varchar(20),  #海深探测设备编号
  in s_endTime varchar(25)  #当前投放结束时间
)
begin
#由于涉及仪器部分的字段定义，因此由仪器来完成任务历史数据表的数据迁移。
#首先将仪器数据汇总到任务表中
set @s_Command = concat("insert into DB_JOB.TAB_JOB_", s_JobId, " ");
set @s_Command = concat(@s_Command, "select timeTag,");
set @s_Command = concat(@s_Command, "'", s_WinchId, "',");
set @s_Command = concat(@s_Command, "'MFish-8',");
set @s_Command = concat(@s_Command, "'", s_LocationId, "',");
set @s_Command = concat(@s_Command, "'", s_DeepId, "',");
set @s_Command = concat(@s_Command, i_RunTimes,",");
set @s_Command = concat(@s_Command, "devStatus,");
#特定仪器相关字段
set @s_Command = concat(@s_Command, "'仪器速度',");
set @s_Command = concat(@s_Command, "devSpeed,");
set @s_Command = concat(@s_Command, "'米/秒',");
set @s_Command = concat(@s_Command, "'仪器深度',");
set @s_Command = concat(@s_Command, "devDeep,");
set @s_Command = concat(@s_Command, "'米',");
set @s_Command = concat(@s_Command, "'温度',");
set @s_Command = concat(@s_Command, "dataTemp,");
set @s_Command = concat(@s_Command, "'℃',");
set @s_Command = concat(@s_Command, "'电导率',");
set @s_Command = concat(@s_Command, "dataConv,");
set @s_Command = concat(@s_Command, "'S/m',");
set @s_Command = concat(@s_Command, "'压力',");
set @s_Command = concat(@s_Command, "dataP,");
set @s_Command = concat(@s_Command, "'bar',");
set @s_Command = concat(@s_Command, "'盐度',");
set @s_Command = concat(@s_Command, "dataSal,");
set @s_Command = concat(@s_Command, "'psu',");
set @s_Command = concat(@s_Command, "'声速',");
set @s_Command = concat(@s_Command, "dataSV,");
set @s_Command = concat(@s_Command, "'m/s',");
set @s_Command = concat(@s_Command, "'PH值',");
set @s_Command = concat(@s_Command, "dataPH,");
set @s_Command = concat(@s_Command, "null,");
set @s_Command = concat(@s_Command, "'浊度',");
set @s_Command = concat(@s_Command, "dataZ,");
set @s_Command = concat(@s_Command, "'ug/l',");
set @s_Command = concat(@s_Command, "'叶绿素',");
set @s_Command = concat(@s_Command, "dataY,");
set @s_Command = concat(@s_Command, "'ug/l',");
#特定仪器相关字段定义结束
set @s_Command = concat(@s_Command, "null,null,null,null ");
#特定仪器数据表
set @s_Command = concat(@s_Command, "from DB_DATASET.`TAB_MFish-8_REALTIME` ");
set @s_Command = concat(@s_Command, "where timeTag >= '", s_StartTime, "' and timeTag < '", s_EndTime, "';");

PREPARE s_Exec FROM @s_Command;
EXECUTE s_Exec;
deallocate prepare s_Exec;

#转移仪器自身数据到历史数据表中
insert into DB_DATASET.`TAB_MFish-8_HISTORY` select * from DB_DATASET.`TAB_MFish-8_REALTIME` where timeTag < s_EndTime;

#清理仪器的实时数据表，降低系统运行负荷。
SET SQL_SAFE_UPDATES = 0;
delete from DB_DATASET.`TAB_MFish-8_REALTIME` where timeTag < s_EndTime;

#填入相关定位信息
set @s_Command = concat("update DB_JOB.TAB_JOB_", s_JobId, "  A, DB_DATASET.TAB_LOCATION_REALTIME B ");
set @s_Command = concat(@s_Command,"set A.iatitude = B.iatitude, A.longitude = B.longitude, A.shipSpeed = B.shipSpeed ");
set @s_Command = concat(@s_Command,"where substring(A.timeTag, 1, 19) = B.timeTag");

PREPARE s_Exec FROM @s_Command;
EXECUTE s_Exec;
deallocate prepare s_Exec;

#填入相关海深信息
set @s_Command = concat("update DB_JOB.TAB_JOB_", s_JobId, "  A, DB_DATASET.TAB_DEEPDECT_REALTIME B ");
set @s_Command = concat(@s_Command,"set A.oceanDeep = B.oceanDeep ");
set @s_Command = concat(@s_Command,"where substring(A.timeTag, 1, 19) = B.timeTag");

PREPARE s_Exec FROM @s_Command;
EXECUTE s_Exec;
deallocate prepare s_Exec;

#转移仪器原始数据到历史数据表中
insert into DB_DATASET.`TAB_ORIGINAL_HISTORY` select * from DB_DATASET.`TAB_ORIGINAL_REALTIME` where timeTag < s_EndTime;

#清理仪器原始的实时数据表，降低系统运行负荷。
SET SQL_SAFE_UPDATES = 0;
delete from DB_DATASET.`TAB_ORIGINAL_REALTIME` where timeTag < s_EndTime;

end$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_DATASET.`sp_dataPrepare_MFish-8`(
   in_StartTime varchar(20),
   in_EndTime varchar(20)
  )
BEGIN
#创建8参数拖鱼相关的历史数据视图
#输入参数：历史数据的起始时间和结束时间
#历史数据视图名称：VW_MFish-8_YYYYMMDDHHMMSSYYYYMMDDHHMMSS
#定位数据和海深探测数据不全时需要补全相应的数据
declare s_viewName text;
declare i_ViewCount int;
declare loc_id varchar(20);
declare deep_id varchar(20);

set s_viewName = concat("VW_MFish-8_", date_format(in_StartTime, '%Y%m%d%H%i%s'), date_format(in_EndTime, '%Y%m%d%H%i%s'));
#判断同一时段的视图是否已经存在
SELECT count(TABLE_NAME) into i_ViewCount
FROM
  information_schema.`TABLES`
where
  TABLE_SCHEMA = 'DB_DATASET' and TABLE_NAME = s_viewName;

if i_ViewCount = 0 then  #不存在该视图则创建之
  #当前正在使用的定位仪器编号
  select dptId into loc_id from DB_SYSTEM.TAB_SYSTEM_DEFINE where dptType = 3 and dptStatus = 1;
  #根据仪器数据的量补全定位数据
  insert into DB_DATASET.TAB_LOCATION_HISTORY( timeTag, devId )
   select substring(timeTag, 1, 19), loc_id from DB_DATASET.`TAB_MFish-8_HISTORY`
   where substring(timeTag, 1, 19) not in (
    select timeTag from DB_DATASET.TAB_LOCATION_HISTORY
    where timeTag <= in_EndTime and timeTag >= in_StartTime)
   and timeTag <= in_EndTime and timeTag >= in_StartTime
   group by substring(timeTag, 1, 19);

  #当前正在使用的海深探测仪器编号
  select dptId into deep_id from DB_SYSTEM.TAB_SYSTEM_DEFINE where dptType = 4 and dptStatus = 1;
  #根据仪器数据的量补全海深探测数据
  insert into DB_DATASET.TAB_DEEPDECT_HISTORY( timeTag, devId )
   select substring(timeTag, 1, 19), deep_id from DB_DATASET.`TAB_MFish-8_HISTORY`
   where substring(timeTag, 1, 19) not in (
    select timeTag from DB_DATASET.TAB_DEEPDECT_HISTORY
    where timeTag <= in_EndTime and timeTag >= in_StartTime)
   and timeTag <= in_EndTime and timeTag >= in_StartTime
   group by substring(timeTag, 1, 19);

  set s_viewName = concat("DB_DATASET.`", s_viewName, "`");
  set @s_Command = concat("CREATE VIEW ", s_viewName, " as ");
  set @s_Command = concat(@s_Command, " select");
  set @s_Command = concat(@s_Command, " A.timeTag,");
  set @s_Command = concat(@s_Command, " A.devStatus,");
  set @s_Command = concat(@s_Command, " A.devDeep,");
  set @s_Command = concat(@s_Command, " A.devSpeed,");
  set @s_Command = concat(@s_Command, " A.dataTemp,");
  set @s_Command = concat(@s_Command, " A.dataConv,");
  set @s_Command = concat(@s_Command, " A.dataP,");
  set @s_Command = concat(@s_Command, " A.dataSal,");
  set @s_Command = concat(@s_Command, " A.dataSV,");
  set @s_Command = concat(@s_Command, " A.dataPH,");
  set @s_Command = concat(@s_Command, " A.dataZ,");
  set @s_Command = concat(@s_Command, " A.dataY,");
  set @s_Command = concat(@s_Command, " B.iatitude,");
  set @s_Command = concat(@s_Command, " B.longitude,");
  set @s_Command = concat(@s_Command, " B.shipSpeed,");
  set @s_Command = concat(@s_Command, " C.oceanDeep");
  set @s_Command = concat(@s_Command, " from DB_DATASET.`TAB_MFish-8_HISTORY` A, DB_DATASET.TAB_LOCATION_HISTORY B, DB_DATASET.TAB_DEEPDECT_HISTORY C");
  set @s_Command = concat(@s_Command, " where substring( A.timeTag, 1, 19 ) = B.timeTag and substring( A.timeTag, 1, 19 ) = C.timeTag");
  set @s_Command = concat(@s_Command, ' and A.timeTag >="', in_StartTime, '"', ' and A.timeTag <="', in_EndTime, '"');

  #执行历史数据视图的创建
  PREPARE execCommand FROM @s_Command;
  EXECUTE execCommand;
  deallocate prepare s_Exec;
end if;

END$$
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DB_DATASET.sp_moveDeepDectHistoryData(

 in s_Time varchar(20)

)

BEGIN

  #执行数据移动前需要删除海深探测历史数据表中的某些数据
  #原因在于任务在做数据规整操作时为避免数据缺失有可能会额外写入海深探测历史数据。
  SET SQL_SAFE_UPDATES = 0;

  delete from DB_DATASET.TAB_DEEPDECT_HISTORY

   where timeTag in (select timeTag from DB_DATASET.TAB_DEEPDECT_REALTIME);



  insert into DB_DATASET.TAB_DEEPDECT_HISTORY


   select * from DB_DATASET.TAB_DEEPDECT_REALTIME


   where timeTag < s_Time;



  SET SQL_SAFE_UPDATES = 0;

  delete from DB_DATASET.TAB_DEEPDECT_REALTIME where timeTag < s_Time;


END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE DB_DATASET.sp_moveLocationHistoryData(

 in s_Time varchar(20)

)

BEGIN

  #执行移动前需要删除定位历史数据表中的某些数据
  #原因在于任务在做数据规整操作时为避免数据缺失有可能会额外写入定位历史数据。
  SET SQL_SAFE_UPDATES = 0;

  delete from DB_DATASET.TAB_LOCATION_HISTORY

   where timeTag in (select timeTag from DB_DATASET.TAB_LOCATION_REALTIME);



  insert into DB_DATASET.TAB_LOCATION_HISTORY


   select * from DB_DATASET.TAB_LOCATION_REALTIME


   where timeTag < s_Time;



  SET SQL_SAFE_UPDATES = 0;

  delete from DB_DATASET.TAB_LOCATION_REALTIME where timeTag < s_Time;


END$$

DELIMITER ;


call DB_DATASET.`sp_dataInit_MFish-8`();
call DB_DATASET.sp_dataInit_GPS();
call DB_DATASET.sp_dataInit_KX();