const fastcsv = require("fast-csv");
const g_fs = require("fs");
//const { REAL } = require("sequelize/types");
const logger = require('../config/db.config.js').logger;
const db = require('../config/db.config.js').jobdb;

exports.set_job_run_times = (req, res) => {
    const jobId = req.query.in_JobId;
    const runTimes = req.query.in_RunTimes;

    var execStmt = "CALL sp_setJobRunTimes(:in_JobId, :in_RunTimes)";
    logger.info("set_job_run_times", req.ip, execStmt);
    db.query(execStmt,
        { replacements: { in_JobId: jobId, in_RunTimes: runTimes } })
        .then(data => {
            res.send(data);
            console.log("Prepare winch data successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
            logger.warn("Execute ", execStmt, "error:", error);
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
    logger.info("add_job req from :", req.ip, execStmt);
    db.query(execStmt, { replacements: { jobName: jobName, jobMode: jobMode, jobDeep: jobDeep, dropTimes: dropTimes, intervalTime: intervalTime, safeDeep: safeDeep } })
        .then(data => {
            res.send(data);
            console.log("add job successfully!");
            logger.info("add job successfully", execStmt);
        }
        )
        .catch(error => {
            res.json({ error: error });
            logger.warn("Execute ", execStmt, "error:", error);
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
    logger.info("add_job req from :", req.ip, execStmt);
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
            logger.info("add job successfully", execStmt);
        }
        )
        .catch(error => {
            res.json({ error: error });
            console.log(error);
            logger.warn("Execute ", execStmt, "error:", error);
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
    logger.info("get_real_data req :", req.ip, query_stmt);
    db.query(query_stmt, {
        //model: RealTime,
        //mapToModel: false // ������κ�ӳ���ֶΣ��������ﴫ��true
        bind: {
            start_time: startTime,
            limit_count: limitCount
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
            logger.info("get_real_data successfully", query_stmt);
            // Each record will now be an instance of Project
        })
        .catch(error => {
            res.json({ error: error });
            console.log(error);
            logger.warn("Execute ", query_stmt, "error:", error);
        });
};

exports.export_data = (req, res) => {
    var his_table_name = "TAB_JOB_";
    his_table_name += req.query.jobId;
    var query_stmt = "SELECT * FROM  " + his_table_name + " order by timeTag";
    var file_name = "export_file/" + req.query.jobId + ".txt";
    const ws = g_fs.createWriteStream(file_name);
    logger.info("export_data req from :", req.ip, query_stmt);
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
                    logger.info("export_data successfully", query_stmt);
                })
                .pipe(ws);
        }).catch(function (err) {
            // handle error;
            res.json({ error: "table does not exist" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
};


exports.get_running_job = (req, res) => {
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 48 or jobStatus=51 order by issuedTime, runTimes desc limit 1";
    logger.info("get_running_job req from :", req.ip, query_stmt);
    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
};

exports.get_waiting_job = (req, res) => {
    var query_stmt = "SELECT * FROM VW_JOB_REALTIME where jobStatus = 3 order by issuedTime desc ";
    logger.info("get_waiting_job req from :", req.ip, query_stmt);
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
    logger.info("get_job_realdata req :", req.ip, query_stmt);
    db.query(query_stmt, {
        bind: {
            jobId: jobId
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_current_job" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
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
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_current_job" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
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
        query_stmt += " where runTimes = $runTimes order by devDeep";
    logger.info("get_hisdata_by_runtimes req :", req.ip, query_stmt);
    db.query(query_stmt, {
        bind: {
            runTimes: run_times
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })    
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_hisdata_by_runtimes" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
};

exports.download = (req, res) => {
    const file = `${req.query.file_name}`;
    logger.info("download req from :", req.ip, file);
    res.download(file); // Set disposition and send it.
};


/*
 ���ýӿڣ�
 /api/job/get_export_file
 ���÷�����
 get
 ������
 jobId
 ���ýӿ�ʾ����
 http://localhost:8080/api/job/get_export_file?jobId=20201020005603937
 ���أ�
 ����ļ������򷵻ص�filePrepare��ֵΪ1��downloadFile��Ϊ��Ҫ���ص��ļ�����
 ����ļ������ڣ�filePrepare��ֵΪ0
 ���ظ�ʽ��
 ���û���ļ���
 [
    {
        "downloadFile": null,
        "filePrepare": 0
    }
]
������ļ���
[
    {
        "downloadFile": "export_file/20201020021602018.txt",
        "filePrepare": 0
    }
]
 */
 
exports.get_export_file = (req, res) => {
    const jobId = req.query.jobId;
    var query_stmt = "SELECT downloadFile, filePrepare FROM TAB_JOB";
    if (jobId)
        query_stmt += " where jobId = $jobId ";
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


exports.get_finished_jobs = (req, res) => {

    const query_stmt = "select jobid, jobName, jobMode, setDeep, dropTimes, intervaltime, safeDeep, jobStatus, opmode, opspeed, issuedTime, max(runtimes) as runtimes from VW_JOB_REALTIME \
                        where jobStatus = 768 or jobStatus = 12288 \
                        group by jobid, jobName, jobMode, setDeep, dropTimes, intervaltime, safeDeep, jobStatus, opmode, opspeed, issuedTime \
                        order by issuedTime, max(runTimes) ";

    db.query(query_stmt, {
               type: db.QueryTypes.SELECT
        })
        .then(real_data => {
            logger.info(real_data);
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_finished_jobs" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
};

exports.getInstId = (jobId) => {
    var query_stmt = "select instrumentId from DB_JOB.TAB_JOB where jobId = $jobId";
    db.query(query_stmt, {
        bind: {
            jobId: jobId
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            instId = real_data[0].instrumentId;
            return instId;
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "prepare_job_view" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });
};

exports.prepare_job_view = (req, res) => {

    const jobId = req.query.jobId;
    var query_stmt = "select instrumentId from DB_JOB.TAB_JOB where jobId = $jobId";
    db.query(query_stmt, {
        bind: {
            jobId: jobId
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            var instId = real_data[0].instrumentId;
            var execStmt = "CALL `DB_DATASET`.`sp_dataPrepareByJobId_" + instId + "` (:in_JobId)";

            db.query(execStmt, { replacements: { in_JobId: jobId } })
                .then(data => {
                    res.json({result:0});
                    console.log("prepare_job_view job successfully!")
                }
                )
                .catch(error => {
                    res.json({ error: error });
                    console.log("prepare_job_view job faled", error);
                });
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "prepare_job_view" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });

};

/*
 * 
'��ȡ��ǰ��ȵľ�������
'�����ǰ�������������������ƽ�������Ϊ����������˸������ֵ����Ҫ��ȡ��ǰͶ�Ŵ����¶�Ӧ�����ȵ��������ݡ�
'���룺
'in_DevDeep��������ݵ�����ֵ
'in_FieldName����Ҫ��ȡ�����ݵ�����
'in_RunTimes��Ͷ�Ŵ��������飬����ϸ��������Ӧ��Ͷ�Ŵ�����
getMoreDataByDevDeep
 * 
 */

exports.getMoreDataByDevDeep = (req, res) => {

    const jobId = req.query.jobId;
    const in_FieldName = req.query.field_name;
    const s_Times = req.query.run_times;
    const in_DevDeep = req.query.dev_deep;

    var query_stmt = "select runTimes, " /*devDeep,*/
        + in_FieldName
        + " from DB_JOB.TAB_JOB_" + jobId
        + " where runTimes in (" + s_Times + ") and floor(devDeep) = $dev_deep"
        + " group by runTimes, devDeep, " + in_FieldName
        + " order by runTimes, devDeep;";

    logger.info(query_stmt);

    db.query(query_stmt, {
        bind: {
            dev_deep: in_DevDeep
        },
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "getMoreDataByDevDeep" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });

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
        //mapToModel: false // ������κ�ӳ���ֶΣ��������ﴫ��true
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