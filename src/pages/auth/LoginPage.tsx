import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { checkFirstVisit } from '../../api/authApi';

import { ROUTES } from '../../constants/routes';

import IsLoginPopup from './components/IsLoginPopup';
import FirstVisitPopup from './components/FirstVisitPopup';

import { ID_REGEX, PW_REGEX } from '../../utils/validation';

import { useLoginMutation } from '../../hooks/mutations/useLoginMutation';

type LoginFormData = {
  username: string;
  password: string;
};

type LoginErrorData = {
  username: string;
  password: string;
  submit: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate } = useLoginMutation();

  // 상태 관리
  const [userLogin, setUserLogin] = useState<LoginFormData>({ username: '', password: '' }); // 로그인 입력값 상태 관리
  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 토글 상태
  const [isSignupCompletePopupOpen, setSignupCompletePopupOpen] = useState(false); // 회원가입 완료 팝업
  const [isFirstVisitPopupOpen, setFirstVisitPopupOpen] = useState(false); // 관심사 선택창 팝업
  const [loginErrorMessage, setLoginErrorMessage] = useState<LoginErrorData>({ username: '', password: '', submit: '' }); // 로그인 에러 메세지

  const validateField = (name: string, value: string) => {
    if (value === '') return '';

    if (name === 'username') {
      return ID_REGEX.test(value) ? '' : '아이디는 영문, 숫자 조합 6~15자여야 합니다.';
    }

    if (name === 'password') {
      return PW_REGEX.test(value) ? '' : '비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.';
    }

    return '';
  };

  // 아이디, 비밀번호 입력값 변경 및 유효성 검사
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLoginErrorMessage((prev) => ({
      ...prev,
      [name]: validateField(name, value),
      submit: '',
    }));
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
          if (res === 'fail') {
            setLoginErrorMessage((prev) => ({
              ...prev,
              submit: '아이디 또는 비밀번호를 다시 확인해주세요',
            }));
            return;
          }

          try {
            const firstAtRes = await checkFirstVisit();

            if (firstAtRes === 'Y') {
              setFirstVisitPopupOpen(true);
            } else {
              navigate(ROUTES.MAIN);
            }
          } catch (error) {
            console.error('방문 확인 실패:', error);
          }
        },
      },
    );
  };

  const currentErrorMessage = loginErrorMessage.username || loginErrorMessage.password || loginErrorMessage.submit;

  return (
    <>
      <div className="flex min-h-screen">
        <div className="max-[1024px]:hidden flex-1 bg-login-back"></div>
        <div className="flex w-full flex-[0_0_700px] items-center justify-center laptop-lg:max-w-[600px]">
          <div className="flex flex-col">
            <div className="mx-auto h-[143px] w-[190px] bg-login-woman"></div>
            <div className="mb-[30px] text-center text-[25px] laptop-lg:text-xl">
              다양한 경험, 소중한 추억
              <br />
              <span className="font-McLaren text-[#00822b]">ReadPick</span>에서 한번 만나보세요
            </div>
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
              <input
                name="username"
                type="text"
                placeholder="아이디를 입력해주세요."
                maxLength={15}
                value={userLogin.username}
                onChange={handleChange}
                autoComplete="username"
                className="input-box"
              />

              <div className="relative">
                <input
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요."
                  maxLength={15}
                  value={userLogin.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="input-box"
                />

                <span className="absolute right-[15px] top-[16px] cursor-pointer" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              {currentErrorMessage && <p className="relative text-[14px] text-[red]">{currentErrorMessage}</p>}

              <button
                type="submit"
                disabled={!ID_REGEX.test(userLogin.username) || !PW_REGEX.test(userLogin.password)}
                className="border-borderLightColor bg-pointColor mb-[20px] mt-[15px] h-[50px] w-[400px] cursor-pointer rounded-[5px] border text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 laptop-lg:max-w-[350px]"
              >
                로그인
              </button>

              <div className="text-[rgb(43, 43, 43)] flex w-[250px] items-center justify-between text-[14px]">
                <button type="button" className="hover:underline" onClick={() => navigate(ROUTES.MEMBER)}>
                  회원가입
                </button>
                <button type="button" className="hover:underline">
                  아이디 찾기
                </button>
                <button type="button" className="hover:underline">
                  비밀번호 찾기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isFirstVisitPopupOpen && (
        <FirstVisitPopup
          onConfirm={() => {
            setFirstVisitPopupOpen(false);
            setSignupCompletePopupOpen(true);
          }}
          onClose={() => {
            setFirstVisitPopupOpen(false);
          }}
        />
      )}

      {isSignupCompletePopupOpen && <IsLoginPopup />}
    </>
  );
};
export default LoginPage;
