const db = require('../config/db.config.js').datasetdb;
const SysDefine = db.SystemDefine;
const RealTime = db.RealTime;
const Op = db.Sequelize.Op;
const logger = require('../config/db.config.js').logger;

const fastcsv = require("fast-csv");
const fs = require("fs");
const export_file = "instrument-realtime-data.csv";
const ws = fs.createWriteStream(export_file);


exports.findAll = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_DATA_REALTIME";
    if (startTime)
        query_stmt += " where timeTag > $start_time ";

    query_stmt += "  order by timeTag desc";

    if (limitCount)
        query_stmt += " limit $limit_count";

    logger.info("findAll:", req.ip, query_stmt);
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
        .catch(function (err) {
            // handle error;
            res.json({ error: "findall" });
            logger.warn("Execute ", query_stmt, "error:", err);
        });

};

exports.exportRealtimeData = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_DATA_REALTIME";
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
                    res.json({fileName: export_file});
                })
                .pipe(ws);
        })
};

exports.crtJobHis = (req, res) => {
    const dptId = req.query.dptId;
    const s_JobId = req.query.s_JobId;
  
    var execStmt = "CALL crtJobHis_";
    const defaultDptId = "MFish-8";
    if (dptId)
        execStmt += dptId + "(:s_JobId);";
    else
        execStmt += defaultDptId + "(:s_JobId);";

    db.query(execStmt,
        { replacements: { s_JobId: s_JobId } })
        .then(data => {
            res.send(data);
            console.log("crtJobHis execute successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};












