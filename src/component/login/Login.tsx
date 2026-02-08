import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import MemberLoginPopup from "../popup/MemberLoginPopup";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import "../../assets/css/login.css";
import IsLoginPopup from "../popup/IsLoginPopup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // 회원가입 완료 팝업
  const [isLoginPopup, setLoginPopup] = useState(false);

  // 관심사 선택창 팝업
  const [isShowPopup, setShowPopup] = useState(false);

  // 로그인 에러 메세지
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // 정규식 입력 함수
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // 아이디
    if (name === "username") {
      const fitered = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
      const idRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
      if (!idRegex.test(fitered) && fitered !== "") return;

      setUserLogin((prev) => ({
        ...prev,
        username: fitered,
      }));

      if (loginErrorMessage) setLoginErrorMessage("");
    }

    // 비밀번호
    if (name === "password") {
      setUserLogin((prev) => ({
        ...prev,
        password: value,
      }));

      if (loginErrorMessage) setLoginErrorMessage("");
    }
    // let newValue = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 제거

    // if (name === "username") {
    //   const idRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
    //   if (!idRegex.test(newValue)) return;
    // }
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // 로그인 비활성화 로직
  const isLoginDisabled = !userLogin.username || !userLogin.password;

  // 로그인 api
  const handleLogin = () => {
    axiosInstance
      .post("/login", {
        id: userLogin.username,
        pw: userLogin.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          setUserInfo(res.data);
          axiosInstance
            .get("/firstAt")
            .then((res) => {
              if (res.data === "Y") {
                setShowPopup(true);
              } else {
                navigate("/");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setLoginErrorMessage("아이디 또는 비밀번호를 다시 확인해주세요");
        }
        // else {
        //   alert("해당 회원은 존재하지 않습니다");
        // }
      })
      .catch((error) => {
        console.log("Member Login failed", error);
      });
  };

  return (
    <>
      <div className="login-layout">
        <div className="login-main-img"></div>
        <div className="login-panel">
          <div className="login-panel-inner">
            <div className="login-visual"></div>
            <div className="login-title">
              다양한 경험, 소중한 추억
              <br />
              <span>ReadPick</span>에서 한번 만나보세요
            </div>
            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault(); // 페이지 새로고침 방지
                handleLogin(); // 기존 로직 그대로
              }}
            >
              <input
                name="username"
                className="login-input"
                type="text"
                placeholder="아이디를 입력해주세요."
                maxLength={15}
                value={userLogin.username}
                onChange={handleChange}
                autoComplete="username"
              />

              <div className="login-input-pw">
                <input
                  name="password"
                  className="login-input"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  // maxLength={15}
                  value={userLogin.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <span
                  className="login-toggle-visibility"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              </div>
              {loginErrorMessage && (
                <p className="login-Error">{loginErrorMessage}</p>
              )}

              <button
                type="submit"
                className="login-submit"
                // onClick={handleLogin}
                disabled={isLoginDisabled}
              >
                로그인
              </button>

              <div className="login-actions">
                <button onClick={() => navigate("/member")}>회원가입</button>
                <button>아이디 찾기</button>
                <button>비밀번호 찾기</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isShowPopup && (
        <MemberLoginPopup
          onClose={() => {
            setShowPopup(false);
            setLoginPopup(true);
          }}
        />
      )}

      {isLoginPopup && <IsLoginPopup />}
    </>
  );
};
export default Login;
