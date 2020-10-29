module.exports = app => {
    const job_ctl = require("../controller/job.controller");

    var router = require("express").Router();
    router.post("/add_job", job_ctl.add_job);
    router.get("/add_job", job_ctl.add_job_get);

    router.get("/set_job_run_times", job_ctl.set_job_run_times);
    router.get("/get_realdata", job_ctl.get_real_data);
    router.get("/export_data", job_ctl.export_data);

    router.get("/get_running_job", job_ctl.get_running_job);
    router.get("/get_waiting_job", job_ctl.get_waiting_job);
    router.get("/get_job_realdata", job_ctl.get_job_realdata);
    router.get("/get_current_job", job_ctl.get_current_job);
    router.get("/get_hisdata_by_runtimes", job_ctl.get_hisdata_by_runtimes);
    router.get("/download", job_ctl.download);
    router.get("/get_export_file", job_ctl.get_export_file);
    app.use('/api/job', router);
};
