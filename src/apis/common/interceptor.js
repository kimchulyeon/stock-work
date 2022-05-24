import store from "@/store/index";

export const setInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      // 요청 전에 실행
      config.headers.Authorization = store.state.token;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
