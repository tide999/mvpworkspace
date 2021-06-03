import request from "@/utils/request.js";
export default {
    /**
     * @description: echarts点击弹窗关闭事件
     * @param {*}
     * @return {*}
     */
    echartToolTipsDataDialogClose() {
        this.echartToolTipsDataDialog = false;
        this.echartToolTipsData = {
            name: '',
            data: [],
            fieldName: '',
            devDeep: '',
        };
    },
    /**
     * @description: 导出
     * @param {*}
     * @return {*}
     */
    exportss() {
        window.clearInterval(this.si)
        this.si = window.setInterval(() => {
            this.exportTimes++;
            this.exportFile(this.missiondata.jobId)
        }, 1000)
    },
    /**
     * @description: 停止自动回放
     * @param {*}
     * @return {*}
     */
    stopAutoPlay() {
        window.clearInterval(this.autoInterval);
        this.isAuto = false;
        this.$message({
            type: 'success',
            message: "已停止自动显示回放"
        })
    },
    /**
     * @description: 重新获取任务
     * @param {*}
     * @return {*}
     */
    refreshGetMission() {
        this.getFinishedJobs()
    },
    /**
     * @description: echarts 关闭事件
     * @param {*} clnum
     * @return {*}
     */
    closeitem(clnum) {
        if (this.echartsArray.length > this.myChartsArray.length - 2) {
            this.$message({
                message: '不能再关了！',
                type: 'warning'
            })
            return
        }
        document.getElementsByClassName('echart-item')[clnum].style.display = 'none';
        for (let i in this.myChartsArray) {
            if (clnum == this.myChartsArray[i].id) {
                this.echartsArray.push(this.myChartsArray[i]);
            }
        }
        for (let i = 0; i < document.getElementsByClassName('echart-item').length; i++) {
            if (i == clnum) {
                document.getElementsByClassName('echart-item')[i].style.width = 0
            } else {
                document.getElementsByClassName('echart-item')[i].style.width = (95 / (document.getElementsByClassName('echart-item').length - this.echartsArray.length)) + "%"
            }

        }
    },
    /**
     * @description: echarts显示 事件
     * @param {*} row
     * @return {*}
     */
    showitem(row) {
        for (let i in this.echartsArray) {
            if (row.id == this.echartsArray[i].id) {
                this.echartsArray.splice(i, 1)
            }
        }
        document.getElementsByClassName('echart-item')[row.id].style.display = 'block';
        for (let i = 0; i < document.getElementsByClassName('echart-item').length; i++) {
            document.getElementsByClassName('echart-item')[i].style.width = (95 / (document.getElementsByClassName('echart-item').length - this.echartsArray.length)) + "%"
        }
    },
    drawLine() {
        let _this = this;
        this.$nextTick(function() {
            // console.log(_this.myChartsArray)
            for (let i in _this.myChartsArray) {
                _this.myChartsArray[i].render = _this.$echarts.getInstanceByDom(document.getElementById(_this.myChartsArray[i].name));
                if (_this.myChartsArray[i].render === undefined) {
                    _this.myChartsArray[i].render = _this.$echarts.init(document.getElementById(_this.myChartsArray[i].name));
                }
                for (let j in _this.optionArray) {
                    if (i == j) {
                        _this.myChartsArray[i].render.setOption(_this.optionArray[j], true);
                    }
                };
                // _this.myChartsArray[i].render.on('click', (params) => {
                //     console.log(params)
                // })
                _this.myChartsArray[i].render.resize()
            }
            for (let i = 0; i < document.getElementsByClassName('echart-item').length; i++) {
                document.getElementsByClassName('echart-item')[i].style.width = (95 / document.getElementsByClassName('echart-item').length) + "%"
            }
            let elementResizeDetectorMaker = require("element-resize-detector"); //引入监听dom变化的组件
            let erd = elementResizeDetectorMaker();
            for (let i = 0; i < document.getElementsByClassName('echart-item').length; i++) {
                let worldMapContainer = document.getElementsByClassName('echart-item')[i];
                erd.listenTo(worldMapContainer, function(element) { //执行监听 
                    _this.$nextTick(function() {
                        document.getElementById(`myChart` + i).style.width = element.offsetWidth + 'px';
                        _this.myChartsArray[i].render.resize()
                    })
                });
            }
        })
    },
    getThisMission(e) {
        for (let i in this.missionlist) {
            if (e == this.missionlist[i].jobId) {
                this.missiondata = this.missionlist[i];
                if (this.missiondata.jobMode == 5) {
                    this.missiondata.jobModes = '定深投放'
                } else if (this.missiondata.jobMode == 80) {
                    this.missiondata.jobModes = '距底定距投放'
                } else {
                    this.missiondata.jobModes = '无'
                }
                if (this.missiondata.jobStatus == 3) {
                    this.missiondata.jobStatuss = '等待执行'
                } else if (this.missiondata.jobStatus == 48) {
                    this.missiondata.jobStatuss = '正在执行'
                } else if (this.missiondata.jobStatus == 51) {
                    this.missiondata.jobStatuss = '投放间隔等待'
                } else if (this.missiondata.jobStatus == 768) {
                    this.missiondata.jobStatuss = '执行完成'
                } else if (this.missiondata.jobStatus == 12288) {
                    this.missiondata.jobStatuss = '已经取消'
                } else {
                    this.missiondata.jobStatuss = '无'
                }
                if (this.missiondata.dropTimes == -1) {
                    this.missiondata.dropTimes = '无限次'
                }
            }
        }
        this.yAxisNumber = this.missiondata.setDeep;
        this.runTimes = 1;
    },
    async getFinishedJobs() {
        let _this = this;
        this.loadingpage = true
        let result = await request({
            url: "/job/get_finished_jobs",
            method: "get"
        });
        try {
            _this.missionlist = result.data;
            _this.loadingpage = false
        } catch (error) {
            console.error(error);
            _this.loadingpage = false
        }
    },
    checkInput() {
        // console.log(this.autoShowTimes)
        if (this.autoShowTimes < 1) {
            this.autoShowTimes = 1
        }
    },
    autoPlay() {
        // console.log(this.autoShowTimes);
        if (this.autoShowTimes < 1) {
            this.autoShowTimes = 1
            return
        } else {
            this.isAuto = true;
            this.nextTimes()
            window.clearInterval(this.autoInterval)
            this.autoInterval = window.setInterval(() => {
                this.nextTimes()
            }, this.autoShowTimes * 1000)
        }
    },
    beforeTimes() {
        if (!this.missiondata.jobId) {
            this.$message.error('请先选择回放任务！');
            return
        }
        if (!this.isPushBtn) {
            this.$message.error('请先点击开始回放！');
            return
        }
        this.loadingbtn = true;
        // console.log(Math.min.apply(null, this.myChartsArray[0].timesArray));
        // this.runTimes--;
        this.runTimes = Math.min.apply(null, this.myChartsArray[0].timesArray) - 1;
        this.controlbtn = 'before';
        if (this.runTimes == 0) {
            this.runTimes = 1;
        }
        this.getHisdata({
            jobId: this.missiondata.jobId,
            run_times: this.runTimes
        })

    },
    nextTimes() {
        if (!this.missiondata.jobId) {
            this.$message.error('请先选择回放任务！');
            return
        }
        if (!this.isPushBtn) {
            this.$message.error('请先点击开始回放！');
            return
        }
        if (this.historyDataResultNoData == false) {
            this.loadingbtn = true;
            // console.log(Math.max.apply(null, this.myChartsArray[0].timesArray));
            this.runTimes = Math.max.apply(null, this.myChartsArray[0].timesArray) + 1;
            this.controlbtn = 'next';
            this.getHisdata({
                jobId: this.missiondata.jobId,
                run_times: this.runTimes
            })
        }

    },
    playBack() {
        let _this = this;
        _this.threeTimes = 0;
        _this.runTimes = 0;
        _this.controlbtn = '';
        if (!this.missiondata.jobId) {
            this.$message.error('请选择回放任务')
            this.loadingpage = false;
            return
        };

        for (let i in this.myChartsArray) {
            if (this.myChartsArray[i].render != '') {
                let bb = this.myChartsArray[i].render.getOption();
                this.myChartsArray[i].render.clear();
                bb.series = [];
                this.myChartsArray[i].render.setOption(bb);
            };
            this.myChartsArray[i].series = [];
            this.myChartsArray[i].legendData = [];
            this.myChartsArray[i].timesArray = [];
        }
        this.isPushBtn = true;
        this.isplaybackbtn = true;
        this.prepareJobView(_this.missiondata.jobId)
    },

    async prepareJobView(jobid) {
        let _this = this;
        _this.loadingpage = true;
        let result = await request({
            url: "/job/prepare_job_view",
            method: "get",
            params: {
                jobId: jobid
            }
        });
        try {
            // console.log(result.data.result);
            if (result.data.result == 0) {
                window.clearInterval(_this.playBackInterval);
                _this.playBackInterval = window.setInterval(() => {
                    _this.runTimes++
                        _this.getHisdata({
                            jobId: _this.missiondata.jobId,
                            run_times: _this.runTimes
                        });
                    _this.threeTimes++;
                    if (_this.threeTimes == 3) {
                        window.clearInterval(_this.playBackInterval);
                        _this.threeTimes = 0;
                        _this.loadingpage = false;
                    }
                }, 500)
            } else {
                _this.$message.error('CAN NOT GET prepare_job_view: Error')
            }
        } catch (error) {
            console.log(error);
        }
    },


    async getHisdata(row) {
        let _this = this;
        let result = await request({
            url: "/job/get_hisdata_by_runtimes",
            method: "get",
            params: {
                jobId: row.jobId,
                run_times: row.run_times
            }
        });
        try {
            if (result.data.length == 0) {
                _this.historyDataResultNoData = true;
                // _this.$message.error(`暂无第${_this.runTimes}次投放数据`);
                console.warn(`暂无第${_this.runTimes}次投放数据`);
                _this.isAuto = false;
                window.clearInterval(_this.autoInterval)
                _this.loadingbtn = false;
            } else {
                _this.historyDataResultNoData = false;
                _this.yAxisDataArray = [];
                let YaxisStart = 0,
                    YaxisEnd = result.data[result.data.length - 1].devDeep + parseInt(result.data[result.data.length - 1].devDeep * 0.1);
                // 初始化Y轴data
                for (let i = 0; i < YaxisEnd; i++) {
                    _this.yAxisDataArray.push(YaxisStart);
                    YaxisStart++;
                }
                let temSeries = {
                    data: [],
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    times: 0,
                    name: `第${result.data[0].runTimes}次`
                };
                for (let j = 0; j < _this.myChartsArray.length; j++) {
                    // 初始化Y轴
                    let cc = _this.myChartsArray[j].render.getOption();
                    cc.yAxis[0].data = _this.yAxisDataArray;
                    cc.xAxis[0].max = _this.myChartsArray[j].upperLimit;
                    cc.xAxis[0].min = _this.myChartsArray[j].lowerLimit;

                    let aaa = JSON.parse(JSON.stringify(temSeries))
                    for (let kk = 0; kk < _this.yAxisDataArray.length; kk++) {
                        let emits = null;
                        for (let kkk = 0; kkk < result.data.length; kkk++) {
                            if (result.data[kkk].devDeep == _this.yAxisDataArray[kk]) {
                                emits = result.data[kkk][_this.myChartsArray[j].fieldName];
                            }
                        }
                        aaa.data.push(emits);
                    }
                    aaa.times = result.data[0].runTimes;
                    if (_this.controlbtn == '') {
                        _this.myChartsArray[j].series.push(aaa);
                        _this.myChartsArray[j].legendData.push(aaa.name);
                        _this.myChartsArray[j].timesArray.push(aaa.times);
                    } else if (_this.controlbtn == 'before') {
                        _this.myChartsArray[j].series.unshift(aaa);
                        _this.myChartsArray[j].legendData.unshift(aaa.name);
                        _this.myChartsArray[j].timesArray.unshift(aaa.times);
                    } else if (_this.controlbtn == 'next') {
                        _this.myChartsArray[j].series.push(aaa);
                        _this.myChartsArray[j].legendData.push(aaa.name);
                        _this.myChartsArray[j].timesArray.push(aaa.times);
                    }

                    for (let kk = 0; kk < _this.myChartsArray[j].series.length; kk++) {
                        for (let k = kk + 1; k < _this.myChartsArray[j].series.length; k++) {
                            if (_this.myChartsArray[j].series[kk].times == _this.myChartsArray[j].series[k].times) {
                                _this.myChartsArray[j].series.splice(k, 1);
                                _this.myChartsArray[j].legendData.splice(k, 1);
                                _this.myChartsArray[j].timesArray.splice(k, 1);
                                k--;
                            }
                        }
                    };
                    if (_this.myChartsArray[j].series.length == 4) {
                        if (_this.controlbtn == 'before') {
                            _this.myChartsArray[j].series.splice(3, 1)
                            _this.myChartsArray[j].legendData.splice(3, 1)
                            _this.myChartsArray[j].timesArray.splice(3, 1);
                        } else if (_this.controlbtn == 'next') {
                            _this.myChartsArray[j].series.splice(0, 1)
                            _this.myChartsArray[j].legendData.splice(0, 1)
                            _this.myChartsArray[j].timesArray.splice(0, 1);
                        }
                    }
                    cc.series = _this.myChartsArray[j].series;
                    cc.legend[0].data = _this.myChartsArray[j].legendData;
                    _this.myChartsArray[j].render.setOption(cc);
                    cc = null;
                }
                // console.log(_this.controlbtn);
                console.log(_this.myChartsArray);

                _this.loadingbtn = false;
            }
        } catch (error) {
            console.error(error);
            _this.loadingbtn = false;
        }
    },
    async getishow() {
        let _this = this;
        let result = await request({
            url: "sys-define/get_ishow_define",
            method: "get"
        });
        try {
            // console.log(result.data);
            _this.getishowArray = JSON.parse(JSON.stringify(result.data));
            // console.log(_this.getishowArray)
            for (let i = 0; i < _this.getishowArray.length; i++) {
                if (_this.getishowArray[i].showInChart == 1) {
                    if (_this.getishowArray[i].fieldName != "devDeep" && _this.getishowArray[i].fieldName != "oceanDeep") {
                        let a = {
                            name: 'myChart',
                            render: '',
                            title: _this.getishowArray[i].dataName + '(' + _this.getishowArray[i].dataUnit + ')',
                            id: 0,
                            fieldName: _this.getishowArray[i].fieldName,
                            series: [],
                            upperLimit: _this.getishowArray[i].upperLimit,
                            lowerLimit: _this.getishowArray[i].lowerLimit,
                            legendData: [],
                            timesArray: [],
                        }
                        _this.myChartsArray.push(a)
                    }
                }
            }
            for (let i in _this.myChartsArray) {
                _this.myChartsArray[i].name = 'myChart' + i
                _this.myChartsArray[i].id = +i;
                let a = JSON.parse(JSON.stringify(_this.option));
                a.title.text = _this.myChartsArray[i].title;
                // 自定义 提示窗
                a.tooltip.filedName = _this.myChartsArray[i].filedName;
                a.tooltip.formatter = function(params, ticket, callback) {
                    let tArray = [];
                    for (let j in _this.myChartsArray[i].series) {
                        tArray.push(_this.myChartsArray[i].series[j].times);
                    }
                    _this.getMoreData({
                        jobid: _this.missiondata.jobId,
                        fieldname: _this.myChartsArray[i].fieldName,
                        runtimes: tArray.toString(),
                        devdeep: params[0].axisValue,
                    });
                };
                // console.log(_this.myChartsArray[i].render)

                a.yAxis.triggerEvent = true
                    // console.log(a.yAxis)
                _this.optionArray.push(a);
            }
            // console.log(_this.myChartsArray)
        } catch (error) {
            console.error(error)
        }
    },
    async getMoreData(row) {
        let _this = this;
        _this.echartToolTipsDataDialog = true;
        _this.echartToolTipsDataDialogLoading = true;
        let result = await request({
            url: "job/get_more_data",
            method: "get",
            params: {
                jobId: row.jobid,
                run_times: row.runtimes,
                field_name: row.fieldname,
                dev_deep: row.devdeep
            }
        });
        try {
            for (let i in result.data) {
                for (let j in result.data[i]) {
                    if (j != 'runTimes') {
                        if (typeof result.data[i][j] == 'number') {
                            result.data[i][j] = result.data[i][j].toFixed(2);
                            // console.log(result.data[i][j])
                        }
                    }
                }
                // result.data[i]
            }
            // console.log(result.data)
            _this.echartToolTipsData.data = result.data;
            _this.echartToolTipsData.table = [];
            // _this.echartToolTipsData.fieldName = Object.keys(result.data[0])[1];
            _this.echartToolTipsData.fieldName = row.fieldname;
            _this.echartToolTipsData.devDeep = row.devdeep;
            for (let i in _this.getishowArray) {
                if (_this.echartToolTipsData.fieldName == _this.getishowArray[i].fieldName) {
                    _this.echartToolTipsData.name = `${_this.getishowArray[i].dataName}(${_this.getishowArray[i].dataUnit})`
                }
            }

            let ar = [];
            let aaa = {
                runtimes: 0,
                data: [],
            }
            let bbb = {
                runtimes: 0,
                data: [],
            }
            let ccc = {
                runtimes: 0,
                data: [],
            }
            for (let jj = 0; jj < _this.echartToolTipsData.data.length; jj++) {
                let runtimes = _this.echartToolTipsData.data[0].runTimes;
                if (_this.echartToolTipsData.data[jj].runTimes == runtimes) {
                    aaa.runtimes = _this.echartToolTipsData.data[jj].runTimes;
                    aaa.data.push(_this.echartToolTipsData.data[jj][_this.echartToolTipsData.fieldName]);
                } else if (_this.echartToolTipsData.data[jj].runTimes - 1 == runtimes) {
                    bbb.runtimes = _this.echartToolTipsData.data[jj].runTimes;
                    bbb.data.push(_this.echartToolTipsData.data[jj][_this.echartToolTipsData.fieldName]);
                } else if (_this.echartToolTipsData.data[jj].runTimes - 2 == runtimes) {
                    ccc.runtimes = _this.echartToolTipsData.data[jj].runTimes;
                    ccc.data.push(_this.echartToolTipsData.data[jj][_this.echartToolTipsData.fieldName]);
                }
            }
            _this.echartToolTipsData.table.push(aaa);
            _this.echartToolTipsData.table.push(bbb);
            _this.echartToolTipsData.table.push(ccc);
            // console.log(_this.echartToolTipsData);
            _this.echartToolTipsDataDialogLoading = false;
        } catch (er) {
            console.error(er);
            _this.echartToolTipsDataDialogLoading = false;
        }
    },
    async exportFile(jobid) {
        let _this = this;
        let result = await request({
            url: "job/get_export_file",
            method: "get",
            params: {
                jobId: jobid
            }
        });
        try {
            if (result.data[0].filePrepare == 1) {
                window.location.href = _this.baseURL + `/api/job/download?file_name=export_file/` + result.data[0].downloadFile
                window.clearInterval(_this.si)
            } else {
                if (_this.exportTimes == 15) {
                    window.clearInterval(_this.si);
                    _this.exportTimes = 0;
                    alert('数据下载失败，请使用专用软件重新获取数据文件')
                }
            }
        } catch (error) {
            console.error(error);
            window.clearInterval(_this.si)
        }
    },
}