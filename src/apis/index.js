import axios from "axios";
import { setInterceptors } from "@/apis/common/interceptor";

// 로그인 페이지로 이동
// const toLogin = () => {
// 	router.replace({
// 		path: "/login",
// 		query: {
// 			redirect: router.currentRoute.fullPath,
// 		},
// 	});
// };

// 엑시오스 초기화 함수
const createInstance = () => {
  const instance = axios.create({
    baseURL: "",
    timeout: 1000 * 30,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return setInterceptors(instance);
};

const instance = createInstance();

// JSON GET
export const get = (url, params = {}, responseType = "json") => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
        responseType,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// JSON POST
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// 나중에 변경 예정
// 회원가입
export const registerUser = (userdata) => {
  return instance.post("signup", userdata);
};

// 로그인
export const loginUser = (userdata) => {
  return instance.post("login", userdata);
};
