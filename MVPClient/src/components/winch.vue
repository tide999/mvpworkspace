<template>
    <div id="winch">
        <p class="page-title">
            <span>绞车信息显示</span>
            <span class="close-btn" style="right:20px" @click="handleSize('winch')" title="放大/缩小"><i :class="iconName"></i></span>
            <span class="close-btn" @click="closeItem('winch')"><i class="el-icon-circle-close"></i></span>
        </p>
        <div v-show="pageSize == true">
            <el-form ref="form" :model="sizeForm" label-width="60px" size="mini" class="winch-from-content" :label-position="labelPosition">
                <el-form-item label="放缆长度(米)">
                    <el-input disabled v-model="sizeForm.ropeLengthMet" style="width:120px;min-width:90px"></el-input>
                </el-form-item>
                <el-form-item label="收放揽速度(米/秒)">
                    <el-input disabled v-model="sizeForm.pullRopeSpeed" style="width:120px;min-width:90px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group disabled v-model="sizeForm.type">
                        <el-checkbox :label="0" name="type">收揽</el-checkbox>
                        <el-checkbox :label="1" name="type">放缆</el-checkbox>
                        <el-checkbox :label="2" name="type">自由轮</el-checkbox>
                        <el-checkbox :label="3" name="type">刹车</el-checkbox>
                        <el-checkbox :label="4" name="type">自由投放就位</el-checkbox>
                        <el-checkbox :label="5" name="type">自由工作状态</el-checkbox>
                        <el-checkbox :label="6" name="type">上机位控制</el-checkbox>
                        <el-checkbox :label="7" name="type">揽绳保护</el-checkbox>
                        <el-checkbox :label="8" name="type">报警</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="报警信息显示">
                    <el-input disabled type="textarea" v-model="sizeForm.alertMsg" style="width:98%;fon-size:12px" rows="8" resize="none"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="pageSize == false">
            <el-form ref="form" class="form-1" :model="sizeForm" size="mini" inline>
                <el-form-item label="放缆长度(米)">
                    <el-input disabled v-model="sizeForm.ropeLengthMet" style="width:120px;min-width:90px"></el-input>
                </el-form-item>
                <el-form-item label="收放揽速度(米/秒)">
                    <el-input disabled v-model="sizeForm.pullRopeSpeed" style="width:120px;min-width:90px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group  v-model="sizeForm.type" class="bigScreenCheckbox">
                        <el-checkbox :label="0" name="type" disabled>收揽</el-checkbox>
                        <el-checkbox :label="1" name="type">放缆</el-checkbox>
                        <el-checkbox :label="2" name="type">自由轮</el-checkbox>
                        <el-checkbox :label="3" name="type">刹车</el-checkbox>
                        <el-checkbox :label="4" name="type">自由投放就位</el-checkbox>
                        <el-checkbox :label="5" name="type">自由工作状态</el-checkbox>
                        <el-checkbox :label="6" name="type">上机位控制</el-checkbox>
                        <el-checkbox :label="7" name="type">揽绳保护</el-checkbox>
                        <el-checkbox :label="8" name="type">报警</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div id="myChart1" :style="{ width: '100%', height: '450px' }"></div>
            <div class="bigScreenTextarea">
                <p>报警信息提示：</p>
                <el-input disabled type="textarea" v-model="sizeForm.alertMsg" style="width:98%;fon-size:12px" rows="3" resize="none"></el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'winch',
    data() {
        return {
            thisTimes:'',
            limit:1,
            form: { name: "" },
            iconName: 'el-icon-right',
            labelPosition: 'top',
            sizeForm: {
                ropeLengthMet: '78.9864',
                pullRopeSpeed: '-300',
                type: [1, 4],
                alertMsg: '还是不得不说echarts结构设计中的低耦合考虑得很好，通过一个fomatter方法，用户可以自定义显示内容,面的实现我的方法是在option中的series填了对label的处理，具体代码如下',
            },
            myChart1: "",
            option: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
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
                    data: [0, 20, 40, 60, 80, 100],
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
                        data: [1, 30, 90, 210, 380, 600]
                    },
                    {
                        name: '当前海深(米)',
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: 'none',
                        smooth: true,
                        data: [800, 810, 850, 760, 900, 830]
                    },
                    {
                        name: '温度(℃)',
                        type: 'line',
                        yAxisIndex: 1,
                        symbol: 'none',
                        smooth: true,
                        data: [32, 28, 26, 25, 22, 19]
                    },
                    {
                        name: '导电率(S/m)',
                        type: 'line',
                        yAxisIndex: 2,
                        symbol: 'none',
                        smooth: true,
                        data: [18, 19, 21, 18, 19, 20]
                    },
                    {
                        name: '压力(bar)',
                        type: 'line',
                        yAxisIndex: 3,
                        symbol: 'none',
                        smooth: true,
                        data: [20, 120, 180, 190, 240, 300]
                    },
                    {
                        name: '盐度(psu)',
                        type: 'line',
                        yAxisIndex: 4,
                        symbol: 'none',
                        smooth: true,
                        data: [20, 18, 21, 29, 19, 15]
                    },
                    {
                        name: '声速(m/s)',
                        type: 'line',
                        yAxisIndex: 5,
                        symbol: 'none',
                        smooth: true,
                        data: [1400, 1300, 1500, 1540, 1480, 1570]
                    },
                    {
                        name: 'PH()',
                        type: 'line',
                        yAxisIndex: 6,
                        symbol: 'none',
                        smooth: true,
                        data: [12, 14, 13, 11, 14, 15]
                    },
                    {
                        name: '浊度(ug/l)',
                        type: 'line',
                        yAxisIndex: 7,
                        symbol: 'none',
                        smooth: true,
                        data: [30, 20, 32, 43, 34, 23]
                    },
                    {
                        name: '叶绿素(ug/l)',
                        type: 'line',
                        yAxisIndex: 8,
                        symbol: 'none',
                        smooth: true,
                        data: [0.03, 0.02, 0.05, 0.06, 0.06, 0.05]
                    }
                ]
            }
        }
    },
    watch: {
        pageSize(newVal, oldVal) {
            console.log('winch' + newVal);
            if (newVal == true) {
                this.iconName = 'el-icon-right'
            } else {
                this.iconName = 'el-icon-back'
            }
        }
    },
    props: {
        pageSize: Boolean,
    },
    mounted() {
        this.drawLine();
        let _this = this;
        window.onresize = function () {
            _this.myChart1.resize()
        }
        this.getDataSec()
    },
    methods: {
        drawLine() {
            let _this = this;
            // 基于准备好的dom，初始化echarts实例
            this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
            this.myChart1.setOption(this.option, true);
            let elementResizeDetectorMaker = require("element-resize-detector");//引入监听dom变化的组件
            let erd = elementResizeDetectorMaker();
            let worldMapContainer = document.getElementById('apparatus');
            erd.listenTo(worldMapContainer, function (element) {  //执行监听 
                _this.$nextTick(function () {
                    document.getElementById("myChart").style.width = element.offsetWidth
                    _this.myChart1.resize(); //变化重新渲染饼图
                })
            });
        },
        getDataSec() {
            let _this = this
            setInterval(() => {
                _this.option.xAxis.data.push(Number(_this.option.xAxis.data[_this.option.xAxis.data.length - 1]) + 20)
                _this.option.series[0].data.push(Number(_this.option.series[0].data[_this.option.series[0].data.length - 1] + 40)) // 深度
                _this.option.series[1].data.push(Number(_this.option.series[1].data[_this.option.series[1].data.length - 1] + 2)) // 当前海深
                _this.option.series[2].data.push(Number(_this.option.series[2].data[_this.option.series[2].data.length - 1])) // 温度
                _this.option.series[3].data.push(Number(_this.option.series[3].data[_this.option.series[3].data.length - 1] + 1)) // 导电率
                _this.option.series[4].data.push(Number(_this.option.series[4].data[_this.option.series[4].data.length - 1] + Math.floor(Math.random() * 10))) // 压力
                _this.option.series[5].data.push(Number(_this.option.series[5].data[_this.option.series[5].data.length - 1] + Math.floor(Math.random()))) // 盐度
                _this.option.series[6].data.push(Number(_this.option.series[6].data[_this.option.series[6].data.length - 1] + Math.floor(Math.random() * 20))) // 声速
                _this.option.series[7].data.push(Number(_this.option.series[7].data[_this.option.series[7].data.length - 1] + Math.floor(Math.random() * 3))) // Ph
                _this.option.series[8].data.push(Number(_this.option.series[8].data[_this.option.series[8].data.length - 1] + Math.floor(Math.random() * 4))) // 浊度
                _this.option.series[9].data.push(Number(_this.option.series[9].data[_this.option.series[9].data.length - 1])) // 叶绿素
                _this.myChart1.setOption(_this.option, true);
            }, 10000)
        },
        closeItem(ele) {
            this.$emit('sendEleName', ele);
        },
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
        
    }
}
</script>

<style scoped>
.winch-from-content {
    margin-top: 10px;
    text-align: center;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.el-radio {
    display: block;
    text-align: left;
    margin: 10px;
}
.el-checkbox {
    display: block;
    text-align: left;
    line-height: 20px;
    /* margin:2px 0px 2px 32px; */
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
.form-1 {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
}
.bigScreenCheckbox .el-checkbox {
    display: inline;
    margin-right: 10px;
}
.bigScreenTextarea{
    padding: 0 20px;

}
.bigScreenTextarea p{
    font-size: 14px;
    color: #303133;
    margin: 10px 0;
    font-weight: 600;
}
</style>