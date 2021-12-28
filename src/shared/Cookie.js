// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
  const hasOAO = document.cookie.indexOf("OAO=") > -1;
  if (!hasOAO) {
    return;
  }
  const token = document.cookie
    .split("OAO=")
    .filter((parts) => !parts.indexOf("__OAO-"))[0]
    .split("__OAO-token=")[1];

  return token;
};

// 쿠키에 저장하는 함수
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  // 날짜를 만들어줍니다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  let expires = "; expires=" + date.toGMTString();
  // 저장!
  document.cookie = name + "=" + value + expires + "; path=/";
};

// 만료일을 예전으로 설정해 쿠키를 지웁니다.
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { setCookie, deleteCookie, getCookie };
