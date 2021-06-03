<template>
    <div id="app">
        <Index />
    </div>
</template>

<script>
import Index from "./components/index.vue"
import request from "@/utils/request.js";
export default {
    name: "App",
    components: {
        Index
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
}

</style>
