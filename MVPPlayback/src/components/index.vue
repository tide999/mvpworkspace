<template>
    <div id="index" v-loading="loadingpage">
        <div class="mission">
            <div class="mission-left">
                <div class="mission-left-top">
                    <span class="form-label">回放任务名称:</span>
                    <el-select v-model="missionname" placeholder="请选择任务" @change="getThisMission" style="width:300px" size="mini">
                        <el-option v-for="item in missionlist" :key="item.jobId" :label="item.jobName" :value="item.jobId">
                        </el-option>
                    </el-select>
                    <span title="刷新回放任务列表" @click="refreshGetMission" class="form-label isHover" style="cursor: pointer;"><i class="el-icon-refresh"></i></span>
                </div>
                <div class="mission-left-bottom">
                    <el-form class="form-content" ref="missiondata" :model="missiondata" label-width="80px" size="mini">
                        <el-form-item label="任务模式:">
                            <el-input v-model="missiondata.jobModes" disabled style="width:120px"></el-input>
                        </el-form-item>
                        <el-form-item label="投放深度:">
                            <el-input v-model="missiondata.setDeep" disabled style="width:80px"></el-input>
                        </el-form-item>
                        <el-form-item label="投放次数:">
                            <el-input v-model="missiondata.dropTimes" disabled style="width:80px"></el-input>
                        </el-form-item>
                        <el-form-item label="投放间隔:">
                            <el-input v-model="missiondata.intervalTime" disabled style="width:80px"></el-input>
                        </el-form-item>
                        <el-form-item label="安全深度:">
                            <el-input v-model="missiondata.safeDeep" disabled style="width:80px"></el-input>
                        </el-form-item>
                        <el-form-item label="任务状态:">
                            <el-input v-model="missiondata.jobStatuss" disabled style="width:120px"></el-input>
                        </el-form-item>
                        <el-form-item label="实际投放次数:" label-width="110px">
                            <el-input v-model="missiondata.runtimes" disabled style="width:80px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="mission-right">
                <el-button type="primary" @click="playBack" class="mission-right-btn">开始回放</el-button>
                <el-button type="success" :disabled="!missiondata.jobId" @click="exportss" class="mission-right-btn">下载当前<br />数据</el-button>
            </div>
        </div>
        <div class="chartscontent">
            <div class="chartscontent-top">
                <el-button size="mini" :disabled='!isPushBtn' v-loading="loadingbtn" @click="beforeTimes" type="primary">前一次投放数据</el-button>
                <el-button size="mini" :disabled='!isPushBtn' v-loading="loadingbtn" @click="nextTimes" type="primary">下一次投放数据</el-button>
                <div style="margin-left:10px">
                    <span style="margin-left:10px">自动显示时间间隔(秒)</span>
                    <el-input size="mini" style="width:80px;margin:0 10px" :disabled='!isPushBtn' type="number" v-model="autoShowTimes" @change="checkInput"></el-input>
                    <el-button size="mini" type="primary" :disabled='!isPushBtn' v-show="isAuto == false" @click="autoPlay">自动</el-button>
                    <el-button style="margin-left:0;" size="mini" type="danger" :disabled='!isPushBtn' v-show="isAuto == true" @click="stopAutoPlay">停止</el-button>
                </div>
                <div class="shrinkEchartsBtn">
                    <el-button v-for="(item, $index) in echartsArray" :key="$index" @click="showitem(item)" size="mini" plain type="primary">{{item.title}}</el-button>
                </div>
            </div>
            <div class="chartscontent-mid">
                <div class="echart-item" v-for="(item, $index) in myChartsArray" :key='$index'>
                    <span class="closeit" @click="closeitem(item.id)"><i class="el-icon-circle-close"></i></span>
                    <div :id="'myChart' + item.id" style="width:100%;height:100%"></div>
                </div>
            </div>
            <!-- <div class="chartscontent-bottom">
                <el-button v-for="(item, $index) in echartsArray" :key="$index" @click="showitem(item)" size="mini" plain type="primary">{{item.title}}</el-button>
            </div> -->
        </div>
        <transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
            <div id="customDialog" v-dialogDrag class="custom-dialog" v-show="echartToolTipsDataDialog" v-loading='echartToolTipsDataDialogLoading'>
                <div class="custom-dialog-header">
                    <span class="custom-dialog-title">海深{{echartToolTipsData.devDeep}}米{{echartToolTipsData.name}}</span>
                    <span class="custom-dialog-close" @click="echartToolTipsDataDialogClose"><i class="el-icon-circle-close"></i></span>
                </div>
                <div class="custom-dialog-content">
                    <div class="dialog-div">
                        <div class="tabledatabox" v-for="(item, $index) in echartToolTipsData.table" :key="$index">
                            <p>第{{item.runtimes}}次</p>
                            <ul>
                                <li v-for='(ite, $indexx) in item.data' :key="$indexx">
                                    <span>{{ite}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="custom-dialog-footer">
                    <el-button class="custom-dialog-btn" @click="echartToolTipsDataDialogClose">关 闭</el-button>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
import request from "@/utils/request.js";
import '@/utils/directives.js'
import data from './data/index.js'
import methods from './methods/index.js'
export default {
    name: 'index',
    data() {
        return data
    },
    components: {
    },
    mounted() {
        this.baseURL = localStorage.getItem('mvpip');
        this.getishow();
        this.getFinishedJobs();
    },
    filters: {
        getObjectKey(val) {
            return Object.values(val)[1]
        },
        filterInfinite(val) {
            if (val == -1) {
                return '无限次'
            } else {
                return val
            }
        }
    },
    watch: {
        myChartsArray() {
            this.drawLine();
        }
    },
    methods: methods
}

</script>
<style>
#index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
}
.custom-dialog-title {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.custom-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    width: 500px;
    height: 90%;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    z-index: 100;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.custom-dialog-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    font-size: 18px;
    margin: 10px 0;
    position: relative;
}
.custom-dialog-close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    display: inline-block;
}
.custom-dialog-content {
    width: 100%;
    height: calc(100% - 100px);
    overflow: auto;
}
.custom-dialog-footer {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.custom-dialog-btn {
    margin-right: 30px !important;
}
.dialog-div {
    display: flex;
    justify-content: center;
}
.tabledatabox {
    width: 30%;
}
.tabledatabox p {
    text-align: center;
    margin: 0;
    padding: 5px 30px;
}
.tabledatabox ul,
.tabledatabox li {
    list-style: none;
    margin: 0;
    padding: 0;
}
.tabledatabox ul {
    border: 1px solid #e8e8e8;
    margin: 0 5px;
    border-bottom: none;
}

.tabledatabox li {
    padding: 5px 30px;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
}
.el-dialog {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4) !important;
    border: 1px solid #ccc;
    border-radius: 8px !important;
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.shrinkEchartsBtn {
    position: absolute;
    top: 1px;
    right: 0;
    background: #fff;
}
.el-table .cell {
    cursor: default;
}
.el-table .one-row {
    background: #f0f9eb;
}
.el-table .two-row {
    background: #d1e7ff;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 0 !important;
}
.mission,
.chartscontent {
    background: #fff;
    width: 99%;
    border-radius: 8px;
    margin: 10px 0;
}
.mission {
    height: 140px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mission-left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    height: 100%;
}
.mission-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 70%;
    margin: 0 10px;
}
.mission-right-btn {
    width: 120px;
    margin-left: 0 !important;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}
.mission-left-top {
    height: 40px;
    padding-top: 10px;
    display: flex;
    align-items: center;
}
.mission-left-bottom {
    height: calc(100% - 40px);
}
.form-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}
.chartscontent {
    margin-top: 5px;
    height: calc(100% - 150px);
}
.form-label {
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #303133;
    line-height: 40px;
    padding: 0 12px 0 8px;
    box-sizing: border-box;
    display: inline-block;
    font-weight: 600;
}
.chartscontent {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.chartscontent-top {
    display: flex;
    width: 98%;
    position: relative;
    margin-top: 10px;
}
.chartscontent-mid {
    height: calc(100% - 50px);
    width: 98%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.chartscontent-bottom {
    width: 98%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.echart-item {
    width: 220px;
    height: 98%;
    border-radius: 8px;
    box-shadow: 0px 2px 3px #888;
    position: relative;
}
.closeit {
    position: absolute;
    top: -10px;
    right: -8px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    z-index: 99;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
}
.closeit:hover {
    color: #f56c6c;
}
.isHover:hover {
    color: #409eff;
}
</style>