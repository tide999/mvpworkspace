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
    const intervalTime = req.body.intervalTime;
    const safeDeep = req.body.safeDeep;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTimes, :safeDeep)";

    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTime: intervalTime, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.add_job_get = (req, res) => {
    const jobName = req.query.jobName;
    const jobMode = req.query.jobMode;
    const jobDeep = req.query.jobDeep;
    const dropTimes = req.query.dropTimes;
    const intervalTime = req.query.intervalTime;
    const safeDeep = req.query.safeDeep;
    const operateMode = req.query.operateMode;
    const operateSpeed = req.query.operateSpeed;

    var execStmt = "CALL sp_addJob(:jobName, :jobMode, :jobDeep, :dropTimes, :intervalTime, :safeDeep, :operateMode, :operateSpeed)";

    db.query(execStmt, {
        replacements: {
            jobName: jobName,
            jobMode: jobMode,
            jobDeep: jobDeep,
            dropTimes: dropTimes,
            intervalTime: intervalTime,
            safeDeep: safeDeep,
            operateMode: operateMode,
            operateSpeed: operateSpeed
        }
    })
        .then(data => {
            res.send(data);
            console.log("add job successfully!");
            console.log(data);
        }
        )
        .catch(error => {
            res.json({ error: error });
            console.log(error);
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
    var query_stmt = "SELECT * FROM  " + his_table_name + " order by timeTag";
    var file_name = "export_file/" + req.query.jobId + ".txt";
    const ws = g_fs.createWriteStream(file_name);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            const jsonData = JSON.parse(JSON.stringify(real_data));
            //console.log("jsonData", jsonData);
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
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 48 or jobStatus=51 order by issuedTime, runTimes desc limit 1";
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};

exports.get_waiting_job = (req, res) => {
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 3 order by issuedTime desc ";
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
    if (jobId)
        query_stmt += " where jobId = $jobId order by runTimes desc limit 1";
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

exports.get_current_job = (req, res) => {
    const jobId = req.query.jobId;
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus <> 768 and jobStatus <> 12288 order by jobId, runTimes desc limit 1";
    db.query(query_stmt, {
        bind: {          
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};

exports.get_hisdata_by_runtimes = (req, res) => {

    var job_id = req.query.jobId;
    var run_times = req.query.run_times;
    
    var query_stmt = "SELECT * FROM  ";
    if (job_id)
        query_stmt += "VW_JOB_" + job_id;
    else
        query_stmt += "VW_JOB_REALTIME ";
    if (run_times)
        query_stmt += " where runTimes = $runTimes ";

    db.query(query_stmt, {
        bind: {
            runTimes: run_times
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })    
};

exports.download = (req, res) => {
    const file = `${req.query.file_name}`;
    res.download(file); // Set disposition and send it.
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