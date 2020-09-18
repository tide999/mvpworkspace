<template>
    <div id="app">
        <transition name="" enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutLeft">
            <div class="show-drawer" v-show="!drawer" @click="showDrawer">
                <span><i class="el-icon-right"></i></span>
            </div>
        </transition>
        <el-drawer :visible.sync="drawer" :modal="false" size="15%" direction='ltr' :with-header="false">
            <div class="insideDrawerContent">
                <p @click="showContent('mission')">任务内容显示</p>
                <p @click="showContent('winch')">绞车信息显示</p>
                <p @click="showContent('apparatus')">仪器数据显示</p>
            </div>
        </el-drawer>
        <Mission @sendEleName="getMsg" />
        <div class="btm-content">
            <Winch @sendEleName="getMsg" @contrlEleName='getContrlEle' :pageSize="pageSize" />
            <Apparatus @sendEleName="getMsg" @contrlEleName='getContrlEle' :pageSize="pageSize" />
        </div>
    </div>
    <!-- 
        echarts 点击事件在重新渲染后初始化
        echarts 定时器渲染导致内存溢出
     -->
</template>

<script>
import Winch from './components/winch.vue'
import Mission from './components/mission.vue'
import Apparatus from './components/apparatus.vue'

export default {
    name: 'App',
    data() {
        return {
            ele: [],
            drawer: false,
            pageSize: true,
        }
    },
    mounted() {
    },
    components: {
        Winch, Mission, Apparatus
    },
    methods: {
        getContrlEle(data) {
            this.pageSize = data.switch;
            if (data.switch == true) {
                document.getElementById('winch').style.width = '200px';
                document.getElementById('apparatus').style.width = '100%';
            } else {
                document.getElementById('winch').style.width = '100%';
                document.getElementById('apparatus').style.width = '200px';
            }

        },
        checkEleArr(name) {
            if (this.ele.indexOf(name) == -1) {
                return false
            } else {
                return true
            }
        },
        showDrawer() {
            this.drawer = true;
        },
        getMsg(ev) {
            if (this.ele.indexOf(ev) == -1) {
                this.ele.push(ev);
            } else {
                for (var i in this.ele) {
                    if (this.ele[i] == ev) {
                        this.ele.splice(i, 1);
                    }
                }
            }
            document.getElementById(ev).style.display = 'none';
            if (ev == 'mission') {
                document.getElementsByClassName('btm-content')[0].style.height = '100%';
                document.getElementById('winch').style.borderTopLeftRadius = '10px';
                document.getElementById('apparatus').style.borderTopRightRadius = '10px';
            }
            if (this.ele.length == 2) {
                document.getElementById('apparatus').style.borderTopLeftRadius = '10px';
                document.getElementById('apparatus').style.borderTopRightRadius = '10px';
            }
        },
        showContent(ele) {
            document.getElementById(ele).style.display = 'block';
            if (ele == 'mission') {
                document.getElementsByClassName('btm-content')[0].style.height = '77%'
                document.getElementById('winch').style.borderTopLeftRadius = '0px';
                document.getElementById('apparatus').style.borderTopRightRadius = '0px';
            }
            for (var i in this.ele) {
                if (this.ele[i] == ele) {
                    this.ele.splice(i, 1);
                }
            }
            if (this.ele.length < 2) {
                document.getElementById('apparatus').style.borderTopLeftRadius = '0px';
                document.getElementById('apparatus').style.borderTopRightRadius = '0px';
            }
        }
    }
}
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btm-content {
    /* height: auto; */
    width: 99%;
    height: 77%;
    display: flex;
    margin-top: 8px;
}
#mission {
    /* border-radius: 10px; */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 99%;
    height: 22%;
    min-height: 187px;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    margin-top: 8px;
}
#winch {
    border-bottom-left-radius: 10px;
    width: 200px;
    height: 98%;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    margin-right: 8px;
    overflow: auto;
}
#apparatus {
    border-bottom-right-radius: 10px;
    /* flex: 1; */
    width: 100%;
    /* width: calc(100% - 200px); */
    height: 98%;
    background: #fff;
    box-shadow: 1px 3px 3px #f60;
    overflow: auto;
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
    /* display: flex; */
    z-index: 999999;
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
    padding: 10px 10px;
}
.insideDrawerContent p {
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 10px 0;
    color: #303133;
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
</style>
