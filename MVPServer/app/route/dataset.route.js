module.exports = app => {
    const realtime_ctl = require("../controller/realtime.controller");

    var router = require("express").Router();
    router.get("/", realtime_ctl.findAll);
    
    app.use('/api/realtime', router);
};
