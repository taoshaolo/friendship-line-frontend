import axios from "axios";
import {showFailToast} from "vant";


const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    // timeout: 1000,
});

// 设置请求头
myAxios.defaults.withCredentials = true;

export default myAxios;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("我收到你的响应了", response.data)
    // 2xx 范围内的状态码都会触发该函数。
    if (response?.data?.code === 40100) {
        showFailToast("未登录")
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    if (response?.data?.code === 40101){
        showFailToast("无权限")
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});