
CREATE DATABASE `DB_WINCH` DEFAULT CHARACTER SET utf8;

CREATE TABLE `DB_WINCH`.`TAB_WINCH` (
  `wId` varchar(20) NOT NULL,
  `wName` VARCHAR(50) NOT NULL,
  `wModel` VARCHAR(50) NULL,
  `maxSpeed` float default 0 NOT NULL,
  `serialNo` VARCHAR(50) NULL,
  `proDate` DATE NULL,
  `useUnit` VARCHAR(100) NULL,
  `remarks` VARCHAR(200) NULL,
  primary key(`wId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into DB_WINCH.TAB_WINCH values ('MVP4000','自产4000米MVP绞车','WHH35E-4000', 78, 'W20160501','2016-3-16','中科院青岛海洋所',null);

CREATE TABLE `DB_WINCH`.`TAB_WDATA_DEFINE` (
  `serialNo` INT auto_increment NOT NULL,
  `wId` VARCHAR(20) NOT NULL,
  `dataType` INT NOT NULL,
  `fieldName` VARCHAR(20) NULL,
  primary key(`serialNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into DB_WINCH.TAB_WDATA_DEFINE values
(1,'MVP4000',0,'devDeep'),
(2,'MVP4000',0,'cableOut'),
(3,'MVP4000',0,'relateCableOut'),
(4,'MVP4000',0,'cableSpeed'),
(5,'MVP4000',0,'pickUpP'),
(6,'MVP4000',0,'pullOutP'),
(7,'MVP4000',0,'oilTemp'),
(8,'MVP4000',0,'cableTension'),
(9,'MVP4000',0,'localWHandle'),
(10,'MVP4000',0,'remoteWHandle'),
(11,'MVP4000',0,'DA1'),
(12,'MVP4000',0,'DA2'),
(13,'MVP4000',0,'DA3'),
(14,'MVP4000',0,'DA4'),
(15,'MVP4000',0,'insideTrigger'),
(16,'MVP4000',0,'outsideTrigger'),
(17,'MVP4000',1,'wStatus'),
(18,'MVP4000',2,'DI1'),
(19,'MVP4000',2,'DI2'),
(20,'MVP4000',3,'DO1');

CREATE TABLE `DB_WINCH`.`TAB_WDIGIT_DEFINE` (
  `serialNo` INT auto_increment NOT NULL,
  `wId` VARCHAR(20) NOT NULL,
  `dataIndex` INT NOT NULL,
  `dataValue` BIGINT NOT NULL,
  `dataDescription` VARCHAR(50) NULL,
  primary key(`serialNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into DB_WINCH.TAB_WDIGIT_DEFINE(wId, dataIndex, dataValue, dataDescription) values
('MVP4000',17,1,'报警状态'),
('MVP4000',17,2,'绞车进入收缆状态'),
('MVP4000',17,4,'绞车进入放缆状态'),
('MVP4000',17,8,'绞车进入自由投放状态'),
('MVP4000',17,16,'绞车进入制动状态'),
('MVP4000',17,32,'自动投放就位状态'),
('MVP4000',17,64,'自动工作状态'),
('MVP4000',17,128,'处于上位机控制状态'),
('MVP4000',17,256,'张力过高下进入缆绳保护状态'),
('MVP4000',18,32,'应急手动'),
('MVP4000',18,64,'本控绞车手柄前向'),
('MVP4000',18,128,'本控绞车手柄后向'),
('MVP4000',18,256,'本控绞车手柄中位'),
('MVP4000',18,512,'左排缆按钮输入'),
('MVP4000',18,1024,'右排缆按钮输入'),
('MVP4000',18,2048,'本/线(遥)控按钮输入'),
('MVP4000',18,4096,'静音按钮输入'),
('MVP4000',18,8192,'本控紧停输入'),
('MVP4000',18,16384,'手/自动切换'),
('MVP4000',18,32768,'自由轮按钮'),
('MVP4000',18,65536,'左极限保护（常开）'),
('MVP4000',18,131072,'右极限保护（常开）'),
('MVP4000',18,262144,'左极限保护（常导通）'),
('MVP4000',18,524288,'右极限保护（常导通）'),
('MVP4000',18,1048576,'液位低输入'),
('MVP4000',18,2097152,'断路器跳闸'),
('MVP4000',18,4194304,'星三角总（KM1）工作'),
('MVP4000',18,8388608,'三角（KM2）工作'),
('MVP4000',18,16777216,'星形（KM3）工作'),
('MVP4000',18,33554432,'热过载继电器断路'),
('MVP4000',18,67108864,'电机启动按钮输入'),
('MVP4000',18,134217728,'电机停止按钮输入'),
('MVP4000',18,268435456,'电机温度报警传感器输入'),
('MVP4000',18,536870912,'线（遥）控急停'),
('MVP4000',18,1073741824,'遥控绞车手柄正向'),
('MVP4000',19,1,'遥控绞车手柄中位（非直接输入）'),
('MVP4000',19,2,'遥控绞车手柄负向'),
('MVP4000',19,4,'线控吊臂手柄中位（非直接输入）'),
('MVP4000',19,8,'遥控门架伸'),
('MVP4000',19,16,'遥控门架收'),
('MVP4000',19,32,'遥控门架右旋'),
('MVP4000',19,64,'遥控门架左旋'),
('MVP4000',19,128,'遥控左排缆'),
('MVP4000',19,256,'遥控右排缆'),
('MVP4000',19,512,'相序保护'),
('MVP4000',19,1024,'加热器工作'),
('MVP4000',19,2048,'加热器过载输入'),
('MVP4000',19,4096,'协同输入'),
('MVP4000',19,8192,'本控吊臂手柄中位（非直接输入）'),
('MVP4000',19,16384,'伸缩臂手柄左向'),
('MVP4000',19,32768,'伸缩臂手柄右向'),
('MVP4000',19,65536,'伸缩臂手柄前向'),
('MVP4000',19,131072,'伸缩臂手柄后向'),
('MVP4000',19,262144,'驻车压力(未用)'),
('MVP4000',19,524288,'压紧轮压力(未用)'),
('MVP4000',19,1048576,'旋转左极限（常导通）'),
('MVP4000',19,2097152,'旋转左极限（常开）'),
('MVP4000',19,4194304,'旋转右极限（常导通）'),
('MVP4000',19,8388608,'旋转右极限（常开）'),
('MVP4000',19,16777216,'远控急停'),
('MVP4000',19,33554432,'绝缘检测仪报警(常导通)'),
('MVP4000',20,1,'蜂鸣器输出'),
('MVP4000',20,2,'卸荷阀'),
('MVP4000',20,4,'盘式制动阀'),
('MVP4000',20,8,'行车制动阀开始制动'),
('MVP4000',20,16,'高低压阀'),
('MVP4000',20,32,'自由轮阀'),
('MVP4000',20,64,'驻车制动阀打开'),
('MVP4000',20,128,'排缆允许阀'),
('MVP4000',20,256,'旋转允许阀'),
('MVP4000',20,512,'伸缩允许阀'),
('MVP4000',20,1024,'自动运行阀'),
('MVP4000',20,2048,'绞车放大器使能输出'),
('MVP4000',20,4096,'电机停输出'),
('MVP4000',20,8192,'启动灯输出'),
('MVP4000',20,16384,'电机停止'),
('MVP4000',20,32768,'报警灯'),
('MVP4000',20,65536,'静音灯'),
('MVP4000',20,131072,'线（遥）控灯'),
('MVP4000',20,262144,'左排缆灯'),
('MVP4000',20,524288,'右排缆灯'),
('MVP4000',20,1048576,'自动运行警示灯'),
('MVP4000',20,2097152,'自由轮灯'),
('MVP4000',20,4194304,'加热器'),
('MVP4000',20,8388608,'仪器电源保护');

#drop procedure if exists DB_WINCH.sp_winchInit_MVP4000;
DELIMITER $$
CREATE PROCEDURE DB_WINCH.`sp_winchInit_MVP4000` ()
BEGIN
#创建型号为MVP4000绞车相关的数据表和视图
#步骤说明：
#1 创建MVP4000的实时数据表
#2 创建MVP4000的历史数据表
#3 重新构建实时绞车数据视图（DB_WINCH.VW_WINCH_REALTIME）
#4 核实显示数据表中数据量是否符合默认要求（DB_SYSTEM.TAB_SHOW_DEFINE）
#5 检查MVP4000绞车数据定义是否符合默认要求（DB_WINCH.TAB_WDATA_DEFINE）
#6 检查MVP4000绞车数字量定义是否符合默认要求（DB_WINCH.TAB_WDIGIT_DEFINE）
#7 检查MVP4000报警信息数据量是否符合默认要求（DB_SYSTEM.TAB_ALARM_DEFINE）
#需要根据MVP4000最新的程序确定各数据是否正确

declare i_dataCount int;  #MVP4000显示字段数量
declare i_dataIndex int;  #MVP4000显示相关的数据索引
#建立MVP4000的实时数据表
CREATE TABLE if not exists DB_WINCH.`TAB_MVP4000_REALTIME` (
  `timeTag` datetime(3) NOT NULL,
  `devDeep` float DEFAULT NULL,
  `cableOut` float DEFAULT NULL,
  `relateCableOut` float DEFAULT NULL,
  `cableSpeed` float DEFAULT NULL,
  `pickUpP` int DEFAULT NULL,
  `pullOutP` int DEFAULT NULL,
  `oilTemp` int DEFAULT NULL,
  `cableTension` int DEFAULT NULL,
  `localWHandle` int DEFAULT NULL,
  `remoteWHandle` int DEFAULT NULL,
  `DA1` int DEFAULT NULL,
  `DA2` int DEFAULT NULL,
  `DA3` int DEFAULT NULL,
  `DA4` int DEFAULT NULL,
  `insideTrigger` int DEFAULT NULL,
  `outsideTrigger` int DEFAULT NULL,
  `wStatus` int DEFAULT NULL,
  `DI1` int DEFAULT NULL,
  `DI2` int DEFAULT NULL,
  `DO1` int DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#建立MVP4000的历史数据表
CREATE TABLE if not exists DB_WINCH.`TAB_MVP4000_HISTORY` (
  `timeTag` datetime(3) NOT NULL,
  `devDeep` float DEFAULT NULL,
  `cableOut` float DEFAULT NULL,
  `relateCableOut` float DEFAULT NULL,
  `cableSpeed` float DEFAULT NULL,
  `pickUpP` int DEFAULT NULL,
  `pullOutP` int DEFAULT NULL,
  `oilTemp` int DEFAULT NULL,
  `cableTension` int DEFAULT NULL,
  `localWHandle` int DEFAULT NULL,
  `remoteWHandle` int DEFAULT NULL,
  `DA1` int DEFAULT NULL,
  `DA2` int DEFAULT NULL,
  `DA3` int DEFAULT NULL,
  `DA4` int DEFAULT NULL,
  `insideTrigger` int DEFAULT NULL,
  `outsideTrigger` int DEFAULT NULL,
  `wStatus` int DEFAULT NULL,
  `DI1` int DEFAULT NULL,
  `DI2` int DEFAULT NULL,
  `DO1` int DEFAULT NULL,
  PRIMARY KEY (`timeTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#重构绞车实时数据视图
drop view if exists DB_WINCH.VW_WINCH_REALTIME;
CREATE view DB_WINCH.VW_WINCH_REALTIME AS 
 select
  substring(timeTag, 1, 19) as timeTag,
  avg(devDeep) as devDeep,
  avg(cableOut) as cableOut,
  avg(relateCableOut) as relateCableOut,
  avg(cableSpeed) as cableSpeed,
  avg(pickUpP) as pickUpP,
  avg(pullOutP) as pullOutP,
  avg(oilTemp) as oilTemp,
  avg(cableTension) as cableTension,
  avg(localWHandle) as localWHandle,
  avg(remoteWHandle) as remoteWHandle,
  avg(DA1) as DA1,
  avg(DA2) as DA2,
  avg(DA3) as DA3,
  avg(DA4) as DA4,
  max(insideTrigger) as insideTrigger,
  max(outsideTrigger) as outsideTrigger,
  max(wStatus) as wStatus,
  max(DI1) as DI1,
  max(DI2) as DI2,
  max(DO1) as DO1
 from DB_WINCH.TAB_MVP4000_REALTIME
 group by substring(timeTag, 1, 19);

#检查显示定义表中MVP4000显示数据的量是否满足要求
select count(fieldName) into i_dataCount from DB_SYSTEM.TAB_SHOW_DEFINE
 where dptId = 'MVP4000';
if ( i_dataCount is null ) or ( i_dataCount <> 16 ) then  #MVP4000数据量需要后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_SHOW_DEFINE where dptId = 'MVP4000';
  insert into DB_SYSTEM.TAB_SHOW_DEFINE( dptID, fieldName, dataName, dataUnit, showInChart, topLeft, sameAs) values
    ('MVP4000','devDeep','设备深度','米',1,1,null),
    ('MVP4000','cableOut','放缆长度','米',0,null,null),
    ('MVP4000','relateCableOut','相对放缆长度','米',1,1,15),
    ('MVP4000','cableSpeed','缆速','米/秒',0,null,null),
    ('MVP4000','pickUpP','收缆压力显示值','bar',0,null,null),
    ('MVP4000','pullOutP','放缆压力显示值','bar',0,null,null),
    ('MVP4000','oilTemp','油箱温度','℃',0,null,null),
    ('MVP4000','cableTension','张力显示值','Kg',0,null,null),
    ('MVP4000','localWHandle','本控绞车手柄输入',null,0,null,null),
    ('MVP4000','remoteWHandle','线控绞车手柄输入',null,0,null,null),
    ('MVP4000','DA1','卷筒控制输出值',null,0,null,null),
    ('MVP4000','DA2','排缆控制输出值',null,0,null,null),
    ('MVP4000','DA3','吊臂旋转控制输出值',null,0,null,null),
    ('MVP4000','DA4','吊臂伸缩控制输出值',null,0,null,null),
    ('MVP4000','insideTrigger','内轮感应开关计数',null,0,null,null),
    ('MVP4000','outsideTrigger','外轮感应开关计数',null,0,null,null);

  select serialNo into i_dataIndex
   from DB_SYSTEM.SHOW_DEFINE
   where dptId = 'MVP4000' and fieldName = 'devDeep';

  SET SQL_SAFE_UPDATES = 0;
  update DB_SYSTEM.TAB_SHOW_DEFINE set sameAs = i_dataIndex
   where dptId = 'MVP4000' and fieldName = 'cableOut';
end if;

#检查MVP4000数据的定义是否满足要求
select count(wId) into i_dataCount from DB_WINCH.TAB_WDATA_DEFINE
 where wId = 'MVP4000';
if ( i_dataCount is null ) or ( i_dataCount <> 20 ) then  #MVP4000数据量需要后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_WINCH.TAB_WDATA_DEFINE where wId = 'MVP4000';
  insert into DB_WINCH.TAB_WDATA_DEFINE( wId, dataType, fieldName ) values
    ('MVP4000',0,'devDeep'),
    ('MVP4000',0,'cableOut'),
    ('MVP4000',0,'relateCableOut'),
    ('MVP4000',0,'cableSpeed'),
    ('MVP4000',0,'pickUpP'),
    ('MVP4000',0,'pullOutP'),
    ('MVP4000',0,'oilTemp'),
    ('MVP4000',0,'cableTension'),
    ('MVP4000',0,'localWHandle'),
    ('MVP4000',0,'remoteWHandle'),
    ('MVP4000',0,'DA1'),
    ('MVP4000',0,'DA2'),
    ('MVP4000',0,'DA3'),
    ('MVP4000',0,'DA4'),
    ('MVP4000',0,'insideTrigger'),
    ('MVP4000',0,'outsideTrigger'),
    ('MVP4000',1,'wStatus'),
    ('MVP4000',2,'DI1'),
    ('MVP4000',2,'DI2'),
    ('MVP4000',3,'DO1');
end if;

#检查数字量定义表中MVP4000数据的量是否满足要求
select count(wId) into i_dataCount from DB_WINCH.TAB_WDIGIT_DEFINE
 where wId = 'MVP4000';
if ( i_dataCount is null ) or ( i_dataCount <> 85 ) then  #MVP4000最新的数据定义需要根据后期重新调整
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_WINCH.TAB_WDIGIT_DEFINE where wId = 'MVP4000';
  #调整数据定义
  #wStatus的序列号
  select serialNo into i_dataIndex from DB_WINCH.TAB_WDATA_DEFINE
   where wId = 'MVP4000' and dataType = 1 and fieldName = 'wStatus';
  #更新状态定义
  insert into DB_WINCH.TAB_WDIGIT_DEFINE( wId, dataIndex, dataValue, dataDescription) values
    ('MVP4000',i_dataIndex,1,'报警状态'),
    ('MVP4000',i_dataIndex,2,'绞车进入收缆状态'),
    ('MVP4000',i_dataIndex,4,'绞车进入放缆状态'),
    ('MVP4000',i_dataIndex,8,'绞车进入自由投放状态'),
    ('MVP4000',i_dataIndex,16,'绞车进入制动状态'),
    ('MVP4000',i_dataIndex,32,'自动投放就位状态'),
    ('MVP4000',i_dataIndex,64,'自动工作状态'),
    ('MVP4000',i_dataIndex,128,'处于上位机控制状态'),
    ('MVP4000',i_dataIndex,256,'张力过高下进入缆绳保护状态');
  #DI1的序列号
  select serialNo into i_dataIndex from DB_WINCH.TAB_WDATA_DEFINE
   where wId = 'MVP4000' and dataType = 2 and fieldName = 'DI1';
  insert into DB_WINCH.TAB_WDIGIT_DEFINE( wId, dataIndex, dataValue, dataDescription) values
    ('MVP4000',i_dataIndex,32,'应急手动'),
    ('MVP4000',i_dataIndex,64,'本控绞车手柄前向'),
    ('MVP4000',i_dataIndex,128,'本控绞车手柄后向'),
    ('MVP4000',i_dataIndex,256,'本控绞车手柄中位'),
    ('MVP4000',i_dataIndex,512,'左排缆按钮输入'),
    ('MVP4000',i_dataIndex,1024,'右排缆按钮输入'),
    ('MVP4000',i_dataIndex,2048,'本/线(遥)控按钮输入'),
    ('MVP4000',i_dataIndex,4096,'静音按钮输入'),
    ('MVP4000',i_dataIndex,8192,'本控紧停输入'),
    ('MVP4000',i_dataIndex,16384,'手/自动切换'),
    ('MVP4000',i_dataIndex,32768,'自由轮按钮'),
    ('MVP4000',i_dataIndex,65536,'左极限保护（常开）'),
    ('MVP4000',i_dataIndex,131072,'右极限保护（常开）'),
    ('MVP4000',i_dataIndex,262144,'左极限保护（常导通）'),
    ('MVP4000',i_dataIndex,524288,'右极限保护（常导通）'),
    ('MVP4000',i_dataIndex,1048576,'液位低输入'),
    ('MVP4000',i_dataIndex,2097152,'断路器跳闸'),
    ('MVP4000',i_dataIndex,4194304,'星三角总（KM1）工作'),
    ('MVP4000',i_dataIndex,8388608,'三角（KM2）工作'),
    ('MVP4000',i_dataIndex,16777216,'星形（KM3）工作'),
    ('MVP4000',i_dataIndex,33554432,'热过载继电器断路'),
    ('MVP4000',i_dataIndex,67108864,'电机启动按钮输入'),
    ('MVP4000',i_dataIndex,1342728,'电机停止按钮输入'),
    ('MVP4000',i_dataIndex,268435456,'电机温度报警传感器输入'),
    ('MVP4000',i_dataIndex,536870912,'线（遥）控急停'),
    ('MVP4000',i_dataIndex,1073741824,'遥控绞车手柄正向');
  #DI2的序列号
  select serialNo into i_dataIndex from DB_WINCH.TAB_WDATA_DEFINE
   where wId = 'MVP4000' and dataType = 2 and fieldName = 'DI2';
  insert into DB_WINCH.TAB_WDIGIT_DEFINE( wId, dataIndex, dataValue, dataDescription) values
    ('MVP4000',i_dataIndex,1,'遥控绞车手柄中位（非直接输入）'),
    ('MVP4000',i_dataIndex,2,'遥控绞车手柄负向'),
    ('MVP4000',i_dataIndex,4,'线控吊臂手柄中位（非直接输入）'),
    ('MVP4000',i_dataIndex,8,'遥控门架伸'),
    ('MVP4000',i_dataIndex,16,'遥控门架收'),
    ('MVP4000',i_dataIndex,32,'遥控门架右旋'),
    ('MVP4000',i_dataIndex,64,'遥控门架左旋'),
    ('MVP4000',i_dataIndex,128,'遥控左排缆'),
    ('MVP4000',i_dataIndex,256,'遥控右排缆'),
    ('MVP4000',i_dataIndex,512,'相序保护'),
    ('MVP4000',i_dataIndex,1024,'加热器工作'),
    ('MVP4000',i_dataIndex,2048,'加热器过载输入'),
    ('MVP4000',i_dataIndex,4096,'协同输入'),
    ('MVP4000',i_dataIndex,8192,'本控吊臂手柄中位（非直接输入）'),
    ('MVP4000',i_dataIndex,16384,'伸缩臂手柄左向'),
    ('MVP4000',i_dataIndex,32768,'伸缩臂手柄右向'),
    ('MVP4000',i_dataIndex,65536,'伸缩臂手柄前向'),
    ('MVP4000',i_dataIndex,131072,'伸缩臂手柄后向'),
    ('MVP4000',i_dataIndex,262144,'驻车压力(未用)'),
    ('MVP4000',i_dataIndex,524288,'压紧轮压力(未用)'),
    ('MVP4000',i_dataIndex,1048576,'旋转左极限（常导通）'),
    ('MVP4000',i_dataIndex,2097152,'旋转左极限（常开）'),
    ('MVP4000',i_dataIndex,4194304,'旋转右极限（常导通）'),
    ('MVP4000',i_dataIndex,8388608,'旋转右极限（常开）'),
    ('MVP4000',i_dataIndex,16777216,'远控急停'),
    ('MVP4000',i_dataIndex,33554432,'绝缘检测仪报警(常导通)');
  #DO1的序列号
  select serialNo into i_dataIndex from DB_WINCH.TAB_WDATA_DEFINE
   where wId = 'MVP4000' and dataType = 3 and fieldName = 'DO1';
  insert into DB_WINCH.TAB_WDIGIT_DEFINE( wId, dataIndex, dataValue, dataDescription) values
    ('MVP4000',i_dataIndex,1,'蜂鸣器输出'),
    ('MVP4000',i_dataIndex,2,'卸荷阀'),
    ('MVP4000',i_dataIndex,4,'盘式制动阀'),
    ('MVP4000',i_dataIndex,8,'行车制动阀开始制动'),
    ('MVP4000',i_dataIndex,16,'高低压阀'),
    ('MVP4000',i_dataIndex,32,'自由轮阀'),
    ('MVP4000',i_dataIndex,64,'驻车制动阀打开'),
    ('MVP4000',i_dataIndex,128,'排缆允许阀'),
    ('MVP4000',i_dataIndex,256,'旋转允许阀'),
    ('MVP4000',i_dataIndex,512,'伸缩允许阀'),
    ('MVP4000',i_dataIndex,1024,'自动运行阀'),
    ('MVP4000',i_dataIndex,2048,'绞车放大器使能输出'),
    ('MVP4000',i_dataIndex,4096,'电机停输出'),
    ('MVP4000',i_dataIndex,8192,'启动灯输出'),
    ('MVP4000',i_dataIndex,16384,'电机停止'),
    ('MVP4000',i_dataIndex,32768,'报警灯'),
    ('MVP4000',i_dataIndex,65536,'静音灯'),
    ('MVP4000',i_dataIndex,131072,'线（遥）控灯'),
    ('MVP4000',i_dataIndex,262144,'左排缆灯'),
    ('MVP4000',i_dataIndex,524288,'右排缆灯'),
    ('MVP4000',i_dataIndex,1048576,'自动运行警示灯'),
    ('MVP4000',i_dataIndex,2097152,'自由轮灯'),
    ('MVP4000',i_dataIndex,4194304,'加热器'),
    ('MVP4000',i_dataIndex,8388608,'仪器电源保护');
end if;

#检查报警信息表中是否满足MVP4000的报警信息量
select count(dptId) into i_dataCount from DB_SYSTEM.TAB_ALARM_DEFINE
 where dptId = 'MVP4000';
if ( i_dataCount is null ) or ( i_dataCount <> 37 ) then  #实际报警量根据后期重新定义
  SET SQL_SAFE_UPDATES = 0;
  delete from DB_SYSTEM.TAB_ALARM_DEFINE where dptId = 'MVP4000';
  insert into DB_SYSTEM.TAB_ALARM_DEFINE values
    ('MVP4000',0,1,'AD模块初始化错误(一)'),
    ('MVP4000',0,2,'DA模块初始化错误(一)'),
    ('MVP4000',0,4,'特殊模块初始化错误(一)'),
    ('MVP4000',0,8,'紧停报警(一)'),
    ('MVP4000',0,16,'电机热过载(温度)报警(一)'),
    ('MVP4000',0,32,'电源相序错误报警(一)'),
    ('MVP4000',0,64,'油箱液位低报警(一)'),
    ('MVP4000',0,128,'应急手动报警(一)'),
    ('MVP4000',1,1,'排缆左极限报警(二)'),
    ('MVP4000',1,2,'排缆右极限报警(二)'),
    ('MVP4000',1,4,'旋转左极限报警(二)'),
    ('MVP4000',1,8,'旋转右极限报警(二)'),
    ('MVP4000',1,16,'缆绳张力高报警(二)'),
    ('MVP4000',1,32,'绝缘检测仪报警(二)'),
    ('MVP4000',1,64,'余缆保护报警(二)'),
    ('MVP4000',1,128,'防冲顶保护报警(二)'),
    ('MVP4000',1,256,'自动排缆禁止报警(二)'),
    ('MVP4000',1,512,'油箱加热器热过载报警(二)'),
    ('MVP4000',1,1024,'数据采集系统报警(二)'),
    ('MVP4000',1,2048,'与上位机网络通讯错误报警(二)'),
    ('MVP4000',1,4096,'拖鱼数据完整性错误报警(二)'),
    ('MVP4000',1,8192,'拖鱼数据接收错误报警(二)'),
    ('MVP4000',1,16384,'任务模式与当前海深不匹配报警(二)'),
    ('MVP4000',1,32768,'自动投放时信标未触发报警(二)'),
    ('MVP4000',1,65536,'行车刹车片更换报警(二)'),
    ('MVP4000',2,1,'排缆左极限传感器故障(三)'),
    ('MVP4000',2,2,'排缆右极限传感器故障(三)'),
    ('MVP4000',2,4,'旋转左极限传感器故障(三)'),
    ('MVP4000',2,8,'旋转右极限传感器故障(三)'),
    ('MVP4000',2,16,'收缆压力高报警(三)'),
    ('MVP4000',2,32,'行车压力高报警(三)'),
    ('MVP4000',2,64,'油温高报警(三)'),
    ('MVP4000',2,128,'油温低报警(三)'),
    ('MVP4000',2,256,'排缆压力高报警(三)'),
    ('MVP4000',2,512,'强制放刹车报警(三)'),
    ('MVP4000',2,1024,'强制收缆报警(三)'),
    ('MVP4000',2,2048,'强制放缆报警(三)');
end if;
END$$
DELIMITER;

DELIMITER $$
#drop procedure if exists DB_WINCH.`sp_dataPrepare_MVP4000`;
CREATE PROCEDURE DB_WINCH.`sp_dataPrepare_MVP4000`
  (
   in_StartTime varchar(20),
   in_EndTime varchar(20)
  )
BEGIN
#创建MVP4000绞车相关的历史数据视图
#输入参数：历史数据的起始时间和结束时间
#历史数据视图名称：VW_MVP4000_YYYYMMDDHHMMSSYYYYMMDDHHMMSS
declare s_viewName text;
declare i_ViewCount int;

set s_viewName = concat("VW_MVP4000_", date_format(in_StartTime, '%Y%m%d%H%i%s'), date_format(in_EndTime, '%Y%m%d%H%i%s'));
#判断同一时段的视图是否已经存在
SELECT count(TABLE_NAME) into i_ViewCount
FROM
  information_schema.`TABLES`
where
  TABLE_SCHEMA = 'DB_WINCH' and TABLE_NAME = s_viewName;

if i_ViewCount = 0 then  #不存在该视图则创建之
  set s_viewName = concat("DB_WINCH.`", s_viewName, "`");
  set @s_Command = concat("CREATE VIEW ", s_viewName, " as ");
  set @s_Command = concat(@s_Command, ' select * from DB_WINCH.TAB_MVP4000_HISTORY');
  set @s_Command = concat(@s_Command, ' where timeTag >="', in_StartTime, '"', ' and timeTag <="', in_EndTime, '";');

  #执行历史数据视图的创建
  PREPARE execCommand FROM @s_Command;
  EXECUTE execCommand;
end if;

END$$;
DELIMITER ;


DELIMITER $$



CREATE PROCEDURE DB_WINCH.`sp_moveData_MVP4000` (
 in s_Time varchar(20)
)

BEGIN

  insert into DB_WINCH.TAB_MVP4000_HISTORY

   select * from DB_WINCH.TAB_MVP4000_REALTIME

   where timeTag < s_Time;

  SET SQL_SAFE_UPDATES = 0;
  delete from DB_WINCH.TAB_MVP4000_REALTIME where timeTag < s_Time;

END$$


DELIMITER ;



call DB_WINCH.sp_winchInit_MVP4000;