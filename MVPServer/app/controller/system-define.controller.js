const db = require('../config/db.config.js').sysdb;
const SysDefine = db.SystemDefine;
const Op = db.Sequelize.Op;
const logger = require('../config/db.config.js').logger;

exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body.dptId) {
        res.status(400).send({
            message: "dptId can not be empty!"
        });
        return;
    }
   
    // Create a Tutorial
    const sys_define = {
        dptId: req.body.dptId,
        dptName: req.body.dptName,
        dptType: req.body.dptType,
        dptStatus: req.body.dptStatus
    };

    // Save Tutorial in the database
    SysDefine.create(sys_define)
        
        .then(data => {
            res.status(200);
            //res.send({"message":"0"});
            res.json({"return-code":0});
            //res.send(data);
        }) 
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SysDefine."
            });
        });
};

exports.findAll = (req, res) => {

    const dptId = req.query.dptId;
    const dptName = req.query.dptName;
    const dptType = req.query.dptType;
    const dptStatus = req.query.dptStatus;

    var condition = {};
    if (dptId) {
        condition["dptId"] = { [Op.like]: `%${dptId}%` };
    }
    if (dptName) {
        condition["dptName"] = { [Op.like]: `%${dptName}%` };
    }
    if (dptType) {
        condition["dptType"] = { [Op.eq]: dptType };
    }
    if (dptStatus) {
        condition["dptStatus"] = { [Op.eq]: dptStatus};
    }

    SysDefine.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SysDefine."
            });
        });
};

// Update a System Define
exports.update = (req, res) => {
    var req_sys_define = req.body;
    const id = req.params.dptId;
    const sys_define = {
        dptId: req.body.dptId,
        dptName: req.body.dptName,
        dptType: req.body.dptType,
        dptStatus: req.body.dptStatus
    };

    SysDefine.update(sys_define,
        { where: { dptId: id } }
    ).then(() => {
        res.status(200).send(req_sys_define);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

// Delete a Customer by Id
exports.delete = (req, res) => {
    const id = req.params.dptId;
    SysDefine.destroy({
        where: { dptId: id }
    }).then(() => {
        res.status(200).send('SysDefine has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};


exports.get_independent_ishow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_ISHOW_DEFINE where  sameAs is null and showInChart = 1";
    logger.info("get_independent_ishow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_independent_ishow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });

};


exports.get_dependent_ishow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_ISHOW_DEFINE where  sameAs is not null and showInChart = 1";
    logger.info("get_dependent_ishow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_dependent_ishow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });
};


exports.get_ishow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_ISHOW_DEFINE";
    logger.info("get_ishow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_ishow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });


};

exports.get_independent_wshow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_WSHOW_DEFINE where  sameAs is null and showInChart = 1";
    logger.info("get_independent_wshow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_independent_wshow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });

};


exports.get_dependent_wshow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_WSHOW_DEFINE where  sameAs is not null and showInChart = 1";
    logger.info("get_dependent_wshow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_dependent_wshow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });

};

exports.get_wshow_define = (req, res) => {
    var query_stmt = "select * from DB_SYSTEM.VW_WSHOW_DEFINE";
    logger.info("get_wshow_define ", query_stmt);

    db.query(query_stmt, {
        type: db.QueryTypes.SELECT
    })
        .then(real_data => {
            res.send(real_data);
        })
        .catch(function (err) {
            // handle error;
            res.json({ error: "get_wshow_define" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });

};


exports.get_alarm_realtime = (req, res) => {
    const startTime = req.query.start_time;
    const limitCount = req.query.limit;
    var query_stmt = "SELECT * FROM VW_ALARM_REALTIME";
    if (startTime)
        query_stmt += " where timeTag > $start_time ";

    query_stmt += "  order by timeTag desc";

    if (limitCount)
        query_stmt += " limit $limit_count";
    logger.info("get_alarm_realtime ", req.ip, query_stmt);

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
            res.json({ error: "get_alarm_realtime" });
            logger.warn("Execute ", query_stmt, "error:", error);
        });
};

exports.add_command = (req, res) => {
    const cmdId = req.body.cmdId;
    const cmdContent = req.body.cmdContent;

    var execStmt = "CALL sp_addCommand(:cmdId, :cmdContent)";

    db.query(execStmt, { replacements: { cmdId: cmdId, cmdContent: cmdContent} })
        .then(data => {
            res.send(data);
            console.log("add command successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};

exports.add_command_get = (req, res) => {
    const cmdId = req.query.cmdId;
    const cmdContent = req.query.cmdContent;

    var execStmt = "CALL sp_addCommand(:cmdId, :cmdContent)";

    db.query(execStmt, { replacements: { cmdId: cmdId, cmdContent: cmdContent } })
        .then(data => {
            res.send(data);
            console.log("add command successfully!")
        }
        )
        .catch(error => {
            res.json({ error: error });
        });
};


/*
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TAB_SYSTEM_DEFINE', {
        dptId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        dptName: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        dptType: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        dptStatus: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'TAB_SYSTEM_DEFINE'
    });
};
*/
