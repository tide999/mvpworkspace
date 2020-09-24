const fastcsv = require("fast-csv");
const g_fs = require("fs");

const db = require('../config/db.config.js').jobdb;


exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};


exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.add_job = (req, res) => {
    const jobName = req.body.jobName;
    const jobMode = req.body.jobMode;
    const jobDeep = req.body.jobDeep;
    const dropTimes = req.body.dropTimes;
    const intervalTimes = req.body.intervalTime;
    const safeDeep = req.body.safeDeep;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTimes, :safeDeep)";

    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTimes: intervalTimes, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};


exports.get_real_data = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    if (startTime)
        query_stmt += " where startTime >= $start_time";
    if (limitCount)
        query_stmt += " limit $limit_count"
    db.query(query_stmt, {
        //model: RealTime,
        //mapToModel: false // 如果有任何映射字段，则在这里传递true
        bind: {
            start_time: startTime,
            limit_count: limitCount
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
            // Each record will now be an instance of Project
        })
};

exports.export_data = (req, res) => {
    var his_table_name = "TAB_JOB_";
    his_table_name += req.query.jobId;
    var query_stmt = "SELECT * FROM  " + his_table_name + " order by tagTime";
    var file_name = req.query.jobId;
    const ws = g_fs.createWriteStream(file_name);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            const jsonData = JSON.parse(JSON.stringify(real_data));
            console.log("jsonData", jsonData);

            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function () {
                    console.log("Write to csv successfully!");
                    res.json({ fileName: file_name });
                })
                .pipe(ws);
        })
};


exports.get_running_job = (req, res) => {
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 48 order by issuedTime, runTimes desc";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};

exports.get_waiting_job = (req, res) => {
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 3 order by issuedTime desc";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};


exports.get_job_realdata = (req, res) => {
    const jobId = req.query.jobId;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    if (startTime)
        query_stmt += " where jobId >= $jobId order by runTimes desc limit 1";
    db.query(query_stmt, {
        bind: {
            jobId: jobId
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};


/*
exports.add_job = (req, res) => {
    const jobName = req.body.jobName;
    const jobMode = req.body.jobMode;
    const jobDeep = req.body.jobDeep;
    const dropTimes = req.body.dropTimes;
    const intervalTime = req.body.intervalTime;
    const safeDeep = req.body.safeDeep;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTimes, :safeDeep");

    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTimes: intervalTimes, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.set_job_run_times = (req, res) => {
    const jobId = req.body.in_JobId;
    const runTimes = req.body.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";

    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.get_real_data = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    if (startTime)
        query_stmt += " where startTime >= $start_time";
    if (limitCount)
        query_stmt += " limit $limit_count"
    db.query(query_stmt, {
        //model: RealTime,
        //mapToModel: false // 如果有任何映射字段，则在这里传递true
        bind: {
            start_time: startTime,
            limit_count: limitCount
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
            // Each record will now be an instance of Project
        })
};

exports.export_realtime_data = (req, res) => {

    var query_stmt = "SELECT * FROM VW_JOB_REALTIME";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            const jsonData = JSON.parse(JSON.stringify(real_data));
            console.log("jsonData", jsonData);

            fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function () {
                    console.log("Write to csv successfully!");
                    res.json({ fileName: export_file });
                })
                .pipe(ws);
        })
};
*/