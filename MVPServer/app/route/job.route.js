module.exports = app => {
    const job_ctl = require("../controller/job.controller");

    var router = require("express").Router();
    router.post("/add_job", job_ctl.add_job);
    router.get("/set_job_run_times", job_ctl.set_job_run_times);
    router.get("/get_realdata", job_ctl.get_real_data);
    router.get("/export_realdata", job_ctl.export_realtime_data);
    app.use('/api/job', router);
};
