const db = require('../config/db.config.js').sysdb;
const SysDefine = db.SystemDefine;
const Op = db.Sequelize.Op;

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
