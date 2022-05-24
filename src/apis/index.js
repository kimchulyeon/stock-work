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
    baseURL: "http://localhost:3004/",
    timeout: 1000 * 30,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return setInterceptors(instance);
};

const instance = createInstance();

// 회원가입
export const registerUser = (userdata) => {
  return instance.post("signup", userdata);
};

// 로그인
export const loginUser = (userdata) => {
  return instance.post("login", userdata);
};
