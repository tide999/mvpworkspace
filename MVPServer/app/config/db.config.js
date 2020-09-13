const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelizeSysDB = new Sequelize(env.sysDB.database, env.sysDB.params.username, env.sysDB.params.password, {
    host: env.sysDB.params.host,
    dialect: env.sysDB.params.dialect,
    operatorsAliases: false,
    pool: env.sysDB.params.pool
});

const sequelizeJobDB = new Sequelize(env.jobDB.database, env.jobDB.params.username, env.jobDB.params.password, {
    host: env.jobDB.params.host,
    dialect: env.jobDB.params.dialect,
    operatorsAliases: false,
    pool: env.jobDB.params.pool
});

const sequelizeWinchDB = new Sequelize(env.winchDB.database, env.winchDB.params.username, env.winchDB.params.password, {
    host: env.winchDB.params.host,
    dialect: env.winchDB.params.dialect,
    operatorsAliases: false,
    pool: env.winchDB.params.pool
});

const sequelizeDatasetDB = new Sequelize(env.datasetDB.database, env.datasetDB.params.username, env.datasetDB.params.password, {
    host: env.sysDB.params.host,
    dialect: env.sysDB.params.dialect,
    operatorsAliases: false,
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

module.exports = dbs;