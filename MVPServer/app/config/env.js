const db_params = {
    username: 'root',
    password: 'op[]op[]',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
};

const env = {
    sysDB: {
        database: 'DB_SYSTEM',
        params: db_params
    },
    jobDB: {
        database: 'DB_JOB',
        params: db_params
    },
    datasetDB: {
        database: 'DB_DATASET',
        params: db_params
    },
    winchDB: {
        database: 'DB_WINCH',
        params: db_params
    }
};

module.exports = env;