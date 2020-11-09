const log4js = require('log4js');
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
    dialectOptions: env.sysDB.params.dialectOptions,
    timezone: env.sysDB.params.timezone
});

const sequelizeJobDB = new Sequelize(env.jobDB.database, env.jobDB.params.username, env.jobDB.params.password, {
    host: env.jobDB.params.host,
    dialect: env.jobDB.params.dialect,
   // operatorsAliases: false,
    pool: env.jobDB.params.pool,
    dialectOptions: env.jobDB.params.dialectOptions,
    timezone: env.jobDB.params.timezone

});

const sequelizeWinchDB = new Sequelize(env.winchDB.database, env.winchDB.params.username, env.winchDB.params.password, {
    host: env.winchDB.params.host,
    dialect: env.winchDB.params.dialect,
//    operatorsAliases: false,
    pool: env.winchDB.params.pool,
    dialectOptions: env.winchDB.params.dialectOptions,
    timezone: env.winchDB.params.timezone

});

const sequelizeDatasetDB = new Sequelize(env.datasetDB.database, env.datasetDB.params.username, env.datasetDB.params.password, {
    host: env.sysDB.params.host,
    dialect: env.sysDB.params.dialect,
   // operatorsAliases: false,
    pool: env.sysDB.params.pool,
    dialectOptions: env.datasetDB.params.dialectOptions,
    timezone: env.datasetDB.params.timezone

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
dbs.logger = log4js.configure(env.log_cfg).getLogger('mvp');
module.exports = dbs;
