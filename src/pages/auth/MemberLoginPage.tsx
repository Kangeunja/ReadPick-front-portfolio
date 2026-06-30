import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import FormField from 'component/common/FormField';

import { ROUTES } from 'constants/routes';

import { useSignupForm } from './hooks/useSignupForm';

const MemberLogin = () => {
  const navigate = useNavigate();
  const { userInfo, errors, isIdValid, isPwConfirmValid, handleChange, handleIdCheck, handleSignup, inputRefs, validation } =
    useSignupForm();

  // 토글 상태변화모드
  const [visibility, setVisibility] = useState({
    pw: false,
    confirmPw: false,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
      }}
      className="relative mx-auto box-border w-[500px] border border-borderLightColor p-[20px] laptop-lg:mb-[50px] laptop-lg:p-[25px]"
    >
      <div className="absolute left-[8px] top-[-25px] flex w-[480px] justify-between text-[13px]">
        <p>2/2</p>
        <p>
          <span className="mr-[5px] text-red-600">*</span>
          필수입력사항
        </p>
      </div>

      <div className="mb-[40px] text-center text-[20px]">회원가입</div>

      <div className="flex flex-col items-center gap-[20px]">
        <FormField
          id="id"
          direction="row"
          label="아이디"
          required={true}
          placeholder="6~15자의 영문 혹은 영문+숫자 조합"
          maxLength={15}
          ref={(el) => (inputRefs.current.id = el)}
          value={userInfo.id}
          onChange={(value) => handleChange('id', value)}
          actionSlot={
            <button
              type="button"
              className="h-[35px] whitespace-nowrap border border-borderLightColor bg-gray-50 px-[15px] text-[12px] leading-[35px] hover:border-pointColor"
              onClick={handleIdCheck}
            >
              중복확인
            </button>
          }
          messageSlot={
            <p className={`mt-[5px] block w-[260px] text-xs ${!isIdValid || errors.id ? 'text-[#ff0004]' : 'text-[#008000]'}`}>
              {errors.id || validation.idMessage}
            </p>
          }
        />

        <FormField
          id="pw"
          direction="row"
          label="비밀번호"
          required={true}
          type={visibility.pw ? 'text' : 'password'}
          placeholder="영문과 숫자를 포함하여 8자 이상"
          isFullWidth={true}
          maxLength={15}
          ref={(el) => (inputRefs.current.pw = el)}
          value={userInfo.pw}
          onChange={(value) => handleChange('pw', value)}
          rightSlot={
            visibility.pw ? (
              <VisibilityIcon onClick={() => setVisibility((prev) => ({ ...prev, pw: !prev.pw }))} />
            ) : (
              <VisibilityOffIcon
                onClick={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    pw: !prev.pw,
                  }))
                }
              />
            )
          }
          messageSlot={<p className="mt-[5px] block w-[260px] text-xs text-[#ff0004]">{validation.pwMessage}</p>}
        />

        <FormField
          id="pw"
          direction="row"
          label="비밀번호 확인"
          required={true}
          type={visibility.confirmPw ? 'text' : 'password'}
          placeholder="영문과 숫자를 포함하여 8자 이상"
          isFullWidth={true}
          maxLength={15}
          ref={(el) => (inputRefs.current.pwConfirm = el)}
          value={userInfo.pwConfirm}
          onChange={(value) => handleChange('pwConfirm', value)}
          rightSlot={
            visibility.confirmPw ? (
              <VisibilityIcon
                onClick={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    confirmPw: !prev.confirmPw,
                  }))
                }
              />
            ) : (
              <VisibilityOffIcon
                onClick={() =>
                  setVisibility((prev) => ({
                    ...prev,
                    confirmPw: !prev.confirmPw,
                  }))
                }
              />
            )
          }
          messageSlot={
            <p className={`block w-[260px] text-xs ${!isPwConfirmValid ? 'text-[#ff0004]' : 'text-[#008000]'} `}>
              {validation.pwConfirmMessage}
            </p>
          }
        />

        <FormField
          id="userName"
          direction="row"
          label="이름"
          required={true}
          placeholder="이름을 입력해주세요"
          isFullWidth={true}
          maxLength={15}
          ref={(el) => (inputRefs.current.userName = el)}
          value={userInfo.userName}
          onChange={(value) => handleChange('userName', value)}
          messageSlot={<p className="mt-[5px] block w-[260px] text-xs text-[#ff0004]">{validation.userNameMessage}</p>}
        />

        <FormField
          id="nickName"
          direction="row"
          label="닉네임"
          required={true}
          placeholder="닉네임을 입력해주세요"
          isFullWidth={true}
          maxLength={15}
          ref={(el) => (inputRefs.current.nickName = el)}
          value={userInfo.nickName}
          onChange={(value) => handleChange('nickName', value)}
          messageSlot={<p className="mt-[5px] block w-[260px] text-xs text-[#ff0004]">{validation.nickNameMessage}</p>}
        />

        <FormField
          id="email"
          direction="row"
          label="이메일"
          required={true}
          placeholder="이메일을 입력해주세요"
          isFullWidth={true}
          maxLength={15}
          ref={(el) => (inputRefs.current.email = el)}
          value={userInfo.email}
          onChange={(value) => handleChange('email', value)}
          messageSlot={<p className="mt-[5px] block w-[260px] text-xs text-[#ff0004]">{validation.emailMessage}</p>}
        />
      </div>

      <div className="mt-[40px] flex justify-center gap-[30px]">
        <button type="button" className="member-btn hover:bg-gray-500" onClick={() => navigate(ROUTES.MEMBER)}>
          취소
        </button>
        <button type="submit" className="member-btn hover:bg-pointColor">
          회원가입
        </button>
      </div>
    </form>
  );
};
export default MemberLogin;
