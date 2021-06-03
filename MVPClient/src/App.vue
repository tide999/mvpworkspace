<template>
    <div id="app">
        <video class="alert-video" id="alertPlayer" loop :src="media" controls="controls"></video>
        <video class="alert-video" id="alertPlayer1" loop :src="media1" controls="controls"></video>
        <video class="alert-video" id="alertPlayer2" loop :src="media2" controls="controls"></video>
        <transition name="" enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutLeft">
            <div class="show-drawer" v-show="!drawer" @mouseenter="showDrawer">
                <!-- <div class="show-drawer" v-show="!drawer" @click="showDrawer"> -->
                <span><i class="el-icon-right"></i></span>
            </div>
        </transition>
        <el-drawer class="drawerEvent" :visible.sync="drawer" :modal="false" size="800px" direction="ltr" :with-header="false">
            <div class="insideDrawerContent">
                <p class="componentsitem" @click="showContent('mission')">任务内容</p>
                <p class="componentsitem" @click="showContent('winch')">绞车信息</p>
                <p class="componentsitem" @click="showContent('apparatus')">仪器数据</p>
            </div>
            <div class="form-area">
                <p class="alert-title">报警信息 <el-button @click="mute" size="mini" :type="novoice == false ? 'warning' : 'danger'"><span v-show="novoice == false">警报静音</span><span v-show="novoice == true">解除静音</span></el-button>
                </p>
                <!-- <div class="alert-content">
                    <div class="empty"></div>
                    <div style="padding-bottom: 20px" v-for="(item, $index) in alertArray" :key="$index">
                        <span>({{ $index + 1 }}) {{ item.timeTag }}</span>
                        <br />
                        <span>{{ item.dptName }}</span>
                        <br />
                        <span>{{ item.alarmDescription }}</span>
                    </div>
                </div> -->
                <div class="alert-content">
                    <el-table :data="alertArray" border size='mini' style="width: 100%">
                        <el-table-column label="报警时间" align='center'>
                            <template slot-scope="scope">
                                {{scope.row.timeTags}}
                            </template>
                        </el-table-column>
                        <el-table-column label="报警来源" align='center'>
                            <template slot-scope="scope">
                                {{scope.row.dptName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="报警内容" align='center'>
                            <template slot-scope="scope">
                                {{scope.row.alarmDescription}}
                            </template>
                        </el-table-column>
                        <el-table-column label="报警等级" align='center' width="80">
                            <template slot-scope="scope">
                                {{scope.row.alarmType}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-drawer>
        <Mission @sendEleName="getMsg" />
        <div class="btm-content">
            <Winch @sendEleName="getMsg" @contrlEleName="getContrlEle" :pageSize="pageSize" />
            <Apparatus @sendEleName="getMsg" @contrlEleName="getContrlEle" :pageSize="pageSize" />
        </div>
    </div>
</template>

<script>
import Winch from "./components/winch.vue";
import Mission from "./components/mission.vue";
import Apparatus from "./components/apparatus.vue";
import request from "@/utils/request.js";
export default {
    name: "App",
    data() {
        return {
            alertArray: [],
            ele: [],
            drawer: false,
            pageSize: true,
            timeInterval: "",
            thistime: "",
            novoice: false,
            isnovoicebtn: '警报静音',
            isvoicebtn: '解除静音',
            player: null,
            player1: null,
            player2: null,
            media: '',
            media1: '',
            media2: '',
        };
    },
    beforeMount() {
        let getMedia = null;
        let _this = this;
        getMedia = window.setInterval(() => {
            if (localStorage.getItem('media')) {
                window.clearInterval(getMedia);
                let mediaArr = [];
                mediaArr = JSON.parse(localStorage.getItem('media'));
                // console.log(mediaArr);
                _this.media = mediaArr[0]
                _this.media1 = mediaArr[1]
                _this.media2 = mediaArr[2]
            }
        }, 100)
    },
    mounted() {
        let _this = this;

        let mission = localStorage.getItem('mission');
        let winch = localStorage.getItem('winch');
        let apparatus = localStorage.getItem('apparatus');

        // console.log(mission, winch, apparatus);
        if (mission == 'hide') {
            document.getElementById('mission').style.display = "none";
            document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - document.getElementById("mission").clientHeight + "px";
        }
        if (winch == 'hide') {
            document.getElementById('winch').style.display = "none";
        }
        if (apparatus == 'hide') {
            if (winch == 'show') {
                this.pageSize = false;
                document.getElementById("winch").style.width = "100%";
            }
            document.getElementById('apparatus').style.display = "none";

        }

        this.getAlert();
        document.getElementsByClassName("el-drawer")[0].onmouseleave = function () {
            _this.drawer = false;
        };
        this.player = document.getElementById("alertPlayer");
        this.player1 = document.getElementById("alertPlayer1");
        this.player2 = document.getElementById("alertPlayer2");
    },
    components: {
        Winch,
        Mission,
        Apparatus,
    },
    methods: {
        /**
         * @description: 报警静音
         * @param {*}
         * @return {*}
         */
        mute() {
            this.player2.muted = this.player2.muted ? false : true;
            this.novoice = this.player2.muted;
        },
        /**
         * @description: 定时器获取报警信息
         * @param {*}
         * @return {*}
         */
        getAlert() {
            let _this = this;
            window.clearInterval(this.timeInterval);
            this.timeInterval = window.setInterval((res) => {
                _this.getAlarmRealtime({
                    time: _this.thistime,
                    limit: 1,
                    // time:'',
                    // limit:'',
                });
            }, 1000);
        },
        getContrlEle(data) {
            this.pageSize = data.switch;
            document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - document.getElementById("mission").clientHeight + "px";
            if (data.switch == true) {
                document.getElementById("winch").style.width = "300px";
                document.getElementById("apparatus").style.width = "100%";
            } else {
                document.getElementById("winch").style.width = "100%";
                document.getElementById("apparatus").style.width = "300px";
            }
        },
        checkEleArr(name) {
            if (this.ele.indexOf(name) == -1) {
                return false;
            } else {
                return true;
            }
        },
        /**
         * @description: 显示系统信息模块
         * @param {*}
         * @return {*}
         */
        showDrawer() {
            this.drawer = true;
            document.getElementsByClassName('show-drawer')[0].style.left = '-24px';
            document.getElementsByClassName('show-drawer')[0].classList.remove('linking');
            this.player.currentTime = 0;
            this.player1.currentTime = 0;
            this.player2.currentTime = 0;
            this.player.pause();
            this.player1.pause();
            this.player2.pause();
        },
        /**
         * @description:模块关闭功能 
         * @param {*} ev
         * @return {*}
         */
        getMsg(ev) {
            if (typeof ev == 'string') {
                if (this.ele.indexOf(ev) == -1) {
                    this.ele.push(ev);
                } else {
                    for (var i in this.ele) {
                        if (this.ele[i] == ev) {
                            this.ele.splice(i, 1);
                        }
                    }
                }
            } else {
                if (this.ele.indexOf(ev.ele) == -1) {
                    this.ele.push(ev.ele);
                } else {
                    for (var i in this.ele) {
                        if (this.ele[i] == ev.ele) {
                            this.ele.splice(i, 1);
                        }
                    }
                }
            }
            if (ev.ele == "mission") {
                if (ev.btn == 'close') {
                    document.getElementById(ev.ele).style.display = "none";
                    document.getElementsByClassName("btm-content")[0].style.height = "99%";
                } else if (ev.btn == 'shrink') {
                    if (document.getElementById("mission").clientHeight < 100) {
                        document.getElementsByClassName("btm-content")[0].style.height = "81%";
                    } else {
                        document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - 42 + "px";
                    }
                }
            } else {
                document.getElementById(ev).style.display = "none";
                if (ev == "apparatus") {
                    document.getElementById("winch").style.marginRight = 0;
                }

                if (document.getElementById("winch").style.display == "none" && document.getElementById("apparatus").style.display == "none" && document.getElementById("mission").clientHeight > 100) {
                    document.getElementsByClassName("btm-content")[0].style.height = "81%";
                } else if (document.getElementById("winch").style.display == "none" && document.getElementById("apparatus").style.display == "none" && document.getElementById("mission").clientHeight < 100 ) {
                    document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - 42 + "px";
                } else if (document.getElementById("winch").style.display == "none" && document.getElementById("mission").clientHeight < 100) {
                    if (document.getElementById("winch").style.display == "none" && getComputedStyle(document.getElementById("mission"), null)["display"] == "none") {
                        document.getElementsByClassName("btm-content")[0].style.height = "99%";
                    } else {
                        document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - document.getElementById("mission").clientHeight + "px";
                    }
                } else if (document.getElementById("apparatus").style.display == "none" && document.getElementById("mission").clientHeight < 100) {
                    if (document.getElementById("apparatus").style.display == "none" && getComputedStyle(document.getElementById("mission"), null)["display"] == "none") {
                        document.getElementsByClassName("btm-content")[0].style.height = "99%";
                    } else {
                        document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - document.getElementById("mission").clientHeight + "px";
                    }
                } else if (document.getElementById("mission").clientHeight < 100) {
                    document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - 42 + "px";
                } else {
                    document.getElementsByClassName("btm-content")[0].style.height = "81%";
                }
            }
        },
        /**
         * @description: 模块开启功能
         * @param {*} ele
         * @return {*}
         */
        showContent(ele) {
            document.getElementById(ele).style.display = "block";
            if (ele == "apparatus") {
                if(document.getElementById('winch').style.width == '100%'){
                    document.getElementById('winch').style.width = '300px';
                    this.pageSize = true;
                }
                document.getElementById("winch").style.marginRight = "8px";
            }
            if (ele == "mission") {
                if (document.getElementById("mission").clientHeight > 100) {
                    document.getElementsByClassName("btm-content")[0].style.height = "81%";
                } else {
                    document.getElementsByClassName("btm-content")[0].style.height = document.body.clientHeight - 42 + "px";
                }
            }
            for (var i in this.ele) {
                if (this.ele[i] == ele) {
                    this.ele.splice(i, 1);
                }
            }
        },
        /**
         * @description: 获取报警信息
         * @param {*}
         * @return {*}
         */
        async getAlarmRealtime(row) {
            let _this = this;
            let result = await request({
                url: "/sys-define/get_alarm_realtime",
                method: "get",
                params: {
                    start_time: row.time,
                    limit: '',
                },
            });
            try {
                if (result.data.length > 0) {
                    let alertArr = [];
                    _this.thistime = result.data[0].timeTag;
                    for (let i in result.data) {
                        result.data[i].timeTags = new Date(result.data[i].timeTag).getFullYear() + '-' + (new Date(result.data[i].timeTag).getMonth() + 1 < 10 ? '0' + (new Date(result.data[i].timeTag).getMonth() + 1) : new Date(result.data[i].timeTag).getMonth() + 1) + '-' + (new Date(result.data[i].timeTag).getDate() < 10 ? '0' + new Date(result.data[i].timeTag).getDate() : new Date(result.data[i].timeTag).getDate()) + ' ' + (new Date(result.data[i].timeTag).getHours() < 10 ? '0' + new Date(result.data[i].timeTag).getHours() : new Date(result.data[i].timeTag).getHours()) + ':' + (new Date(result.data[i].timeTag).getMinutes() < 10 ? '0' + new Date(result.data[i].timeTag).getMinutes() : new Date(result.data[i].timeTag).getMinutes()) + ':' + (new Date(result.data[i].timeTag).getSeconds() < 10 ? '0' + new Date(result.data[i].timeTag).getSeconds() : new Date(result.data[i].timeTag).getSeconds());
                        if (row.time != '') {
                            _this.alertArray.unshift(result.data[i]);
                            alertArr.push(result.data[i].alarmType);
                        } else {
                            _this.alertArray.push(result.data[i]);
                        }
                    }
                    if (row.time != '') {
                        document.getElementsByClassName('show-drawer')[0].style.left = '0px';
                        document.getElementsByClassName('show-drawer')[0].classList.add('linking');
                        _this.player.currentTime = 0;
                        _this.player1.currentTime = 0;
                        _this.player2.currentTime = 0;
                        _this.player.pause();
                        _this.player1.pause();
                        _this.player2.pause();
                        if (alertArr.includes(0) == true) {
                            _this.novoice = false;
                            _this.player.play();
                            return
                        } else if (alertArr.includes(1) == true) {
                            _this.novoice = false;
                            _this.player1.play();
                            return
                        } else {
                            _this.player2.play();
                            _this.player2.muted = _this.novoice;
                        }
                    }
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #606266;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#app::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.alert-video {
    position: fixed;
    top: 0;
    width: 300px;
    height: 60px;
    z-index: 999;
    display: none;
}
.btm-content {
    width: 99%;
    height: 81%;
    display: flex;
    margin-top: 8px;
}
#mission {
    width: 99%;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    margin-top: 8px;
    border-radius: 8px;
}
#winch {
    width: 300px;
    height: 98%;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    margin-right: 8px;
    overflow: hidden;
    border-radius: 8px;
}
#apparatus {
    width: 100%;
    height: 98%;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    overflow: hidden;
    border-radius: 8px;
}
.el-input__inner {
    padding: 0;
}
.little-tips-content {
    position: fixed;
    top: 0;
    right: 100px;
    display: flex;
    z-index: 999999;
}
.little-tips-content .tips-item {
    background: #fff;
    height: 30px;
    line-height: 30px;
    margin: 0 5px 0 5px;
    padding: 0 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #fff;
    box-shadow: 0px 3px 3px #888;
    cursor: pointer;
}
.show-drawer {
    position: fixed;
    top: 250px;
    left: -24px;
    z-index: 2009;
    background: #ffffff;
    height: 48px;
    width: 48px;
    font-size: 24px;
    line-height: 52px;
    text-align: center;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    box-shadow: 0px 2px 2px #888;
    transition: left 1s;
    -moz-transition: left 1s; /* Firefox 4 */
    -webkit-transition: left 1s; /* Safari 和 Chrome */
    -o-transition: left 1s; /* Opera */
    cursor: pointer;
}

@-webkit-keyframes twinkling {
    /*透明度由0到1*/
    0% {
        opacity: 0.2; /*透明度为0*/
    }
    100% {
        opacity: 1; /*透明度为1*/
    }
}
.linking {
    background: red;
    color: #ffffff;
    -webkit-animation: twinkling 0.4s infinite linear;
}
.linking::after {
    display: block;
    content: "";
    top: 8px;
    left: 7px;
    position: absolute;
    border: 1px solid #ffffff !important;
    border-radius: 50%;
    height: 30px;
    width: 30px;
}
.show-drawer::after {
    display: block;
    content: "";
    top: 8px;
    left: 7px;
    position: absolute;
    border: 1px solid #303133;
    border-radius: 50%;
    height: 30px;
    width: 30px;
}
.show-drawer:hover {
    left: 0;
    background: #303133;
    color: #fff;
}
.insideDrawerContent {
    width: 100%;
    padding: 10px 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.insideDrawerContent .componentsitem {
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 8px;
    margin: 0 5px;
    color: #303133;
    width: 33%;
}
.isActives {
    color: #409eff;
    font-weight: 600;
    border-color: #409eff;
}
.insideDrawerContent p:hover {
    box-shadow: 1px 3px 3px #ccc;
    color: #409eff;
    font-weight: 600;
    border: 2px solid #409eff;
}
.el-drawer {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.form-area {
    padding: 0 15px;
    height: calc(100% - 65px);
}
.alert-content {
    /* border: 1px solid #ccc; */
    /* border-radius: 5px; */
    text-align: center;
    overflow: auto;
    /* height: calc(100% - 40px); */
    height: 340px;
    position: relative;
    font-size: 12px;
}
.alert-title {
    color: #303133;
    background: #fff;
    height: 32px;
    margin: 0;
    padding: 3px 0;
    font-size: 16px;
    font-weight: 600;
}
.el-drawer__body {
    height: 100%;
}
.el-drawer.ltr,
.el-drawer.rtl,
.el-drawer__container {
    height: 480px !important;
}
</style>
