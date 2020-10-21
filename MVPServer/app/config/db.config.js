//var fs = require('fs');
var configJson;
console.log(process.cwd());

try {
    //configJson = JSON.parse(fs.readFileSync(
    //    process.cwd() + '/config.json',
    //    'utf-8'));
    configJson = require(process.cwd() + '/config.js');
} catch (e) {
    console.log(e);
    configJson = null;
}

if (configJson)
    console.log("read config.js file successfully");
else
    console.log("without config.js file,use env.js as config file");

const env = configJson ? configJson : require('./env.js');
console.log(env.sysDB.params.host);
const Sequelize = require('sequelize');
const { config } = require('process');
const sequelizeSysDB = new Sequelize(env.sysDB.database, env.sysDB.params.username, env.sysDB.params.password, {
    host: env.sysDB.params.host,
    dialect: env.sysDB.params.dialect,
 //   operatorsAliases: false,
    pool: env.sysDB.params.pool,
    dialectoptions: env.sysDB.params.dialectoptions
});

const sequelizeJobDB = new Sequelize(env.jobDB.database, env.jobDB.params.username, env.jobDB.params.password, {
    host: env.jobDB.params.host,
    dialect: env.jobDB.params.dialect,
   // operatorsAliases: false,
    pool: env.jobDB.params.pool
});

const sequelizeWinchDB = new Sequelize(env.winchDB.database, env.winchDB.params.username, env.winchDB.params.password, {
    host: env.winchDB.params.host,
    dialect: env.winchDB.params.dialect,
//    operatorsAliases: false,
    pool: env.winchDB.params.pool
});

const sequelizeDatasetDB = new Sequelize(env.datasetDB.database, env.datasetDB.params.username, env.datasetDB.params.password, {
    host: env.sysDB.params.host,
    dialect: env.sysDB.params.dialect,
   // operatorsAliases: false,
    pool: env.sysDB.params.pool
});


const dbs = {
    sqlz: Sequelize,
    sysdb: sequelizeSysDB,
    jobdb: sequelizeJobDB,
    winchdb: sequelizeWinchDB,
    datasetdb: sequelizeDatasetDB
};

dbs.sysdb.SystemDefine = require("../model/TAB_SYSTEM_DEFINE")(dbs.sysdb, Sequelize);
dbs.datasetdb.RealTime = require("../model/TAB_REALTIME")(dbs.datasetdb, Sequelize);
dbs.logger = env.logger;
module.exports = dbs;