import axios from "axios";
import qs from "qs";
import { message } from "ant-design-vue";

const axiosInstance = axios.create({
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

axiosInstance.interceptors.request.use(
  // (config) => config,
  (config) => {
    // do something before request is sent
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // debugger;
    // location.href = `/cas/login?service=${encodeURIComponent(location.href)}`;
    // return;
    return response.data;
  },
  (error) => {
    let errorMessage = "";
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "错误请求";
          break;
        case 401:
          /* TODO 待调整 */
          location.href = `${location.protocol}//${location.host}/gateway/user/api/users/login`;
          return;
        case 403:
          errorMessage = "拒绝访问";
          break;
        case 404:
          errorMessage = "请求错误,未找到该资源";
          break;
        case 405:
          errorMessage = "请求方法未允许";
          break;
        case 408:
          errorMessage = "请求超时";
          break;
        case 500:
          errorMessage = "服务器端出错";
          break;
        case 501:
          errorMessage = "网络未实现";
          break;
        case 502:
          errorMessage = "网络错误";
          break;
        case 503:
          errorMessage = "服务不可用";
          break;
        case 504:
          errorMessage = "网络超时";
          break;
        case 505:
          errorMessage = "http版本不支持该请求";
          break;
        default:
          errorMessage = `连接错误${error.response.status}`;
      }
    } else {
      errorMessage = "请求超时";
    }
    message.destroy();
    message.error(errorMessage);
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
