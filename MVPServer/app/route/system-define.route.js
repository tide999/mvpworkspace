
module.exports = app => {
    const sys_defines = require("../controller/system-define.controller");

    var router = require("express").Router();
    router.post("", sys_defines.create);
    router.get("/", sys_defines.findAll);

    router.put("/:dptId", sys_defines.update);
    router.delete("/:dptId", sys_defines.delete);

    app.use('/api/sys-define', router);
};
