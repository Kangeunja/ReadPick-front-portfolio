// react
import React, { useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// MUI
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// api
import { checkFirstVisit } from "../../api/authApi";

// Hooks
import { useLoginMutation } from "../../hooks/mutations/useLoginMutation";

// Components
import IsLoginPopup from "../popup/IsLoginPopup";
import FirstVisitPopup from "./FirstVisitPopup";

// Constants
import { ROUTES } from "../../constants/routes";

// Utils
import { ID_REGEX, PW_REGEX } from "../../utils/validation";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate } = useLoginMutation();

  // 상태 관리
  const [userLogin, setUserLogin] = useState({ username: "", password: "" }); // 로그인 입력값 상태 관리
  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 토글 상태
  const [isLoginPopup, setLoginPopup] = useState(false); // 회원가입 완료 팝업
  const [isShowPopup, setShowPopup] = useState(false); // 관심사 선택창 팝업

  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // 로그인 에러 메세지

  const validateField = (name: string, value: string) => {
    if (value === "") return "";

    if (name === "username") {
      return ID_REGEX.test(value) ? "" : "영문, 숫자 조합 6~15자여야 합니다.";
    }

    if (name === "password") {
      return PW_REGEX.test(value)
        ? ""
        : "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.";
    }

    return "";
  };

  // 아이디 정규식 검사 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLoginErrorMessage(validateField(name, value));
  };

  // 로그인 api 함수
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        id: userLogin.username,
        pw: userLogin.password,
      },
      {
        onSuccess: async (res) => {
          if (res === "fail") {
            setLoginErrorMessage("아이디 또는 비밀번호를 다시 확인해주세요");
            return;
          }

          try {
            const firstAtRes = await checkFirstVisit();

            if (firstAtRes === "Y") {
              setShowPopup(true);
            } else {
              navigate(ROUTES.MAIN);
            }
          } catch (error) {
            console.error("방문 확인 실패:", error);
          }
        },
      },
    );
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 bg-login-back max-[1024px]:hidden"></div>
        <div
          className="w-full flex-[0_0_700px] flex justify-center items-center
          laptop-lg:max-w-[600px]
        "
        >
          <div className="flex flex-col">
            <div className="w-[190px] h-[143px] bg-reading-woman mx-auto"></div>
            <div className="text-center text-[25px] mb-[30px] laptop-lg:text-xl">
              다양한 경험, 소중한 추억
              <br />
              <span className="text-[#00822b] font-McLaren">ReadPick</span>에서
              한번 만나보세요
            </div>
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
              <input
                name="username"
                className="w-[400px] h-[50px] border border-[#bcbcbc] rounded-[5px]
                p-[15px] box-border mb-5 text-base laptop-lg:max-w-[350px]
                "
                type="text"
                placeholder="아이디를 입력해주세요."
                maxLength={15}
                value={userLogin.username}
                onChange={handleChange}
                autoComplete="username"
              />

              <div className="relative">
                <input
                  name="password"
                  className="w-[400px] h-[50px] border border-[#bcbcbc] rounded-[5px]
                  p-[15px] box-border mb-5 text-base laptop-lg:max-w-[350px]"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  maxLength={15}
                  value={userLogin.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <span
                  className="absolute right-[15px] top-[16px] cursor-pointer"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              </div>
              {loginErrorMessage && (
                <p className="text-[red] text-[14px] relative bottom-[5px]">
                  {loginErrorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-[400px] h-[50px] border border-[#bcbcbc] rounded-[5px]
                  bg-[#329e79] text-base mt-[30px] mb-[20px] text-[white] cursor-pointer
                  disabled:bg-[#329e79] 
                  disabled:bg-opacity-30 
                  disabled:cursor-not-allowed
                  laptop-lg:max-w-[350px]
                "
                disabled={
                  !ID_REGEX.test(userLogin.username) ||
                  !PW_REGEX.test(userLogin.password)
                }
              >
                로그인
              </button>

              <div
                className="w-[300px] justify-between flex font-normal text-[rgb(43, 43, 43)]
                laptop-lg:max-w-[260px]
              "
              >
                <button
                  type="button"
                  className="hover:text-[rgb(92,92,92)]"
                  onClick={() => navigate(ROUTES.MEMBER)}
                >
                  회원가입
                </button>
                <button type="button" className="hover:text-[rgb(92,92,92)]">
                  아이디 찾기
                </button>
                <button type="button" className="hover:text-[rgb(92,92,92)]">
                  비밀번호 찾기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isShowPopup && (
        <FirstVisitPopup
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
export default LoginForm;
