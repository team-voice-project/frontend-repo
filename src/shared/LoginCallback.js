import qs from "qs";
import axios from "axios";
import { setCookie } from "./Cookie";
import { useDispatch } from "react-redux";
import user, { actionCreators as userActions } from "../redux/modules/user";
// url 도메인 값 알아보는 방법
// https://accounts.google.com -> const platform = 'google'
// https://nid.naver.com -> const platform = 'naver'
// https://kauth.kakao.com -> const platform = 'kakao'
//   .get(`http://54.180.82.210/api/auth/${platform}/callback?code=${code}`)
const getPlatform = () => {
  let platform = null;
  const FULL_URL = document.location.href;

  if (FULL_URL.indexOf("api/auth/google") > -1) {
    platform = "google";
  } else if (FULL_URL.indexOf("api/auth/naver") > -1) {
    platform = "naver";
  } else if (FULL_URL.indexOf("api/auth/kakao") > -1) {
    platform = "kakao";
  } else {
    platform = null;
  }

  console.log(FULL_URL);
  return platform;
};

const LoginCallback = ({ history }) => {
  const dispatch = useDispatch();
  const platform = getPlatform();
  console.log(platform);

  const { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  axios
    .get(`http://54.180.82.210/api/auth/${platform}/callback?code=${code}`)
    .then((res) => {
      console.log("통신 완료", res);
      const user = res.data.user.nickname;
      const userToken = res.data.user.jwtToken;
      console.log("쿠키 저장");
      setCookie("OAO", `__OAO-nick=${user}__OAO-token=${userToken}`, 3);

      dispatch(userActions.setUser({ user: user, is_login: true }));
      history.push("/edit/profile");
    })
    .catch((err) => {
      console.log("통신 실패", err);
      window.alert("로그인을 다시 시도해주세요!");
      history.push("/login");
    });
  console.log(code);
  return <div>테스트</div>;
};

export default LoginCallback;
