
module.exports = app => {
    const sys_defines = require("../controller/system-define.controller");

    var router = require("express").Router();
    router.post("", sys_defines.create);
    router.get("/", sys_defines.findAll);

    router.put("/:dptId", sys_defines.update);
    router.delete("/:dptId", sys_defines.delete);

    router.get("/get_independent_ishow_define", sys_defines.get_independent_ishow_define);
    router.get("/get_dependent_ishow_define", sys_defines.get_dependent_ishow_define);
    router.get("/get_ishow_define", sys_defines.get_ishow_define);

    router.get("/get_independent_wshow_define", sys_defines.get_independent_wshow_define);
    router.get("/get_dependent_wshow_define", sys_defines.get_dependent_wshow_define);
    router.get("/get_wshow_define", sys_defines.get_wshow_define);

    router.get("/get_alarm_realtime", sys_defines.get_alarm_realtime);


    app.use('/api/sys-define', router);
};
