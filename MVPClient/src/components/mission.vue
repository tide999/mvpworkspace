<template>
    <div id="mission">
        <div class="mission-box">
            <p class="page-title">
                <span v-show="isMaxScreen == true">任务内容显示</span>
                <span v-show="isMaxScreen == false">
                    <span class="labelfont">当前任务状态：</span>
                    <el-radio-group disabled v-model="form.missionStatus">
                        <el-radio :label="3">等待执行</el-radio>
                        <el-radio :label="48">正在执行</el-radio>
                        <el-radio :label="51">投放间隔等待</el-radio>
                        <el-radio :label="768">执行完成</el-radio>
                        <el-radio :label="12288">已经取消</el-radio>
                    </el-radio-group>
                </span>

                <span class="close-btn" style="right:26px" @click="handleSize('mission')" title="放大/缩小"><i :class="iconName"></i></span>
                <span class="close-btn" @click="closeItem('mission')"><i class="el-icon-circle-close"></i></span>
            </p>
            <div class="mission-content" v-show="isMaxScreen == true">
                <el-form ref="form" :model="form" inline class="from-content" size="mini">
                    <el-form-item label="当前任务名称：" label-width="120px">
                        <el-input disabled v-model="form.missionName" style="width:250px"></el-input>
                    </el-form-item>
                    <br />
                    <el-form-item label="当前任务模式：" label-width="120px">
                        <el-radio-group disabled v-model="form.missionType">
                            <el-radio :label="5">定深投放</el-radio>
                            <el-radio :label="80">距底定距离投放</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="当前任务状态：" label-width="120px">
                        <el-radio-group disabled v-model="form.missionStatus">
                            <el-radio :label="3">等待执行</el-radio>
                            <el-radio :label="48">正在执行</el-radio>
                            <el-radio :label="51">投放间隔等待</el-radio>
                            <el-radio :label="768">执行完成</el-radio>
                            <el-radio :label="12288">已经取消</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <br />
                    <el-form-item label="每次投放间隔(秒)：" label-width="145px">
                        <el-input disabled v-model="form.timesThrowSec" style="width:70px"></el-input>
                    </el-form-item>
                    <el-form-item label="距底安全深度(米)：" label-width="145px">
                        <el-input disabled v-model="form.securityDeepMet" style="width:72px"></el-input>
                    </el-form-item>
                    <el-form-item label="设定深度(米)：" label-width="120px">
                        <el-input disabled v-model="form.settingDepth" style="width:70px"></el-input>
                    </el-form-item>
                    <el-form-item label="设定投放次数(次)：" label-width="145px">
                        <el-input disabled v-model="form.settingThrowTimes" style="width:65px"></el-input>
                    </el-form-item>
                    <el-form-item label="当前投放次数(次)：" label-width="145px">
                        <el-input disabled v-model="form.thisSettingThrowTimes" style="width:65px"></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-content" v-show="userlevel == 0">
                    <el-button type="primary" class="create-btn" @click="createMission">增加任务</el-button>
                    <div class="left-btn-area">
                        <el-button type="success" @click="startingMission" :disabled='startBtn'>开始执行任务</el-button>
                        <el-button type="warning" @click="cancelMission" :disabled='cancelBtn'>取消当前任务并回收仪器</el-button>
                    </div>
                    <el-button type="danger" class="delete-btn" @click="cancelMissionNow">立即取消<br />当前任务</el-button>
                </div>
            </div>
            <div class="minScreen" v-show="isMaxScreen == false">
            </div>
        </div>

        <el-dialog title="新增任务" :visible.sync="dialogVisible" width="600px" top="5vh" v-dialogDrag :before-close="handleClose">
            <div>
                <el-form ref="dialogFrom" :model="dialogFrom" label-width="140px">
                    <el-form-item label="新任务名称">
                        <el-input v-model="dialogFrom.missionName"></el-input>
                    </el-form-item>
                    <el-form-item label="任务工作模式">
                        <el-radio-group v-model="dialogFrom.missionType">
                            <el-radio :label="5">定深投放</el-radio>
                            <el-radio :label="80">距底定距投放</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="设定深度(米)">
                        <el-input type='number' v-model="dialogFrom.settingDeep"></el-input>
                    </el-form-item>
                    <el-form-item label="设定投放次数(次)">
                        <el-input type='number' v-model="dialogFrom.settingTimes" class="usedinput" v-show="isMaxTimes==false" style="width:90px;padding-right:20px"></el-input>
                        <el-checkbox v-model="dialogFrom.checkbox" @change="isSettingTimes">无限次投放</el-checkbox>
                    </el-form-item>
                    <el-form-item type='number' label="每次投放间隔(秒)">
                        <el-input v-model="dialogFrom.settingInterval"></el-input>
                    </el-form-item>
                    <el-form-item type='number' label="距底安全深度(米)">
                        <el-input v-model="dialogFrom.safeDepth"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose" style="margin-right:20px">取 消</el-button>
                <el-button type="primary" @click="createMissionDialogBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from "@/utils/request.js";
import '@/utils/directives.js'
export default {
    name: 'mission',
    data() {
        return {
            iconName: 'el-icon-top',
            isMaxScreen: true,
            userlevel: 0,
            startBtn: false,
            cancelBtn: false,
            dialogVisible: false,
            form: {
                missionName: '当前暂无任务',
                missionType: '',
                missionStatus: '',
                timesThrowSec: '',
                securityDeepMet: '',
                settingDepth: '',
                settingThrowTimes: '',
                thisSettingThrowTimes: ''
            },
            dialogFrom: {
                missionName: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' + (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' + (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()) +'任务',
                missionType: 5,
                settingDeep: 100,
                settingTimes: 1,
                settingInterval: 5,
                safeDepth: 20,
                checkbox: false
            },
            isMaxTimes: false,
            realTimeJobId: '',
            runningJob: [],
            hasRunningJob: false,
            waitingJob: [],
            setinterval: '',
            setinterval1: '',
            baseURL: '',
            exportTimes: 0,
            si: null
        }
    },
    created() {
        this.userlevel = localStorage.getItem('mvplevel');
        console.log(this.userlevel + '==>0:USE;1:READONLY')
    },
    mounted() {
        this.baseURL = localStorage.getItem('mvpip');
        this.getCurrentJob();
    },
    methods: {
        /**
         * @description: 组件
         * @param {*} ele
         * @return {*}
         */
        handleSize(ele) {
            this.$emit('sendEleName', { ele: ele, btn: 'shrink' });
            if (this.iconName == 'el-icon-top') {
                // 缩小
                this.iconName = 'el-icon-bottom';
                this.isMaxScreen = false;
            } else {
                // 放大
                this.iconName = 'el-icon-top'
                this.isMaxScreen = true;
            }
        },
        /**
         * @description: 
         * @param {*} ele
         * @return {*}
         */
        closeItem(ele) {
            this.$emit('sendEleName', { ele: ele, btn: 'close' });
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        startingMission() {
            this.$confirm('是否开始任务？', '提示', {
                confirmButtonText: '开始',
                cancelButtonText: '取消',
                type: 'info'
            }, 'info').then(() => {
                this.addCommand({
                    cmdId: 1280,
                    cmdContent: 0
                })
                this.$message({
                    type: 'success',
                    message: '任务开始指令已发送'
                });
            }).catch(() => {

            });
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        cancelMission() {
            this.$confirm('是否取消当前任务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: 'warning'
            }).then(() => {
                this.addCommand({
                    cmdId: 1360,
                    cmdContent: 0
                })
                this.$message({
                    type: 'success',
                    message: '任务取消指令已发送'
                });
            }).catch(() => {

            });
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        cancelMissionNow() {
            this.$confirm('当前任务将立即被取消并且不会回收仪器，是否确认执行？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: 'warning'
            }).then(() => {
                this.addCommand({
                    cmdId: 255,
                    cmdContent: 0
                })
                this.$message({
                    type: 'success',
                    message: '任务立即取消指令已发送'
                });
            }).catch(() => {
                
            });
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        createMission() {
            this.dialogVisible = true;
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        handleClose() {
            this.dialogFrom = {
                missionName: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' + (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' + (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()) +'任务',
                missionType: 5,
                settingDeep: 100,
                settingTimes: 1,
                settingInterval: 5,
                safeDepth: 20,
                checkbox: false
            };
            this.dialogVisible = false;
        },
        /**
         * @description: 新增任务按钮 
         * @param {*}
         * @return {*}
         */
        createMissionDialogBtn() {
            const _this = this;
            let params = JSON.parse(JSON.stringify(this.dialogFrom));
            if (params.checkbox == true) {
                params.settingTimes = -1
            }
            if (!params.missionName) {
                _this.$message.error('请输入任务名称');
                return;
            }
            if (!params.missionType) {
                _this.$message.error('请选择工作模式');
                return;
            }
            if (!params.settingDeep) {
                _this.$message.error('请输入设定深度');
                return;
            }
            if (!params.settingTimes && params.checkbox == false) {
                _this.$message.error('请设定投放次数');
                return;
            }
            if (!params.settingInterval) {
                _this.$message.error('请输入投放间隔');
                return;
            }
            if (!params.safeDepth) {
                _this.$message.error('请输入距底安全深度');
                return;
            }
            if (params.missionName.length > 100) {
                _this.$message.error('任务名称过长');
                return
            }
            if (params.settingDeep > 10001 || params.settingDeep < 1) {
                _this.$message.error('设定深度格式错误请重新输入');
                return
            }
            if (params.checkbox == false) {
                if (params.settingTimes > 10001 || params.settingTimes < 1) {
                    _this.$message.error('投放次数格式错误请重新输入');
                    return
                }
            }
            if (params.settingInterval > 301 || params.settingInterval < 1) {
                _this.$message.error('投放间隔格式错误请重新输入');
                return
            }
            if (Number(params.safeDepth) > Number(params.settingDeep)) {
                _this.$message.error('距底安全深度格式错误请重新输入');
                return
            }
            params.safeDepth = Number(params.safeDepth);
            params.settingDeep = Number(params.settingDeep);
            params.settingInterval = Number(params.settingInterval);
            params.settingTimes = Number(params.settingTimes);
            this.addJob(params);
        },
        /**
         * @description: 
         * @param {*}
         * @return {*}
         */
        isSettingTimes() {
            if (this.dialogFrom.checkbox == true) {
                this.isMaxTimes = true
            } else {
                this.isMaxTimes = false
            }
        },
        /**
         * @description: 新增任务
         * @param {*}
         * @return {*}
         */
        async addJob(row) {
            let _this = this;
            let result = await request({
                url: "/job/add_job",
                method: "get",
                params: {
                    jobName: row.missionName,
                    jobMode: row.missionType,
                    jobDeep: row.settingDeep,
                    dropTimes: row.settingTimes,
                    intervalTime: row.settingInterval,
                    safeDeep: row.safeDepth,
                    operateMode: 0,
                    operateSpeed: 0
                }
            });
            try {
                _this.isMaxTimes = false;
                _this.$message({
                    message: '已添加任务',
                    type: 'success'
                });
                _this.dialogVisible = false;
                _this.dialogFrom = {
                    missionName: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' + (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' + (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()) +'任务',
                    missionType: 5,
                    settingDeep: 100,
                    settingTimes: 1,
                    settingInterval: 5,
                    safeDepth: 20,
                    checkbox: false
                };
            } catch (error) {
                console.error(error);
                _this.$message({
                    message: error,
                    type: 'warning'
                });
                this.dialogVisible = false;
            }
        },
        /**
         * @description: 获取当前任务信息
         * @param {*}
         * @return {*}
         */
        async getRealtimeJob(jobId) {
            let _this = this;
            let result = await request({
                url: "/job/get_job_realdata",
                method: "get",
                params: {
                    jobId: jobId,
                }
            });
            try {
                window.clearInterval(_this.setinterval1);
                if (result.data.length != 0) {
                    _this.form = {
                        missionName: result.data[0].jobName,
                        missionType: result.data[0].jobMode,
                        missionStatus: result.data[0].jobStatus,
                        timesThrowSec: result.data[0].intervalTime,
                        securityDeepMet: result.data[0].safeDeep,
                        settingDepth: result.data[0].setDeep,
                        settingThrowTimes: result.data[0].dropTimes == -1 ? '无限次' : result.data[0].dropTimes,
                        thisSettingThrowTimes: result.data[0].runTimes
                    }
                    if (result.data[0].jobStatus >= 768) {
                        if (_this.userlevel == 0) {
                            // 导出
                            _this.si = window.setInterval(() => {
                                _this.exportTimes++;
                                _this.exportFile(jobId);
                            }, 5000)
                        }
                        _this.getCurrentJob();
                    } else {
                        _this.setinterval1 = window.setInterval(() => {
                            _this.getRealtimeJob(_this.realTimeJobId);
                        }, 1000)
                    }
                } else {

                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * @description: 获取最新任务信息
         * @param {*}
         * @return {*}
         */
        async getCurrentJob() {
            let _this = this;
            let result = await request({
                url: "/job/get_current_job",
                method: "get"
            });
            try {
                window.clearInterval(_this.setinterval);
                if (result.data.length > 0) {
                    _this.form = {
                        missionName: result.data[0].jobName,
                        missionType: result.data[0].jobMode,
                        missionStatus: result.data[0].jobStatus,
                        timesThrowSec: result.data[0].intervalTime,
                        securityDeepMet: result.data[0].safeDeep,
                        settingDepth: result.data[0].setDeep,
                        settingThrowTimes: result.data[0].dropTimes == -1 ? '无限次' : result.data[0].dropTimes,
                        thisSettingThrowTimes: result.data[0].runTimes
                    };
                    _this.realTimeJobId = result.data[0].jobId;
                    _this.getRealtimeJob(_this.realTimeJobId)
                } else {
                    _this.setinterval = window.setInterval(() => {
                        _this.getCurrentJob()
                    }, 1000);
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * @description:导出 
         * @param {*}
         * @return {*}
         */
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
                    if (_this.exportTimes == 3) {
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
        /**
         * @description:增加控制指令 
         * @param {*}
         * @return {*}
         */
        async addCommand(row) {
            let _this = this;
            let result = await request({
                url: "/sys-define/add_command",
                method: "get",
                params: {
                    cmdId: row.cmdId,
                    cmdContent: row.cmdContent,
                }
            });
            try {
                // console.log(result.data);
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style scoped>
.mission-box {
    width: 100%;
    height: 100%;
}

.mission-content {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    position: relative;
}
.from-content {
    margin-top: 10px;
    margin-left: 5px;
}
.btn-content {
    padding: 15px 0;
    display: flex;
    justify-content: center;
    margin-right: 30px;
}
.page-title {
    font-size: 16px;
    color: #409eff;
    position: relative;
    margin: 5px 10px;
    line-height: 32px;
    height: 32px;
    cursor: default;
}
.page-title .close-btn {
    position: absolute;
    right: 5px;
    top: 0px;
    cursor: pointer;
    color: #303133;
}
.page-title .close-btn:hover {
    color: #5cb6ff;
}
.left-btn-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 12px;
    margin-left: 12px;
}
.left-btn-area .el-button {
    display: block;
    height: 48%;
    width: 130px;
    white-space: normal;
}
.btn-content .create-btn {
    display: block;
}
.delete-btn {
    display: block;
    /* padding: 0 3px; */
}
.el-button + .el-button {
    margin-left: 0;
}
.usedinput[disabled] {
    border-color: #e4e7ed;
    color: #e4e7ed;
}
.labelfont {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    display: inline-block;
    margin-left: 18px;
}
.form-content {
    margin: 10px 0 12px 0;
}
</style>