import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { ROUTES } from '../../../constants/routes';

import { useSignupForm } from '../../../hooks/useSignupForm';

const MemberLogin = () => {
  const navigate = useNavigate();
  const { userInfo, errors, idSuccessMessage, isIdValid, handleChange, handleIdCheck, handleSignup, inputRefs } = useSignupForm();

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 입력창 토글
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // 비밀번호 확인창 토글

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
      }}
      className="border-borderLightColor relative mx-auto box-border w-[500px] border p-[20px] laptop-lg:mb-[50px] laptop-lg:p-[25px]"
    >
      <div className="absolute left-[8px] top-[-25px] flex w-[480px] justify-between text-[13px]">
        <p>2/2</p>
        <p>
          <span className="mr-[5px] text-red-600">*</span>
          필수입력사항
        </p>
      </div>

      <div className="mb-[40px] text-center text-[20px]">회원가입</div>

      <div className="mb-[40px] leading-[40px]">
        <div className="flex flex-col items-center gap-[20px]">
          {[
            {
              label: '아이디',
              name: 'id',
              type: 'text',
              placeholder: '6~15자의 영문 혹은 영문+숫자 조합',
              hasButton: true,
              successMessage: idSuccessMessage,
              isSuccess: isIdValid,
              isFullWidth: false,
              maxLength: 15,
            },

            {
              label: '비밀번호',
              name: 'pw',
              type: showPassword ? 'text' : 'password',
              placeholder: '영문과 숫자를 포함하여 8자 이상',
              isPassword: true,
              visible: showPassword,
              toggle: () => setShowPassword(!showPassword),
              isFullWidth: true,
              maxLength: 15,
            },

            {
              label: '비밀번호 확인',
              name: 'pwConfirm',
              type: showPasswordConfirm ? 'text' : 'password',
              placeholder: '비밀번호를 한번 더 입력해주세요.',
              isPassword: true,
              visible: showPasswordConfirm,
              toggle: () => setShowPasswordConfirm(!showPasswordConfirm),
              isFullWidth: true,
              maxLength: 15,
            },

            {
              label: '이름',
              name: 'userName',
              type: 'text',
              placeholder: '이름을 입력해주세요',
              isFullWidth: true,
              maxLength: 15,
            },

            {
              label: '닉네임',
              name: 'nickName',
              type: 'text',
              placeholder: '닉네임을 입력해주세요',
              isFullWidth: true,
              maxLength: 15,
            },

            {
              label: '이메일',
              name: 'email',
              type: 'text',
              placeholder: '이메일을 입력해주세요',
              isFullWidth: true,
              maxLength: 100,
            },
          ].map((field) => {
            const currentError = errors[field.name as keyof typeof errors];
            const hasMessage = currentError || field.successMessage;
            return (
              <div key={field.name} className="flex items-center">
                <div className="flex w-[115px]">
                  <p className="text-[14px]">{field.label}</p>
                  <p className="text-red-600">*</p>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-[10px]">
                    <div className="relative">
                      <input
                        ref={(el) => (inputRefs.current[field.name] = el)}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        value={userInfo[field.name as keyof typeof userInfo]}
                        onChange={handleChange}
                        className={`border-borderLightColor float-right box-border h-[35px] border p-[10px] text-[12px] ${field.isFullWidth ? 'w-[290px]' : 'w-[205px]'}`}
                      />
                      {field.isPassword && (
                        <div className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer">
                          {field.visible ? <VisibilityIcon onClick={field.toggle} /> : <VisibilityOffIcon onClick={field.toggle} />}
                        </div>
                      )}
                    </div>

                    {field.hasButton && (
                      <button
                        type="button"
                        className="hover:border-pointColor border-borderLightColor h-[35px] whitespace-nowrap border bg-gray-50 px-[15px] text-[12px] leading-[35px]"
                        onClick={handleIdCheck}
                      >
                        중복확인
                      </button>
                    )}
                  </div>

                  {hasMessage && (
                    <p
                      className={`mt-[5px] block w-[260px] text-xs ${errors[field.name as keyof typeof errors] || !field.isSuccess ? 'text-red-600' : 'text-green-600'}`}
                    >
                      {currentError || field.successMessage}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-[30px]">
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
