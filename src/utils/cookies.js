export const saveAuthToCookie = (value) => {
  document.cookie = `user_auth = ${value}`;
};

export const getAuthFromCookie = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_auth\s*=|s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

export const removeAuthCookie = () => {};
