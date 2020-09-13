const db = require('../config/db.config.js').datasetdb;
const SysDefine = db.SystemDefine;
const RealTime = db.RealTime;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    const startTime = req.query.start_time;
    var query_stmt = "SELECT * FROM VW_DATA_REALTIME";
    if (startTime)
        query_stmt += " where timeTag >= $start_time";

    db.query(query_stmt, {
            //model: RealTime,
        //mapToModel: false // 如果有任何映射字段，则在这里传递true
            bind: { start_time: startTime },
            type: db.QueryTypes.SELECT
        })
        .then(real_data => {
            res.send(real_data);
            // Each record will now be an instance of Project
        })
};
