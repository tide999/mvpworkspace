CREATE DATABASE `DB_SYSTEM` DEFAULT CHARACTER SET utf8;

CREATE TABLE DB_SYSTEM.`TAB_SYSTEM_DEFINE` (
  `dptId` varchar(20) NOT NULL,
  `dptName` varchar(200) DEFAULT NULL,
  `dptType` tinyint DEFAULT NULL,
  `dptStatus` tinyint DEFAULT NULL,
  PRIMARY KEY (`dptId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO DB_SYSTEM.TAB_SYSTEM_DEFINE VALUES 
('MVP4000','自产MVP4000绞车',1,1),
('MFish-8','8参数拖鱼',2,1),
('GPS','GPS定位系统',3,1),
('KX','科学号船用海深探测设备',4,1);

CREATE TABLE DB_SYSTEM.`TAB_ALARM_DEFINE` (
  `dptId` varchar(20) NOT NULL,
  `alarmType` int DEFAULT NULL,
  `alarmValue` int DEFAULT NULL,
  `alarmDescription` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
('MVP4000',2,2048,'强制放缆报警(三)'),
('MFish-8',0,1,'串口故障'),
('MFish-8',1,1,'数据传输错误'),
('MFish-8',1,2,'数据校验错误'),
('GPS',0,1,'串口故障'),
('GPS',1,1,'数据错误'),
('KX',0,1,'串口故障'),
('KX',1,1,'数据错误');

CREATE TABLE DB_SYSTEM.`TAB_ALARM_REALTIME` (
  `timeTag` datetime(3) NOT NULL,
  `dptId` varchar(20) NOT NULL,
  `alarmType` int DEFAULT NULL,
  `alarmValue` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_SYSTEM.`TAB_CONTROL` (
  `timeTag` datetime(3) NOT NULL,
  `sourceId` varchar(20) DEFAULT NULL,
  `cmdId` int DEFAULT NULL,
  `cmdContent` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE DB_SYSTEM.`TAB_SHOW_DEFINE` (
  `serialNo` int auto_increment NOT NULL,
  `dptId` varchar(20) not NULL,
  `fieldName` varchar(20) not NULL,
  `dataName` varchar(20) not NULL,
  `dataUnit` varchar(20) NULL,
  `showInChart` tinyint not NULL default 0,
  `topLeft` tinyint NULL default 0,
  `sameAs` int NULL,
  PRIMARY KEY (`serialNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into DB_SYSTEM.TAB_SHOW_DEFINE(dptId, fieldName, dataName, dataUnit, showInChart, topLeft, sameAs) values
('MFish-8','dataSpeed','仪器下降速度','米/秒',0,null,null),
('MFish-8','dataDeep','仪器深度','米',1,1,null),
('MFish-8','dataTemp','温度','℃',1,1,null),
('MFish-8','dataConv','电导率','S/m',1,1,null),
('MFish-8','dataP','压力','bar',1,1,2),
('MFish-8','dataSal','盐度','psu',1,1,null),
('MFish-8','dataSV','声速','m/s',1,1,null),
('MFish-8','dataPH','PH值',null,1,1,null),
('MFish-8','dataZ','浊度','ug/l',1,1,null),
('MFish-8','dataY','叶绿素','ug/l',1,1,null),
('KX','oceanDeep','当前海深','米',1,1,2),
('GPS','iatitude','经度',null,0,null,null),
('GPS','longitude','维度',null,0,null,null),
('GPS','shipSpeed','航速','节',0,null,null),
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

create view DB_SYSTEM.VW_ALARM_REALTIME as
 select A.timeTag, A.dptId, B.dptName, A.alarmType, A.alarmValue, C.alarmDescription
 from DB_SYSTEM.TAB_ALARM_REALTIME A, DB_SYSTEM.TAB_SYSTEM_DEFINE B, DB_SYSTEM.TAB_ALARM_DEFINE C
 where A.dptId = B.dptId and ( A.dptId = C.dptId and A.alarmType = C.alarmType and A.alarmValue = C.alarmValue );

create view DB_SYSTEM.VW_ISHOW_DEFINE as
 select A.* from DB_SYSTEM.TAB_SHOW_DEFINE A, DB_SYSTEM.TAB_SYSTEM_DEFINE B
 where A.dptId = B.dptId and B.dptType in (2, 3, 4);

create view DB_SYSTEM.VW_WSHOW_DEFINE as
select A.* from DB_SYSTEM.TAB_SHOW_DEFINE A, DB_SYSTEM.TAB_SYSTEM_DEFINE B
 where A.dptId = B.dptId and B.dptType = 1;

DELIMITER $$
CREATE PROCEDURE DB_SYSTEM.sp_AddCommand(
    in inCommand int,
    in inCmdContent int
    )
BEGIN
#增加控制命令
  insert into DB_SYSTEM.TAB_CONTROL values(
    now(3),
    null,
    inCommand,
    inCmdContent
    );
END$$
DELIMITER ;