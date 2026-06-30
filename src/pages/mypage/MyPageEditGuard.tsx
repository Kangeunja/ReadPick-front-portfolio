import { useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import MyPageEdit from './components/MyPageEdit';

import { MyPageOutletContext } from '../../types/mypage';

const MyPageEditGuard = () => {
  const { userInfo, fetchUserInfo } = useOutletContext<MyPageOutletContext>();

  const [password, setPassword] = useState(''); // 입력 중인 비밀번호
  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 표시여부
  const [passwordError, setPasswordError] = useState<string | null>(null); // 에러 메세지
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 인증 성공 여부

  // 비밀번호 확인 로직
  const handlePasswordConfirm = () => {
    if (!password) return;

    if (userInfo.pw === password) {
      setPasswordError(null);
      setIsPasswordVerified(true);
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePasswordConfirm();
  };

  if (isPasswordVerified) {
    return <MyPageEdit userInfo={userInfo} fetchUserInfo={fetchUserInfo} />;
  }

  return (
    <div className="mb-[200px] box-border w-full pt-[50px]">
      <div className="mx-auto flex w-main-w flex-col items-center">
        <div className="mb-[31px] box-border flex h-[50px] w-[50px] items-center justify-center rounded-[50px] bg-[#ffe019]">
          <div className="bg-icon-pw-check h-[18px] w-[14px]"></div>
        </div>

        <div className="text-center">
          <p className="mb-[11px] text-[20px] font-medium">비밀번호 확인</p>
          <p className="mb-[41px] text-[15px] text-[#454545]">
            회원님의 안전한 개인정보변경을 위해
            <br />
            비밀번호를 다시 입력해주세요.
          </p>
        </div>

        <div className="relative mb-4 w-[363px]">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            className={`peer relative box-border h-[54px] w-full rounded-[5px] border border-[#e0e0e0] p-[23px_12px_8px] text-[16px] ${password ? 'has-value' : ''}`}
            placeholder=""
            required
            value={password}
            onKeyDown={handlePasswordKeyDown}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(null);
            }}
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#9a9a9a] transition-all duration-200 ease-in-out peer-focus:top-[16px] peer-focus:text-[11px] peer-focus:text-[#454545] peer-[.has-value]:top-[16px] peer-[.has-value]:text-[11px] peer-[.has-value]:text-[#454545]"
          >
            비밀번호 입력<span className="text-[#b80000]">*</span>
          </label>

          <span
            className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center text-[#9a9a9a] hover:text-[#454545]"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>

        <button
          className={`mb-[30px] h-[45px] w-[363px] rounded-[5px] border-none bg-[#1e7373] text-white ${!password ? 'cursor-not-allowed bg-[#a0a0a0]' : 'cursor-pointer'}`}
          onClick={handlePasswordConfirm}
        >
          확인
        </button>

        {passwordError && <p className="text-[14px] text-red-600">{passwordError}</p>}
      </div>
    </div>
  );
};

export default MyPageEditGuard;
