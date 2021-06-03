<template>
    <div id="apparatus">
        <p class="page-title">
            <span class="tool-box" v-show="pageSize == true">
                <!-- <el-popover placement="left" width="480" trigger="hover">
                    <span class="contrlbtns">
                        <el-button type='success' @click="resetEcharts" size="mini">重置视图</el-button>
                        <el-button type='primary' size="mini" @click="changeEchartsDataZoom(0)">减少显示数据</el-button>
                        <span class="contrlbtnsinput">当前总共显示{{echartsDataZoom}}秒数据</span>
                        <el-button type='primary' @click="changeEchartsDataZoom(1)" size="mini">增加显示数据</el-button>
                    </span>
                    <i title="更多操作" slot="reference" class="el-icon-warning refreshbtn"></i>
                </el-popover> -->
                <!-- <el-button type='success' @click="resetEcharts" size="mini">重置视图</el-button> -->
                <!-- <el-button type='primary' size="mini" @click="changeEchartsDataZoom(0)">减少显示数据</el-button>
                <span class="contrlbtnsinput">当前总共显示{{echartsDataZoom}}秒数据</span>
                <el-button type='primary' @click="changeEchartsDataZoom(1)" size="mini">增加显示数据</el-button> -->
                <!-- <span class="legend-item" v-for="(item , $index) in legendArray" :key="$index">
                    <span class="legend-point" :style="{'background':item.color}" @click="showLine(item.id)">
                        <span :style="{'background':item.color}" class="legend-point-line"></span>
                    </span>
                    <span class="legend-title" @click="showYAxisAndWeightLine(item)">{{item.name}}</span>
                </span> -->
            </span>
            <span class="close-btn" style="right:20px" @click="handleSize('apparatus')" title="放大/缩小"><i :class="iconName"></i></span>
            <span class="close-btn" @click="closeItem('apparatus')"><i class="el-icon-circle-close"></i></span>
        </p>
        <div class="apparatus-content">
            <div class="bigScreen" v-show="pageSize == true">
                <!-- <div id="myChart" :style="{ width: '85%', height: '500px',zIndex:'9',display:'none' }"></div> -->
                <div id="myChartGL" :style="{ width: '85%', height: '500px',zIndex:'9' }"></div>
                <div class="apparatus-from-content">
                    <div class="apparatus-from-content-1">
                        <div class="top-input">
                            <div class="form-label-top">
                                <p>数据时间</p>
                                <span class="form-label-res">
                                    {{form.getDataTime}}
                                </span>
                            </div>
                        </div>
                        <div class="from-content">
                            <div class="form-label" v-for="(item, $index) in formArray" :key="$index" :label="item.dataName + '(' + item.dataUnit + ')'">
                                <p>{{item.dataName}} <span v-if="item.dataUnit!= null">({{item.dataUnit}})</span></p>
                                <span class="form-label-res">
                                    {{item.vals | formatterDecimals}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="pageSize == false" class="smellScreen">
                <div class="top-input-1">
                    <div class="form-label">
                        <p>数据时间</p>
                        <span class="form-label-res" style="max-width: 200px;">
                            {{form.getDataTime}}
                        </span>
                    </div>
                </div>
                <div class="grid-content">
                    <div style="width:100%;height:84px"></div>
                    <div class="form-label" v-for="(item, $index) in formArray" :key="$index" :label="item.dataName + '(' + item.dataUnit + ')'">
                        <p>{{item.dataName}} <span v-if="item.dataUnit!= null">({{item.dataUnit}})</span></p>
                        <span class="form-label-res">
                            {{item.vals | formatterDecimals}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
    name: 'apparatus',
    data() {
        return {
            setInterval: null,
            settimeouts: null,
            thisTimes: '',
            limit: 1,
            iconName: 'el-icon-right',
            colorArray: ['#0000FF', '#DC143C', '#800080', '#5F9EA0', '#FF8C00', '#48D1CC', '#696969', '#006400', '#8B4513', '#FFD700'],
            legendArray: [],
            form: {
                getDataTime: '0',
            },
            myChartGL: "",
            optionGL: {
                legend: {
                    show: false,
                    orient: 'vertical',
                    right: 20,
                    icon: 'roundRect',
                    textStyle: {
                        color: '#000'
                    }
                },
                grid3D: {
                    boxWidth: 240,
                    boxHeight: 100,
                    boxDepth: 100,
                    viewControl: {
                        projection: 'perspective',
                        distance: 200,
                        damping: 0,
                        alpha: 15,
                        beta: 8
                    },
                    top: 0,
                    axisTick: {
                        show: false,
                    }
                },
                backgroundColor: '#fff',
                visualMap: {
                    show: false,
                    dimension: 2,
                    min: 0,
                    max: 30,
                    inRange: {
                        color: ['#0000FF', '#DC143C', '#800080', '#5F9EA0', '#FF8C00', '#48D1CC', '#696969', '#006400', '#8B4513', '#FFD700']
                    }
                },
                xAxis3D: {
                    type: 'category',
                    name: '',
                    data: [],
                    axisLabel: {
                        show: false,
                        interval: 0  //使x轴都显示
                    },
                    splitLine: {
                        show: true,
                        interval: 10
                    }
                },
                yAxis3D: {
                    type: 'category',
                    name: '',
                    data: [],
                    axisLabel: {
                        show: true,
                        interval: 0   //使y轴都显示
                    }
                },
                zAxis3D: {
                    type: 'value',
                    name: ''
                },
                series: []
            },
            globelNum: 0,
            formArray: [],
            formArrayGL: [],
            chartsArray: [],
            chartsArrayGL: [],
            isEnter: false,
            echartsDataZoom: 100,
            clearEchartsInterval: null,
            count: 0,
            optionGLSeriesData: [],
            nowDeep: 0,
            // devDeep: this.$devDeep
        }
    },
    computed: {

    },
    created() {
        this.echartsDataZoom = Number(localStorage.getItem('echartsDataZoom'))
        if (isNaN(this.echartsDataZoom)) {
            this.echartsDataZoom = 300
        }
        if (this.echartsDataZoom < 100) {
            this.echartsDataZoom = 100
        }
        if (this.echartsDataZoom > 3000) {
            this.echartsDataZoom = 3000
        }
    },
    beforeMount() {
    },
    mounted() {
        // console.log(this.devDeep)
        this.getishow()
        this.getMissionDeep()
        document.getElementsByClassName('apparatus-from-content')[0].style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        document.getElementsByClassName('grid-content')[0].style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        document.getElementById('myChartGL').style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        let _this = this;
        window.onresize = function () {
            _this.myChartGL.resize()
        }
        this.getDataSec();
        this.clearEcharts();
    },
    filters: {
        formatterDecimals(val) {
            if (val == null) {
                return 0
            } else if (val == 0) {
                return 0
            } else if (typeof val == 'string') {
                return val
            } else {
                return val.toFixed(4)
            }
        }
    },
    props: {
        pageSize: Boolean,
    },
    watch: {
        pageSize(newVal, oldVal) {
            console.log(oldVal)
            if (newVal == false) {
                this.iconName = 'el-icon-back'
            } else {
                this.iconName = 'el-icon-right'
            }
        },
        // devDeep(newVal, oldVal) {
        //     console.log(newVal, oldVal)
        // }
    },
    methods: {
        /**
         * @description:获取ishow  初始化Echarts的option的yAxis与series 
         * @param {*}
         * @return {*}
         */
        async getishow() {
            let _this = this;
            let result = await request({
                url: "sys-define/get_ishow_define",
                method: "get"
            });
            try {
                _this.formArray = JSON.parse(JSON.stringify(result.data));
                _this.formArrayGL = JSON.parse(JSON.stringify(result.data));
                if (_this.formArrayGL.length > 0) {
                    for (let i in _this.formArrayGL) {
                        if (_this.formArrayGL[i].showInChart == 1) {
                            _this.chartsArrayGL.push(_this.formArrayGL[i])
                        }
                    }
                    for (let i in _this.chartsArrayGL) {
                        _this.chartsArrayGL[i].min = 0;
                        _this.chartsArrayGL[i].max = 0;
                        _this.optionGL.yAxis3D.data.push({
                            id: _this.chartsArrayGL[i].serialNo,
                            value: _this.chartsArrayGL[i].dataName,
                            position: 'left',
                            type: 'value',
                            show: i == 0 ? true : false,
                            valueEn: _this.chartsArrayGL[i].fieldName,
                            min: _this.chartsArrayGL[i].lowerLimit == null ? 'dataMin' : _this.chartsArrayGL[i].lowerLimit,
                            max: _this.chartsArrayGL[i].upperLimit == null ? 'dataMax' : _this.chartsArrayGL[i].upperLimit,
                        })
                        _this.optionGL.series.push({
                            type: 'line3D',
                            name: _this.chartsArrayGL[i].dataName,
                            filed: _this.chartsArrayGL[i].fieldName,
                            lineStyle: {
                                // width: 8,
                            },
                            min: _this.chartsArrayGL[i].lowerLimit == null ? 0 : _this.chartsArrayGL[i].lowerLimit,
                            max: _this.chartsArrayGL[i].upperLimit == null ? 0 : _this.chartsArrayGL[i].upperLimit,
                            data: []    //每个区的数据一一对应
                        });
                        _this.optionGL.series.push({
                            type: 'scatter3D',
                            name: _this.chartsArrayGL[i].dataName,
                            filed: _this.chartsArrayGL[i].fieldName,
                            symbol: 'circle',
                            symbolSize: 5,
                            itemStyle: {
                                opacity: 1,
                            },
                            min: _this.chartsArrayGL[i].lowerLimit == null ? 0 : _this.chartsArrayGL[i].lowerLimit,
                            max: _this.chartsArrayGL[i].upperLimit == null ? 0 : _this.chartsArrayGL[i].upperLimit,
                            label: {  //当type为scatter3D时有label出现
                                show: false,
                                position: 'bottom',
                                distance: 0,
                                // textStyle: {
                                //     fontSize: 12,
                                //     borderWidth: 0,
                                //     backgroundColor: 'transparent'
                                // }
                            },
                            data: []    //每个区的数据一一对应
                        });
                        let ar = [];
                        // ar.push(null);
                        // ar.push(_this.chartsArrayGL[i].dataName);
                        // ar.push(0)
                        _this.optionGLSeriesData.push(ar)
                    }
                    console.log(_this.optionGL);
                    console.log(_this.optionGLSeriesData)
                    console.log(_this.chartsArrayGL);
                    _this.drawLine()
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * @description: 初始化Echarts，监听父容器大小自适应宽度、高度
         * @param {*}
         * @return {*}
         */
        drawLine() {
            let _this = this;
            this.myChartGL = this.$echarts.getInstanceByDom(document.getElementById("myChartGL"));
            if (this.myChartGL === undefined) {
                this.myChartGL = this.$echarts.init(document.getElementById("myChartGL"));
            }
            this.myChartGL.setOption(this.optionGL, true);

            let elementResizeDetectorMaker = require("element-resize-detector");//引入监听dom变化的组件
            let erd = elementResizeDetectorMaker();
            let worldMapContainer = document.getElementById('apparatus');
            erd.listenTo(worldMapContainer, function (element) {  //执行监听 
                _this.$nextTick(function () {
                    document.getElementById("myChartGL").style.width = element.offsetWidth + 'px';
                    _this.myChartGL.resize(); //变化重新渲染饼图
                })
            });
            let apparatusContent = document.getElementsByClassName('apparatus-content')[0];
            /**
             * 监听任务内容框是否缩小
             * */
            erd.listenTo(apparatusContent, function (element) {  //执行监听 
                _this.$nextTick(function () {
                    document.getElementsByClassName('apparatus-from-content')[0].style.height = element.clientHeight + 'px';
                    document.getElementsByClassName('grid-content')[0].style.height = element.clientHeight + 'px';
                    document.getElementById('myChartGL').style.height = element.clientHeight + 'px';
                    document.getElementById("myChartGL").style.width = element.offsetWidth + 'px';
                    _this.myChartGL.resize(); //变化重新渲染饼图
                })
            });
        },
        /**
         * @description: 定时器
         * @param {*}
         * @return {*}
         */
        getDataSec() {
            let _this = this;
            window.clearInterval(_this.setInterval);
            _this.setInterval = setInterval(() => {
                _this.getApparatusData({
                    thisTimes: _this.thisTimes,
                    limit: _this.limit
                })
            }, 1000)
        },
        /**
         * @description: 获取Echarts数据
         * @param {*}
         * @return {*}
         */
        async getApparatusData(row) {
            let _this = this;
            let result = await request({
                url: "realtime",
                method: "get",
                params: {
                    start_time: row.thisTimes,
                    limit: row.limit,
                }
            });
            try {
                /**
                 * 初始化Echarts  X轴
                */
                if (result.data.length > 0) {
                    let resultUseCharts = JSON.parse(JSON.stringify(result));
                    // console.log(_this.optionGLSeriesData)
                    // console.log(resultUseCharts)
                    for (let kk in resultUseCharts.data) {
                        for (let i in resultUseCharts.data[kk]) {
                            if (typeof resultUseCharts.data[kk][i] == 'number') {
                                resultUseCharts.data[kk][i] = resultUseCharts.data[kk][i] == null ? 0 : Number(resultUseCharts.data[kk][i].toFixed(2))
                            }
                        }
                    }
                    if (_this.globelNum == 0) {
                        _this.renderEcharts(resultUseCharts, true)
                    } else {
                        _this.renderEcharts(resultUseCharts, false)
                    }
                    _this.globelNum += 1;
                    // 获取时间
                    _this.form = {
                        getDataTime: result.data[0].timeTag,
                    };
                    _this.thisTimes = result.data[0].timeTag;

                    let resultdata = result.data[0]
                    // input框赋值
                    for (let i in _this.formArray) {
                        for (let j in resultdata) {
                            if (_this.formArray[i].fieldName == j) {
                                _this.formArray[i].vals = resultdata[j];
                            }
                        }
                    }
                    _this.limit = '';
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * @description: 动态更新Echarts的option
         * @param {*} result
         * @param {*} isFirst
         * @return {*}
         */
        renderEcharts(result, isFirst) {
            let _this = this;
            if (!_this.myChartGL) {
                return
            }
            let optionsGL = _this.myChartGL.getOption();
            let useRollData = result.data;
            if (useRollData.length > 1) {
                useRollData.reverse();
            }
            // console.log(optionsGL)
            for (let kk in useRollData) {
                // 初始化 X 轴数量
                if (isFirst == true) {
                    for (let i = 0; i < _this.echartsDataZoom; i++) {
                        optionsGL.xAxis3D[0].data.push(_this.formatterTimes(useRollData[kk].timeTag, i))
                    }
                }
                if (optionsGL.xAxis3D[0].data.indexOf(useRollData[kk].timeTag) == -1) {
                    optionsGL.xAxis3D[0].data.push(useRollData[kk].timeTag)
                }
                let line3DData = [];
                let resultdata = useRollData[kk];
                for (let iiii in optionsGL.series) {
                    if (optionsGL.series[iiii].type == 'line3D') {
                        line3DData.push(optionsGL.series[iiii])
                    }
                }
                for (let iii in line3DData) {
                    let ar = [];
                    ar.push(resultdata.timeTag);
                    ar.push(line3DData[iii].name);
                    for (let j in resultdata) {
                        if (j == line3DData[iii].filed) {
                            ar.push(resultdata[j]);
                        }
                    }
                    _this.optionGLSeriesData[iii].push(ar)
                }
                // console.log(optionsGL.series)
                for (let ii in optionsGL.series) {
                    for (let jj = 0; jj < _this.optionGLSeriesData.length; jj++) {
                        if (optionsGL.series[ii].name == _this.optionGLSeriesData[jj][0][1]) {
                            // console.log(optionsGL.series[ii].min)
                            // console.log(optionsGL.series[ii].max)
                            // return
                            if (optionsGL.series[ii].max == 0) {
                                optionsGL.series[ii].max = _this.nowDeep
                            }
                            let oldmin, oldmax, oldresult, newmax, newresult;
                            oldmin = optionsGL.series[ii].min;
                            oldmax = optionsGL.series[ii].max;
                            oldresult = Math.round(_this.optionGLSeriesData[jj][0][2] - optionsGL.series[ii].min);
                            // newmin = 0;
                            newmax = oldmax - oldmin;
                            newresult = Math.round(oldresult / newmax * 100)

                            // let newresult = Math.round((_this.optionGLSeriesData[jj][0][2] - optionsGL.series[ii].min) / (optionsGL.series[ii].max - optionsGL.series[ii].min) * 100);
                            console.log(newresult)
                            debugger
                            _this.optionGLSeriesData[jj][0][2] = newresult
                            optionsGL.series[ii].data = _this.optionGLSeriesData[jj]
                        }
                    }

                }
                /**
                 *  固定X轴数量与series的数量
                */
                if (optionsGL.xAxis3D[0].data.length > _this.echartsDataZoom) {
                    optionsGL.xAxis3D[0].data.splice(0, (optionsGL.xAxis3D[0].data.length - _this.echartsDataZoom));
                }
                for (let i = 0; i < optionsGL.series.length; i++) {
                    if (optionsGL.series[i].data.length > _this.echartsDataZoom) {
                        optionsGL.series[i].data.splice(0, (optionsGL.series[i].data.length - _this.echartsDataZoom));
                    }
                }
            }
            _this.myChartGL.setOption(optionsGL);

        },
        /**
         * @description: 获取任务投放深度
         * @param {*}
         * @return {*}
         */
        async getMissionDeep() {
            let _this = this;
            let result = await request({
                url: "/job/get_current_job",
                method: "get"
            });
            // console.log(result, "result");
            try {
                // console.log(result);
                // _this.nowDeep = 0;
                if (result.data.length > 0) {
                    _this.nowDeep = result.data[0].setDeep
                } else {
                    _this.nowDeep = 100;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description:关闭当前组件窗口 
         * @param {*} ele
         * @return {*}
         */
        closeItem(ele) {
            this.$emit('sendEleName', ele);
        },
        /**
         * @description: 放大缩小当前组件窗口
         * @param {*} ele
         * @return {*}
         */
        handleSize(ele) {
            if (this.pageSize == true) {
                this.pageSize = false;
            } else {
                this.pageSize = true;
            }
            this.$emit('contrlEleName', {
                ele: ele,
                switch: this.pageSize
            });
        },
        /**
         * @description: 清理Echarts
         * @param {*}
         * @return {*}
         */
        clearEcharts() {
            let _this = this;
            window.clearInterval(_this.clearEchartsInterval)
            _this.clearEchartsInterval = setInterval(() => {
                let a = this.myChartGL.getOption();
                _this.myChartGL.clear();
                _this.myChartGL.setOption(a);
                a = null;
            }, 1000 * 60 * 15)
        },
        /**
         * @description: 格式化时间+1s
         * @param {*} time
         * @param {*} sum
         * @return {*}
         */
        formatterTimes(time, sum) {
            let date = time;
            if (!date) {
                return
            }
            date = date.substring(0, 19);
            date = date.replace(/-/g, '/');
            let timestamp = new Date(date).getTime();
            if (sum == 0) {
                timestamp;
            } else {
                timestamp = timestamp += (sum * 1000);
            }
            var d = new Date(timestamp);
            var dates = (d.getFullYear()) + "-" +
                (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + "-" +
                (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + " " +
                (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" +
                (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" +
                (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
            return dates
        },
        /**
         * @description: 改变Echarts的zoom值
         * @param {*} type
         * @return {*}
         */
        changeEchartsDataZoom(type) {
            // let _this = this;
            // if (type == 1) {
            //     this.echartsDataZoom += 100
            //     if (this.echartsDataZoom > 3000) {
            //         this.echartsDataZoom = 3000
            //     }
            // } else {
            //     this.echartsDataZoom -= 100
            //     if (this.echartsDataZoom < 100) {
            //         this.echartsDataZoom = 100
            //     }
            // }
            // let a = _this.myChart.getOption();
            // let t = a.xAxis[0].data[a.xAxis[0].data.length - 1];
            // let l = a.xAxis[0].data.length;
            // if (a.xAxis[0].data.length < this.echartsDataZoom) {
            //     for (let i = 0; i < _this.echartsDataZoom - l; i++) {
            //         a.xAxis[0].data.push(_this.formatterTimes(t, i))
            //     }
            // }
            // _this.myChart.setOption(a);
        },
        /**
         * @description: 重置图表配置
         * @param {*}
         * @return {*}
         */
        // resetEcharts() {
        //     let _this = this;
        //     let options = _this.myChart.getOption();
        //     for (let i in options.yAxis) {
        //         options.yAxis[i].show = false;
        //     }
        //     for (let i in options.series) {
        //         options.series[i].lineStyle.width = 2;
        //     }
        //     options.yAxis[0].show = true;
        //     options.dataZoom[0].start = 0;
        //     options.dataZoom[0].end = 100;
        //     _this.myChart.setOption(options);
        // },
        /**
         * @description: 点击legend  文字显示Y轴与线条加粗
         * @param {*}
         * @return {*}
         */
        // showYAxisAndWeightLine(row) {
        //     let _this = this;
        //     // return
        //     let options = _this.myChart.getOption();
        //     for (let i in options.yAxis) {
        //         options.yAxis[i].show = false;
        //         if (options.yAxis[i].id == row.id) {
        //             if (row.sameAs == null) {
        //                 options.yAxis[i].show = true;
        //                 if (options.series[i].lineStyle.width == 2) {
        //                     options.series[i].lineStyle.width = 4
        //                 } else {
        //                     options.series[i].lineStyle.width = 2
        //                 }
        //             } else {
        //                 for (let k in options.yAxis) {
        //                     if (options.yAxis[k].id == row.sameAs) {
        //                         options.yAxis[k].show = true;
        //                         if (options.series[i].lineStyle.width == 4) {
        //                             options.series[i].lineStyle.width = 2
        //                         } else {
        //                             options.series[i].lineStyle.width = 4
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     _this.myChart.setOption(options);
        // },
        /**
         * @description: 点击圆点显示折线
         * @param {*}
         * @return {*}
         */
        // showLine(row) {
        //     let _this = this
        //     let options = _this.myChart.getOption()
        //     for (let i in options.yAxis) {
        //         if (options.series[i].id == row) {
        //             if (options.series[i].lineStyle.width == 0) {
        //                 options.series[i].lineStyle.width = 2;
        //             } else {
        //                 options.series[i].lineStyle.width = 0;
        //             }
        //         }
        //     }
        //     _this.myChart.setOption(options);
        // },

    }
}
</script>

<style scoped>
.apparatus-content {
    height: 94%;
}

.bigScreen {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
}
.smellScreen {
    height: 100%;
    position: relative;
    overflow-x: auto;
}
.smellScreen::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.from-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 96px;
    z-index: 99;
}
.apparatus-from-content {
    height: 100%;
    overflow: hidden;
    width: 15%;
    border-left: 1px solid #eee;
    position: relative;
}
.apparatus-from-content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.apparatus-from-content-1 {
    height: 100%;
    overflow: auto;
    width: 100%;
    border-left: 1px solid #eee;
}
.apparatus-from-content-1::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}

.page-title {
    height: 32px;
    position: relative;
    margin: 5px 10px;
    line-height: 32px;
    border-bottom: 1px solid #eee;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1999;
    padding-bottom: 5px;
}
.page-title .page-title-span {
    font-size: 16px;
    color: #409eff;
}
.page-title .close-btn {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    color: #303133;
}
.page-title .close-btn:hover {
    color: #5cb6ff;
}
.grid-content {
    padding: 0 20px;
    z-index: 99;
    position: relative;
}
.grid-content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.from-content-1 {
    margin-top: 85px;
}
.from-content-1 .el-form-item {
    margin-bottom: 6px;
}
.myChart {
    border-right: 1px solid #ccc;
}
.top-input {
    cursor: default;
    margin-bottom: 18px;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
}
.top-input p {
    font-size: 14px;
    color: #303133;
    line-height: 40px;
    box-sizing: border-box;
    font-weight: 600;
    margin: 0;
}
.top-input-1 {
    width: 100%;
    cursor: default;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 100;
    padding: 0 20px;
}
.top-input-1 p {
    font-size: 14px;
    color: #303133;
    line-height: 40px;
    box-sizing: border-box;
    font-weight: 600;
    margin: 0;
}
.legend-item {
    display: inline-block;
    padding: 0 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.legend-item .legend-point {
    display: inline-block;
    height: 12px;
    width: 12px;
    background: #ccc;
    border-radius: 50%;
    position: relative;
    margin: 0 5px 0 5px;
    vertical-align: middle;
    cursor: pointer;
}
.legend-point-line {
    display: inline-block;
    position: absolute;
    width: 24px;
    height: 1px;
    top: 6px;
    left: -6px;
    background: #ccc;
}
.legend-item .legend-title {
    font-size: 12px;
    display: inline-block;
    padding: 0 3px;
    line-height: 24px;
    cursor: pointer;
}

.form-label {
    width: 100%;
    cursor: default;
    margin: 10px 0;
}
.form-label p {
    margin: 0;
    color: #303133;
    font-size: 14px;
    font-weight: 600;
}
.form-label .form-label-res {
    display: inline-block;
    border: 1px solid #dcdfe6;
    color: #606266;
    font-size: 14px;
    padding: 4px 3px;
    border-radius: 4px;
    width: 100%;
    max-width: 200px;
    text-indent: 3px;
    white-space: nowrap;
}
.form-label-top {
    cursor: default;
    margin: 10px 0;
    padding: 0 20px;
}
.form-label-top p {
    margin: 0;
    color: #303133;
    font-size: 14px;
    font-weight: 600;
}
.form-label-top .form-label-res {
    display: inline-block;
    border: 1px solid #dcdfe6;
    color: #606266;
    font-size: 14px;
    padding: 4px 3px;
    border-radius: 4px;
    width: 100%;
    text-indent: 3px;
}
.contrlbtns {
    display: inline-block;
    margin-left: 20px;
    z-index: 999;
}
.contrlbtns .contrlbtnsinput {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
    text-align: center;
    font-size: 12px;
}
.refreshbtn {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
}
.tool-box {
    display: inline-block;
    margin-left: 20px;
}
</style>