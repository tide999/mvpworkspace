<template>
    <div id="mission">
        <div class="mission-box">
            <p class="page-title">
                <span>任务内容显示</span>
                <span class="close-btn" @click="closeItem('mission')"><i class="el-icon-circle-close"></i></span>
            </p>
            <div class="mission-content">
                <el-form ref="form" :model="form" inline class="from-content" size="mini">
                    <el-form-item label="当前任务编号：" label-width="120px">
                        <el-select v-model="form.missionCode" placeholder="请选择" style="width:300px" @change="selectMission">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当前任务名称：" label-width="120px">
                        <el-input disabled v-model="form.missionName" style="width:300px"></el-input>
                    </el-form-item>
                    <br />
                    <el-form-item label="当前任务模式：" label-width="120px">
                        <el-radio-group disabled v-model="form.missionType">
                            <el-radio :label="0">定深投放</el-radio>
                            <el-radio :label="1">距底定距离投放</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="当前任务状态：" label-width="120px">
                        <el-radio-group disabled v-model="form.missionStatus">
                            <el-radio :label="0">等待执行</el-radio>
                            <el-radio :label="1">正在执行</el-radio>
                            <el-radio :label="2">执行完成</el-radio>
                            <el-radio :label="3">已经取消</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <br />
                    <el-form-item label="每次投放间隔(秒)：" label-width="145px">
                        <el-input disabled type="number" v-model="form.timesThrowSec" style="width:70px"></el-input>
                    </el-form-item>
                    <el-form-item label="距底安全深度(米)：" label-width="145px">
                        <el-input disabled type="number" v-model="form.securityDeepMet" style="width:72px"></el-input>
                    </el-form-item>
                    <el-form-item label="设定深度(米)：" label-width="120px">
                        <el-input disabled type="number" v-model="form.settingDepth" style="width:70px"></el-input>
                    </el-form-item>
                    <el-form-item label="设定投放次数(次)：" label-width="135px">
                        <el-input disabled type="number" v-model="form.settingThrowTimes" style="width:65px"></el-input>
                    </el-form-item>
                    <el-form-item label="当前投放次数(次)：" label-width="135px">
                        <el-input disabled type="number" v-model="form.thisSettingThrowTimes" style="width:65px"></el-input>
                    </el-form-item>
                </el-form>
                <div class="btn-content">
                    <div class="left-btn-area">
                        <el-button type="danger" @click="cancelMission" :disabled='cancelBtn'>取消当前任务</el-button>
                        <el-button type="success" @click="startingMission" :disabled='startBtn'>开始执行任务</el-button>
                    </div>
                    <el-button type="primary" class="create-btn" @click="createMission">增加任务</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="新增任务" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
            <div>
                <el-form ref="dialogFrom" :model="dialogFrom" label-width="120px">
                    <el-form-item label="新任务名称">
                        <el-input v-model="dialogFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="任务工作模式">
                        <el-radio-group v-model="dialogFrom.resource">
                            <el-radio :label="0">定深投放</el-radio>
                            <el-radio :label="1">距底定距投放</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="设定深度(米)">
                        <el-input v-model="dialogFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="设定投放次数(次)">
                        <el-input v-model="dialogFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="每次投放间隔(秒)">
                        <el-input v-model="dialogFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="距底安全深度(米)">
                        <el-input v-model="dialogFrom.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" style="margin-right:20px">取 消</el-button>
                <el-button type="primary" @click="createMissionDialogBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'mission',
    data() {
        return {
            options: [{
                value: '1',
                label: '2020年09月18日09:43:00'
            }, {
                value: '2',
                label: '2020年09月18日09:43:03'
            }, {
                value: '3',
                label: '2020年09月18日09:43:07'
            }, {
                value: '4',
                label: '2020年09月18日09:43:12'
            }, {
                value: '5',
                label: '2020年09月18日09:43:15'
            }],
            startBtn: false,
            cancelBtn: false,
            dialogVisible: false,
            labelPosition: 'right',
            form: {
                missionCode: '1',
                missionName: '2020年09月10日任务1',
                missionType: 1,
                missionStatus: 2,
                timesThrowSec: '50000',
                securityDeepMet: '204444',
                settingDepth: '20033',
                settingThrowTimes: '2111',
                thisSettingThrowTimes: '2222'
            },
            dialogFrom: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    mounted() {

    },
    methods: {
        closeItem(ele) {
            this.$emit('sendEleName', ele);
        },
        startingMission() {
            this.$confirm('是否开始任务？', '提示', {
                confirmButtonText: '开始',
                cancelButtonText: '取消',
                type: 'info'
            }, 'info').then(() => {
                this.$message({
                    type: 'success',
                    message: '任务已开始!'
                });
                this.startBtn = true;
                this.cancelBtn = false;
            }).catch(() => {

            });
        },
        cancelMission() {
            this.$confirm('是否取消当前任务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '任务已取消!'
                });
                this.cancelBtn = true;
                this.startBtn = false;
            }).catch(() => {

            });
        },
        createMission() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = true;
        },
        createMissionDialogBtn() {
            this.dialogVisible = false;
        }, 
        selectMission() {
            console.log(this.form.missionCode)
        }
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
    min-width: 1350px;
    position: relative;
}
.from-content {
    margin-top: 10px;
    margin-left: 5px;
}
.btn-content {
    position: absolute;
    top: 10px;
    right: 20px;
    display: flex;
    justify-content: center;
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
    right: 5px;
    top: 0px;
    cursor: pointer;
    color: #303133;
}
.left-btn-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 12px;
}
.left-btn-area .el-button {
    display: block;
    height: 50px;
    width: 100px;
    white-space: normal;
}
.btn-content .create-btn {
    display: block;
    height: 120px;
}
.el-button + .el-button {
    margin-left: 0;
}
</style>