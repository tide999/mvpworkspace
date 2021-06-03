import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
if (process.env !== "production") {
    // axios.defaults.baseURL = "http://localhost:8080/api/";
    axios.defaults.baseURL = localStorage.getItem('mvpip') + '/api/'
}
// if (process.env.VUE_APP_FLAG === "buildtest") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
// if (process.env.VUE_APP_FLAG === "prod") {
//     axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
// }
axios.defaults.headers.post["Content-Type"] = "application/json";

function request(options) {
    return axios(options)
        .then(res => {
            return res;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export default request;

// async getJsonDate(row) {
// let _this = this;
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