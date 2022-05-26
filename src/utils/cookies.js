// 사용자 토큰 쿠키에 저장
export const saveAuthToCookie = (value) => {
  document.cookie = `user_auth = ${value}`;
};

// 쿠키에 저장된 사용자 토큰 난독화 후 가져오기
export const getAuthFromCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_auth\s*=|s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

export const removeAuthCookie = () => {};
