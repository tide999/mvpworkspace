<template>
    <div id="apparatus">
        <!-- 点击输入框  对应的折线加粗 -->
        <p class="page-title">
            <span class="page-title-span">仪器数据显示</span>
            <span style="display:inline-block;margin-left:20px" v-show="pageSize == true">
                <span class="legend-item" v-for="(item , $index) in legendArray" :key="$index">
                    <span class="legend-point" :style="{'background':item.color}" @click="showLine(item.id)">
                        <span :style="{'background':item.color}" class="legend-point-line"></span>
                    </span>
                    <span class="legend-title" @click="showYAxisAndWeightLine(item.id)">{{item.name}}</span>
                </span>
            </span>

            <span class="close-btn" style="right:20px" @click="handleSize('apparatus')" title="放大/缩小"><i :class="iconName"></i></span>
            <span class="close-btn" @click="closeItem('apparatus')"><i class="el-icon-circle-close"></i></span>
        </p>
        <div class="apparatus-content">
            <div class="bigScreen" v-show="pageSize == true">
                <div id="myChart" :style="{ width: '85%', height: '500px' }"></div>
                <div class="apparatus-from-content">
                    <div class="top-input">
                        <p>数据时间</p>
                        <el-input size="mini" disabled v-model="form.getDataTime"></el-input>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px" size="mini" class="from-content" :label-position="labelPosition">
                        <el-form-item label="仪器下降速度(m/s)">
                            <el-input disabled v-model="form.instrumentDownSpeed"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(1)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="仪器深度(m)">
                            <el-input disabled v-model="form.instrumentDepth"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(0)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="温度(℃)">
                            <el-input disabled v-model="form.temperature"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(2)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="电导率(S/m)">
                            <el-input disabled v-model="form.electricConductivity"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(3)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="压力(bar)">
                            <el-input disabled v-model="form.pressure"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(4)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="盐度(psu)">
                            <el-input disabled v-model="form.salinity"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(5)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="声速(m/s)">
                            <el-input disabled v-model="form.soundVelocity"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(6)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="PH()">
                            <el-input disabled v-model="form.ph"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(7)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="浊度(ug/l)">
                            <el-input disabled v-model="form.turbidity"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(8)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="叶绿素(ug/l)">
                            <el-input disabled v-model="form.chlorophyll"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(9)">查看坐标轴</el-button> -->
                        </el-form-item>

                        <el-form-item label="当前海深(米)">
                            <el-input disabled v-model="form.oceanDeep"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(1)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="经度">
                            <el-input disabled v-model="form.longitude"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(1)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-input disabled v-model="form.latitude"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(1)">查看坐标轴</el-button> -->
                        </el-form-item>
                        <el-form-item label="航速(节)">
                            <el-input disabled v-model="form.speed"></el-input>
                            <!-- <el-button size="mini" style="width:100%" @click="showYAxisAndWeightLine(1)">查看坐标轴</el-button> -->
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div v-show="pageSize == false" class="smellScreen">
                <div class="top-input-1">
                    <p>数据时间</p>
                    <el-input size="mini" disabled v-model="form.getDataTime"></el-input>
                </div>
                <div class="grid-content">
                    <el-form ref="form" :model="form" label-width="80px" size="mini" class="from-content-1" :label-position="labelPosition">
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
                            <el-input disabled v-model="form.oceanDeep"></el-input>
                        </el-form-item>
                        <el-form-item label="经度">
                            <el-input disabled v-model="form.longitude"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-input disabled v-model="form.latitude"></el-input>
                        </el-form-item>
                        <el-form-item label="航速(节)">
                            <el-input disabled v-model="form.speed"></el-input>
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
            legendArray: [{
                color: '#0000FF',
                name: '深度(米)',
                id: 0,
            }, {
                color: '#DC143C',
                name: '当前海深(米)',
                id: 1,
            }, {
                color: '#800080',
                name: '温度(°C)',
                id: 2,
            }, {
                color: '#5F9EA0',
                name: '电导率(S/m)',
                id: 3,
            }, {
                color: '#FF8C00',
                name: '压力(bar)',
                id: 4,
            }, {
                color: '#48D1CC',
                name: '盐度(psu)',
                id: 5,
            }, {
                color: '#00FF7F',
                name: '声速(m/s)',
                id: 6,
            }, {
                color: '#006400',
                name: 'PH()',
                id: 7,
            }, {
                color: '#FFFF00',
                name: '浊度(ug/l)',
                id: 8,
            }, {
                color: '#FFD700',
                name: '叶绿素(ug/l)',
                id: 9,
            }],
            form: {
                getDataTime: '',
                instrumentDownSpeed: '',
                instrumentDepth: '',
                temperature: '',
                electricConductivity: '',
                pressure: '',
                salinity: '',
                soundVelocity: '',
                ph: '',
                turbidity: '',
                chlorophyll: '',
                oceanDeep: '',
                longitude: '',
                latitude: '',
                speed: '',
            },
            myChart: "",
            option: {
                title: {
                    text: ''
                },
                grid: {
                    left: '5%',
                    right: '2%',
                    bottom: '5%',
                    containLabel: false
                },
                tooltip: {
                    trigger: 'axis'
                },
                color: ['#0000FF', '#DC143C', '#800080', '#5F9EA0', '#FF8C00', '#48D1CC', '#00FF7F', '#006400', '#FFFF00', '#FFD700'],
                legend: {
                    show: false,
                    data: ['深度(米)', '当前海深(米)', '温度(℃)', '电导率(S/m)', '压力(bar)', '盐度(psu)', '声速(m/s)', 'PH()', '浊度(ug/l)', '叶绿素(ug/l)'],
                    left: '12%',
                    top: '0%',
                    zlevel: 999,
                },

                dataZoom: [
                    {
                        type: 'inside',
                    },
                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    axisLabel: {
                        show: false
                    }
                },
                yAxis: [{
                    id: 0,
                    name: '深度',
                    position: 'left',
                    type: 'value',
                    show: true,
                    inverse: true,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    nameLocation: 'start'
                }, {
                    id: 1,
                    name: '海深',
                    position: 'left',
                    type: 'value',
                    show: false,
                    inverse: true,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    nameLocation: 'start'
                }, {
                    id: 2,
                    name: '温度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 3,
                    name: '电导率',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 4,
                    name: '压力',
                    position: 'left',
                    type: 'value',
                    show: false,
                    inverse: true,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                    nameLocation: 'start'
                }, {
                    id: 5,
                    name: '盐度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 6,
                    name: '声速',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 7,
                    name: 'PH',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 8,
                    name: '浊度',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }, {
                    id: 9,
                    name: '叶绿素',
                    position: 'left',
                    type: 'value',
                    show: false,
                    axisLine: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: true },
                }],
                series: [
                    {
                        id: 0,
                        name: '深度(米)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 1,
                        name: '当前海深(米)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 2,
                        name: '温度(℃)',
                        type: 'line',
                        yAxisIndex: 2,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 3,
                        name: '电导率(S/m)',
                        type: 'line',
                        yAxisIndex: 3,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 4,
                        name: '压力(bar)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 5,
                        name: '盐度(psu)',
                        type: 'line',
                        yAxisIndex: 5,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 6,
                        name: '声速(m/s)',
                        type: 'line',
                        yAxisIndex: 6,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 7,
                        name: 'PH()',
                        type: 'line',
                        yAxisIndex: 7,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 8,
                        name: '浊度(ug/l)',
                        type: 'line',
                        yAxisIndex: 8,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    },
                    {
                        id: 9,
                        name: '叶绿素(ug/l)',
                        type: 'line',
                        yAxisIndex: 9,
                        symbol: 'none',
                        smooth: true,
                        data: []
                    }
                ]
            },
            globelNum: 0,
        }
    },
    mounted() {
        document.getElementsByClassName('apparatus-from-content')[0].style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        document.getElementsByClassName('grid-content')[0].style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        document.getElementById('myChart').style.height = (document.getElementById('apparatus').clientHeight - 50) + 'px';
        this.drawLine();
        let _this = this;
        window.onresize = function () {
            _this.myChart.resize()
        }
        this.getDataSec();
    },
    filters: {
        formatterDecimals(val) {
            return val.toFixed(4)
        }
    },
    props: {
        pageSize: Boolean,
    },
    watch: {
        pageSize(newVal, oldVal) {
            // console.log('apparatus' + newVal);
            if (newVal == false) {
                this.iconName = 'el-icon-back'
            } else {
                this.iconName = 'el-icon-right'
            }
        }
    },
    methods: {
        showYAxisAndWeightLine(row) {
            let _this = this;
            let options = _this.myChart.getOption()
            for (let i in options.yAxis) {
                options.yAxis[i].show = false;
                if (row == 4 || row == 1) {
                    options.yAxis[0].show = true;
                    if (options.series[row].lineStyle.width == 4) {
                        options.series[row].lineStyle.width = 2
                    } else {
                        options.series[row].lineStyle.width = 4
                    }
                } else {
                    if (options.yAxis[i].id == row) {
                        options.yAxis[i].show = true;
                    }
                    if (options.series[i].id == row) {
                        if (options.series[row].lineStyle.width == 4) {
                            options.series[row].lineStyle.width = 2
                        } else {
                            options.series[row].lineStyle.width = 4
                        }
                    }
                }
            }
            _this.myChart.setOption(options);
        },
        showLine(row) {
            let _this = this
            let options = _this.myChart.getOption()
            for (let i in options.yAxis) {
                // options.series[i].lineStyle.width = 2;
                if (options.series[i].id == row) {
                    console.log(options.series[i].lineStyle.width)
                    if (options.series[i].lineStyle.width == 0) {
                        options.series[i].lineStyle.width = 2;
                    } else {
                        options.series[i].lineStyle.width = 0;
                    }
                }
            }
            _this.myChart.setOption(options);
        },
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
            /** 
                legend点击事件
            */
            // this.myChart.on('legendselectchanged', function (params) {
            //     // console.log(obj)
            //     var option = this.getOption();
            //     var select_key = Object.keys(params.selected);
            //     var select_value = Object.values(params.selected);
            //     var n = 0;
            //     select_value.map(res => {
            //         if (!res) {
            //             n++;
            //         }
            //     });
            //     console.log('n', n)
            //     if (n == select_value.length) {
            //         option.legend[0].selected[params.name] = true;
            //     }
            //     this.setOption(option)

            // });
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
        renderEcharts(result, isFirst) {
            let _this = this;
            if (!_this.myChart) {
                return
            }
            let options = _this.myChart.getOption();
            if (isFirst == true) {
                for (let i = 0; i < 50; i++) {
                    options.xAxis[0].data.push(_this.formatterTimes(result.data[0].timeTag, i))
                }
            }
            if (options.xAxis[0].data.indexOf(result.data[0].timeTag) == -1) {
                options.xAxis[0].data.push(result.data[0].timeTag)
            }
            options.series[0].data.push(result.data[0].devDeep == null ? 0 : result.data[0].devDeep) // 深度
            options.series[1].data.push(result.data[0].oceanDeep == null ? 0 : result.data[0].oceanDeep) // 当前海深
            options.series[2].data.push(result.data[0].dataTemp == null ? 0 : result.data[0].dataTemp) // 温度
            options.series[3].data.push(result.data[0].dataConv == null ? 0 : result.data[0].dataConv) // 电导率
            options.series[4].data.push(result.data[0].dataP == null ? 0 : result.data[0].dataP) // 压力
            options.series[5].data.push(result.data[0].dataSal == null ? 0 : result.data[0].dataSal) // 盐度
            options.series[6].data.push(result.data[0].dataSV == null ? 0 : result.data[0].dataSV) // 声速
            options.series[7].data.push(result.data[0].dataPH == null ? 0 : result.data[0].dataPH) // Ph
            /**
             *  固定X轴数量与series的数量
            */
            if (options.xAxis[0].data.length > 50) {
                options.xAxis[0].data.splice(0, 1);
            }
            if (options.series[0].data.length > 50) {
                options.series[0].data.splice(0, 1);
            }
            if (options.series[1].data.length > 50) {
                options.series[1].data.splice(0, 1);
            }
            if (options.series[2].data.length > 50) {
                options.series[2].data.splice(0, 1);
            }
            if (options.series[3].data.length > 50) {
                options.series[3].data.splice(0, 1);
            }
            if (options.series[4].data.length > 50) {
                options.series[4].data.splice(0, 1);
            }
            if (options.series[5].data.length > 50) {
                options.series[5].data.splice(0, 1);
            }
            if (options.series[6].data.length > 50) {
                options.series[6].data.splice(0, 1);
            }
            if (options.series[7].data.length > 50) {
                options.series[7].data.splice(0, 1);
            }
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
                /**
                 * 初始化Echarts  X轴
                */
                if (result.data.length == []) {

                } else {
                    if (_this.globelNum == 0) {
                        _this.renderEcharts(result, true)
                    } else {
                        _this.renderEcharts(result, false)
                    }
                    _this.globelNum += 1;
                    _this.form = {
                        getDataTime: result.data[0].timeTag,
                        instrumentDownSpeed: result.data[0].devSpeed.toFixed(4),
                        instrumentDepth: result.data[0].devDeep.toFixed(4),
                        temperature: result.data[0].dataTemp.toFixed(4),
                        electricConductivity: result.data[0].dataConv.toFixed(4),
                        pressure: result.data[0].dataP.toFixed(4),
                        salinity: result.data[0].dataSal.toFixed(4),
                        soundVelocity: result.data[0].dataSV.toFixed(4),
                        ph: result.data[0].dataPH.toFixed(4),
                        turbidity: '0',
                        chlorophyll: '0',
                        oceanDeep: result.data[0].oceanDeep == null ? 0 : result.data[0].oceanDeep.toFixed(4),
                        longitude: result.data[0].longitude == null ? 0 : result.data[0].longitude.toFixed(4),
                        latitude: result.data[0].iatitude == null ? 0 : result.data[0].iatitude.toFixed(4),
                        speed: result.data[0].shipSpeed == null ? 0 : result.data[0].shipSpeed.toFixed(4),
                    };
                }

            } catch (error) {
                console.log(error);
            }
        },
        /**
         * 格式化时间+1s
        */
        formatterTimes(time, sum) {
            let date = time;
            date = date.substring(0, 19);
            date = date.replace(/-/g, '/');
            let timestamp = new Date(date).getTime();
            if (sum == 0) {
                timestamp = timestamp;
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

.bigScreen {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
}
.smellScreen {
    height: 100%;
    position: relative;
}
.from-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 90px;
    z-index: 99;
    /* overflow: auto; */
}
.apparatus-from-content {
    height: 100%;
    overflow: auto;
    width: 15%;
    border-left: 1px solid #eee;
}
.apparatus-from-content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.page-title {
    position: relative;
    margin: 5px 10px;
    line-height: 32px;
    border-bottom: 1px solid #eee;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
.grid-content {
    overflow: auto;
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
/* 68 */
.top-input {
    cursor: default;
    margin: 0 20px;
    margin-bottom: 18px;
    background: #fff;
    padding-bottom: 20px;
    position: absolute;
    top: 0;
    z-index: 100;
    padding-right: 14px;
}
.top-input p {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #303133;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    font-weight: 600;
    margin: 0;
}
.top-input-1 {
    cursor: default;
    margin: 0 20px;
    margin-bottom: 18px;
    background: #fff;
    padding-bottom: 20px;
    position: absolute;
    top: 0;
    z-index: 100;
    padding-right: 14px;
}
.top-input-1 p {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #303133;
    line-height: 40px;
    padding: 0 12px 0 0;
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
    /* height: 32px; */
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
    /* content: ""; */
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
</style>