<template>
    <div id="apparatus">
        <p class="page-title">
            <span>仪器数据显示</span>
            <span class="close-btn" style="right:20px" @click="handleSize('apparatus')" title="放大/缩小"><i :class="iconName"></i></span>
            <span class="close-btn" @click="closeItem('apparatus')"><i class="el-icon-circle-close"></i></span>
        </p>
        <div class="apparatus-content">
            <div v-show="pageSize == true">
                <div class="apparatus-from-content">
                    <el-form ref="form" :model="form" label-width="80px" size="mini" class="from-content" inline :label-position="labelPosition">
                        <el-form-item label="数据时间">
                            <el-input disabled v-model="form.getDataTime" style="width:140px"></el-input>
                        </el-form-item>
                        <el-form-item label="仪器下降速度(m/s)">
                            <el-input disabled v-model="form.instrumentDownSpeed" style="width:130px"></el-input>
                        </el-form-item>
                        <el-form-item label="仪器深度(m)">
                            <el-input disabled v-model="form.instrumentDepth"></el-input>
                        </el-form-item>
                        <el-form-item label="温度(℃)">
                            <el-input disabled v-model="form.temperature"></el-input>
                        </el-form-item>
                        <el-form-item label="电导率(S/m)">
                            <el-input disabled v-model="form.electricConductivity"></el-input>
                        </el-form-item>
                        <el-form-item label="压力(bar)">
                            <el-input disabled v-model="form.pressure"></el-input>
                        </el-form-item>
                        <el-form-item label="盐度(psu)">
                            <el-input disabled v-model="form.salinity"></el-input>
                        </el-form-item>
                        <el-form-item label="声速(m/s)">
                            <el-input disabled v-model="form.soundVelocity"></el-input>
                        </el-form-item>
                        <el-form-item label="PH()">
                            <el-input disabled v-model="form.ph"></el-input>
                        </el-form-item>
                        <el-form-item label="浊度(ug/l)">
                            <el-input disabled v-model="form.turbidity"></el-input>
                        </el-form-item>
                        <el-form-item label="叶绿素(ug/l)">
                            <el-input disabled v-model="form.chlorophyll"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="myChart" :style="{ width: '100%', height: '450px' }"></div>
                <div class="apparatus-from-content-btm">
                    <el-form ref="form" :model="formdown" size="mini" class="from-content" inline>
                        <el-form-item label="当前海深(米)">
                            <el-input disabled v-model="formdown.oceanDeep" style="width:80px"></el-input>
                        </el-form-item>
                        <el-form-item label="经度">
                            <el-input disabled v-model="formdown.longitude" style="width:120px"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-input disabled v-model="formdown.latitude" style="width:120px"></el-input>
                        </el-form-item>
                        <el-form-item label="航速(节)">
                            <el-input disabled v-model="formdown.speed" style="width:100px"></el-input>
                        </el-form-item>
                        <el-form-item label="数据保存位置">
                            <el-input disabled v-model="formdown.dataFileAddress" style="width:250px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div v-show="pageSize == false">
                <div class="grid-content">
                    <el-form ref="form" :model="form" label-width="80px" size="mini" class="from-content-1" :label-position="labelPosition">
                        <el-form-item label="数据时间">
                            <el-input disabled v-model="form.getDataTime"></el-input>
                        </el-form-item>
                        <el-form-item label="仪器下降速度(m/s)">
                            <el-input disabled v-model="form.instrumentDownSpeed"></el-input>
                        </el-form-item>
                        <el-form-item label="仪器深度(m)">
                            <el-input disabled v-model="form.instrumentDepth"></el-input>
                        </el-form-item>
                        <el-form-item label="温度(℃)">
                            <el-input disabled v-model="form.temperature"></el-input>
                        </el-form-item>
                        <el-form-item label="电导率(S/m)">
                            <el-input disabled v-model="form.electricConductivity"></el-input>
                        </el-form-item>
                        <el-form-item label="压力(bar)">
                            <el-input disabled v-model="form.pressure"></el-input>
                        </el-form-item>
                        <el-form-item label="盐度(psu)">
                            <el-input disabled v-model="form.salinity"></el-input>
                        </el-form-item>
                        <el-form-item label="声速(m/s)">
                            <el-input disabled v-model="form.soundVelocity"></el-input>
                        </el-form-item>
                        <el-form-item label="PH()">
                            <el-input disabled v-model="form.ph"></el-input>
                        </el-form-item>
                        <el-form-item label="浊度(ug/l)">
                            <el-input disabled v-model="form.turbidity"></el-input>
                        </el-form-item>
                        <el-form-item label="叶绿素(ug/l)">
                            <el-input disabled v-model="form.chlorophyll"></el-input>
                        </el-form-item>
                        <el-form-item label="当前海深(米)">
                            <el-input disabled v-model="formdown.oceanDeep"></el-input>
                        </el-form-item>
                        <el-form-item label="经度">
                            <el-input disabled v-model="formdown.longitude"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-input disabled v-model="formdown.latitude"></el-input>
                        </el-form-item>
                        <el-form-item label="航速(节)">
                            <el-input disabled v-model="formdown.speed"></el-input>
                        </el-form-item>
                        <el-form-item label="数据保存位置">
                            <el-input disabled v-model="formdown.dataFileAddress"></el-input>
                        </el-form-item>
                    </el-form>
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
            thisTimes: '',
            limit: 1,
            iconName: 'el-icon-right',
            labelPosition: "top",
            labelPosition1: "left",
            form: {
                getDataTime: '2020-09-10 15:13:45',
                instrumentDownSpeed: '-27.16286',
                instrumentDepth: '90.92881',
                temperature: '18.769869',
                electricConductivity: '0.01287323',
                pressure: '60.93201',
                salinity: '9.082812',
                soundVelocity: '1233.870',
                ph: '1.81818273',
                turbidity: '0.62736273',
                chlorophyll: '0.0000002736',
            },
            formdown: {
                oceanDeep: '221.2389212',
                longitude: '29.239102',
                latitude: '213.23182',
                speed: '0',
                dataFileAddress: `D:/Datas`,
            },
            myChart: "",
            option: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                color: ['#DC143C', '#800080', '#0000FF', '#5F9EA0', '#48D1CC', '#00FF7F', '#006400', '#FFFF00', '#FFD700', '#FF8C00'],
                legend: {
                    data: ['深度(米)', '当前海深(米)', '温度(℃)', '导电率(S/m)', '压力(bar)', '盐度(psu)', '声速(m/s)', 'PH()', '浊度(ug/l)', '叶绿素(ug/l)']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: false
                },
                dataZoom: [{
                    type: 'inside',
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                },
                yAxis: [{
                    // name: '深度',
                    position: 'left',
                    type: 'value',
                    show: true,
                    inverse: true,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    },

                }, {
                    // name: '温度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '导电率',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '压力',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '盐度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '声速',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: 'PH',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '浊度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }, {
                    // name: '叶绿素',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        formatter() {
                            return ""
                        }
                    }
                }],
                series: [
                    {
                        name: '深度(米)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '当前海深(米)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '温度(℃)',
                        type: 'line',
                        yAxisIndex: 1,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '导电率(S/m)',
                        type: 'line',
                        yAxisIndex: 2,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '压力(bar)',
                        type: 'line',
                        yAxisIndex: 3,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '盐度(psu)',
                        type: 'line',
                        yAxisIndex: 4,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '声速(m/s)',
                        type: 'line',
                        yAxisIndex: 5,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: 'PH()',
                        type: 'line',
                        yAxisIndex: 6,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '浊度(ug/l)',
                        type: 'line',
                        yAxisIndex: 7,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        name: '叶绿素(ug/l)',
                        type: 'line',
                        yAxisIndex: 8,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    }
                ]
            }
        }
    },
    mounted() {
        this.drawLine();
        let _this = this;
        window.onresize = function () {
            _this.myChart.resize()
        }
        this.getDataSec();
    },
    props: {
        pageSize: Boolean,
    },
    watch: {
        pageSize(newVal, oldVal) {
            console.log('apparatus' + newVal);
            if (newVal == false) {
                this.iconName = 'el-icon-back'
            } else {
                this.iconName = 'el-icon-right'
            }
        }
    },
    methods: {
        /**
         * 初始化Echarts，监听父容器大小自适应宽度、高度
        */
        drawLine() {
            let _this = this;
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.myChart.setOption(this.option, true);
            let elementResizeDetectorMaker = require("element-resize-detector");//引入监听dom变化的组件
            let erd = elementResizeDetectorMaker();
            let worldMapContainer = document.getElementById('apparatus');
            erd.listenTo(worldMapContainer, function (element) {  //执行监听 
                _this.$nextTick(function () {
                    document.getElementById("myChart").style.width = element.offsetWidth
                    _this.myChart.resize(); //变化重新渲染饼图
                })
            });
        },
        /**
         * 定时器
        */
        getDataSec() {
            let _this = this
            _this.setInterval = setInterval(() => {
                _this.getApparatusData({
                    thisTimes: _this.thisTimes,
                    limit: _this.limit
                })
            }, 1000)
        },
        /**
         * 关闭当前组件窗口
        */
        closeItem(ele) {
            this.$emit('sendEleName', ele);
        },
        /**
         * 放大缩小当前组件窗口
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
         * 动态更新Echarts的option
        */
        renderEcharts(result) {
            let _this = this;
            if (!_this.myChart) {
                return
            }
            let options = _this.myChart.getOption();
            options.xAxis[0].data.push(result.data[0].timeTag);
            options.yAxis[0].max = result.data[0].oceanDeep + (result.data[0].oceanDeep * 0.2)
            options.series[0].data.push(result.data[0].devDeep) // 深度
            options.series[1].data.push(result.data[0].oceanDeep) // 当前海深
            options.series[2].data.push(result.data[0].dataTemp) // 温度
            options.series[3].data.push(result.data[0].dataConv) // 导电率
            options.series[4].data.push(result.data[0].dataP) // 压力
            options.series[5].data.push(result.data[0].dataSal) // 盐度
            options.series[6].data.push(result.data[0].dataSV) // 声速
            options.series[7].data.push(result.data[0].dataPH) // Ph
            _this.myChart.setOption(options)
        },
        /**
         * 获取Echarts数据
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
                if (result.data.length == 0) {
                    clearInterval(_this.setInterval);
                    return;
                }
                _this.thisTimes = result.data[0].timeTag;
                // if (_this.option.xAxis.data.length == 0) {
                //     _this.option.xAxis.data.push(0)
                // } else {
                //     _this.option.xAxis.data.push(Number(_this.option.xAxis.data[_this.option.xAxis.data.length - 1]) + 1);
                // }
                // _this.option.xAxis[0].data.push(result.data[0].timeTag);
                // _this.option.yAxis[0].max = result.data[0].oceanDeep + (result.data[0].oceanDeep * 0.2)
                // _this.option.series[0].data.push(result.data[0].devDeep) // 深度
                // _this.option.series[1].data.push(result.data[0].oceanDeep) // 当前海深
                // _this.option.series[2].data.push(result.data[0].dataTemp) // 温度
                // _this.option.series[3].data.push(result.data[0].dataConv) // 导电率
                // _this.option.series[4].data.push(result.data[0].dataP) // 压力
                // _this.option.series[5].data.push(result.data[0].dataSal) // 盐度
                // _this.option.series[6].data.push(result.data[0].dataSV) // 声速
                // _this.option.series[7].data.push(result.data[0].dataPH) // Ph
                // _this.option.series[8].data.push(result.data[0].) // 浊度
                // _this.option.series[9].data.push(result.data[0].) // 叶绿素
                // _this.myChart.setOption(_this.option, true);
                _this.renderEcharts(result)
                _this.form = {
                    getDataTime: result.data[0].timeTag,
                    instrumentDownSpeed: result.data[0].devSpeed,
                    instrumentDepth: result.data[0].devDeep,
                    temperature: result.data[0].dataTemp,
                    electricConductivity: result.data[0].dataConv,
                    pressure: result.data[0].dataP,
                    salinity: result.data[0].dataSal,
                    soundVelocity: result.data[0].dataSV,
                    ph: result.data[0].dataPH,
                    turbidity: '0',
                    chlorophyll: '0',
                };
                _this.formdown = {
                    oceanDeep: result.data[0].oceanDeep,
                    longitude: result.data[0].dataZ,
                    latitude: result.data[0].dataY,
                    speed: result.data[0].shipSpeed,
                    dataFileAddress: `D:/Datas`,
                };

            } catch (error) {
                console.log(error);
            }
        }

        // async getJsonDate(row) {
        //     // console.log(row);
        //     this.loadingPage = true;
        //     let result = await request({
        //         url: "/json/index.json",
        //         method: "get"
        //     });
        //     // console.log(result, "result");
        //     try {
        //         console.log(result);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

    }
}
</script>

<style scoped>
.apparatus-content {
    /* min-width: 1200px; */
}
.apparatus-from-content {
    margin: 8px 0 0 12px;
}
.apparatus-from-content .from-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.apparatus-from-content-btm {
    margin: 10px 0 0 12px;
}
.apparatus-from-content-btm .from-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.page-title {
    font-size: 16px;
    color: #409eff;
    position: relative;
    margin: 5px 10px;
    line-height: 32px;
    border-bottom: 1px solid #eee;
    cursor: default;
}
.page-title .close-btn {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    color: #303133;
}
.grid-content {
    padding-left: 10px;
}
.from-content-1 .el-form-item {
    margin-bottom: 6px;
}
</style>