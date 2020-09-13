-- 创建数据库时,设置数据库的编码方式 
-- CHARACTER SET:指定数据库采用的字符集,utf8不能写成utf-8
-- COLLATE:指定数据库字符集的排序规则,utf8的默认排序规则为utf8_general_ci（通过show character set查看）
drop database if EXISTS mvpdb;
create database mvpdb CHARACTER SET utf8 COLLATE utf8_general_ci;
-- 修改数据库编码
-- alter database mvpdb CHARACTER SET GBK COLLATE gbk_chinese_ci;
-- alter database mvpdb CHARACTER SET utf8 COLLATE utf8_general_ci;

