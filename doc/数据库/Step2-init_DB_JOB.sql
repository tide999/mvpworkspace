
CREATE DATABASE `DB_JOB` CHARACTER SET utf8;
CREATE TABLE DB_JOB.`TAB_JOB` (
  `jobId` varchar(20) NOT NULL,
  `jobName` varchar(255) NULL,
  `jobMode` int default 0x5 not NULL,
  `setDeep` int not NULL,
  `dropTimes` int default 1 not NULL,
  `intervalTime` int default 0 not NULL,
  `safeDeep` int default 0 not NULL,
  `jobStatus` int default 0x3 not NULL,
  `opMode` int default 0 not null,
  `opSpeed` float default 0 not null,
  `issuedTime` datetime NULL,
  `startTime` datetime NULL,
  `endTime` datetime NULL,
  PRIMARY KEY (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_JOB.`TAB_JOB_REALTIME` (
  `jobId` varchar(20) NOT NULL,
  `runTimes` int not NULL,
  `startTime` datetime NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE VIEW `DB_JOB`.`VW_JOB_REALTIME` AS
 select
  `A`.`jobId` AS `jobId`,
  `B`.`jobName` AS `jobName`,
  `B`.`jobMode` AS `jobMode`,
  `B`.`setDeep` AS `setDeep`,
  `B`.`dropTimes` AS `dropTimes`,
  `B`.`intervalTime` AS `intervalTime`,
  `B`.`safeDeep` AS `safeDeep`,
  `B`.`jobStatus` AS `jobStatus`,
  `B`.`opMode` AS `opMode`,
  `B`.`opSpeed` AS `opSpeed`,
  `B`.`issuedTime` AS `issuedTime`,
  `A`.`runTimes` AS `runTimes`,
  `A`.`startTime` AS `startTime`
 from
 `DB_JOB`.`TAB_JOB_REALTIME` `A`,
 `DB_JOB`.`TAB_JOB` `B`
 where
  `A`.`jobId` = `B`.`jobId` and
  `A`.`runTimes` in (
   select `runTimes`
   from `DB_JOB`.`TAB_JOB_REALTIME`
   group by `DB_JOB`.`TAB_JOB_REALTIME`.`jobId`,runTimes
 );


DELIMITER $$
CREATE PROCEDURE DB_JOB.`sp_addJob`(
    in jobName varchar(255),
    in jobMode int,
    in jobDeep int,
    in dropTimes int,
    in intervalTime int,
    in safeDeep int,
    in operateMode int,
    in operateSpeed float
    )
addJob:BEGIN
#增加新任务
#输入参数为新任务的内容
#步骤：
#1 增加记录到TAB_JOB中
#2 向实时任务数据表中增加一条执行次数为0的记录

declare s_JobId varchar(20);  #任务编号，格式为：YYYYMMDDHHMMSSFFF
declare s_DevId varchar(20);  #仪器设备编号
declare s_WinchId varchar(20);  #绞车编号
declare s_LocationId varchar(20);  #定位设备编号
declare s_DeepDectId varchar(20);  #海深探测设备编号

#获取绞车编号，状态为在用。
select dptId into s_WinchId from DB_SYSTEM.TAB_SYSTEM_DEFINE
 where dptStatus = 1 and dptType = 1;

if s_WinchId is null then
  leave addJob;  #找不到在用绞车，只能直接退出。
end if;

#获取仪器设备编号，状态为在用。
select dptId into s_DevId from DB_SYSTEM.TAB_SYSTEM_DEFINE
 where dptStatus = 1 and dptType = 2;

if s_DevId is null then
  leave addJob;  #找不到在用仪器，只能直接退出。
end if;

#获取定位设备编号，状态为在用.
select dptId into s_LocationId from DB_SYSTEM.TAB_SYSTEM_DEFINE
 where dptStatus = 1 and dptType = 3;

if s_LocationId is null then
  leave addJob;  #找不到在用定位设备，只能直接退出。
end if;

#获取海深探测设备，状态为在用。
select dptId into s_DeepDectId from DB_SYSTEM.TAB_SYSTEM_DEFINE
 where dptStatus = 1 and dptType = 4;

if s_DeepDectId is null then
  leave addJob;  #找不到在用仪器，只能直接退出。
end if;

set s_JobId = substring(date_format(now(3), "%Y%m%d%H%i%S%f"), 1, 17);  #产生任务编号
#增加新任务数据
insert into TAB_JOB values(
  s_Jobid,
  jobName,
  jobMode,
  jobDeep,
  dropTimes,
  intervalTime,
  safeDeep,
  3,
  operateMode,
  operateSpeed,
  now(),
  null,
  null
);

#增加runTimes=0的记录到实时任务数据表
insert into DB_JOB.TAB_JOB_REALTIME values( s_JobId, 0, now());

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_JOB.`sp_setJobRunTimes`(
    in in_JobId varchar(20),
    in in_RunTimes int,
    in in_StartTime varchar(20)
    )
BEGIN
#更新任务当前执行次数
#输入参数为：任务编号；任务当前执行次数；任务开始时间。

insert into DB_JOB.TAB_JOB_REALTIME values( in_JobId, in_RunTimes, in_StartTime );

end$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_JOB.`sp_updateJobStatus`(
    in in_JobId varchar(20),
    in in_JobStatus int
    )
BEGIN
#更新任务状态
#输入参数为：任务编号；任务当前状态

SET SQL_SAFE_UPDATES = 0;
update DB_JOB.TAB_JOB
 set jobStatus = in_JobStatus
 where jobId = in_JobId;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DB_JOB.`sp_jobInit`()
BEGIN
  SET SQL_SAFE_UPDATES = 0;
#将所有处于“正在执行”或“投放间隔等待”状态的任务更新为“取消”，同时设定结束时间为当前时间。
  update DB_JOB.TAB_JOB set endTime = now() where jobStatus = 48 or jobStatus = 51;
  update DB_JOB.TAB_JOB set jobStatus = 12288 where jobStatus = 48 or jobStatus = 51;

END$$
DELIMITER ;
