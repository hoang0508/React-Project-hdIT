import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // accesstoken persit
    const access_token = store.getState()?.auth?.account?.access_token;
    // config header token
    config.headers["Authorization"] = "Bearer " + access_token;
    NProgress.start();
    NProgress.inc();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response?.data ? response?.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error?.message ? error?.message : Promise.reject(error);
  }
);

export default instance;
