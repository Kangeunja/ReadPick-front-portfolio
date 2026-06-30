import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckIdMutation, useSignupMutation } from 'hooks/mutations/useAuthMutation';

import { checkEmailLive, checkIdLive, checkNickNameLive, checkPwConfirmLive, checkPwLive, checkUserNameLive } from 'utils/liveValidator';
import { validateFormSubmit } from 'utils/submitValidator';

import { SignupFormData } from 'types/auth';
import { ROUTES } from 'constants/routes';

type ErrorState = Partial<Record<keyof SignupFormData, string>>;

export const useSignupForm = () => {
  const navigate = useNavigate();

  // 모든 input 요소들의 위치(참조값)를 저장하는 보관함
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // 회원정보 입력 폼 상태
  const [userInfo, setUserInfo] = useState<SignupFormData>({
    userName: '',
    nickName: '',
    id: '',
    pw: '',
    pwConfirm: '',
    email: '',
  });

  const [validation, setValidation] = useState({
    idMessage: '',
    pwMessage: '',
    pwConfirmMessage: '',
    userNameMessage: '',
    nickNameMessage: '',
    emailMessage: '',
  });

  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwConfirmValid, setIsPwConfirmValid] = useState(false);

  //  실시간 에러메세지 상태
  const [errors, setErrors] = useState<ErrorState>({});

  const { mutate: checkIdMutate } = useCheckIdMutation();
  const { mutate: signUpMutate } = useSignupMutation();

  // ===== field change handler =====
  const handleChange = (name: string, value: string) => {
    setUserInfo((state) => ({ ...state, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: '' }));

    setValidation((prev) => {
      const nextValidation = { ...prev };

      const currentPw = name === 'pw' ? value : userInfo.pw;
      const currentConfirm = name === 'pwConfirm' ? value : userInfo.pwConfirm;

      if (name === 'id') {
        setIsIdValid(false);
        nextValidation.idMessage = checkIdLive(value);
      }

      if (name === 'pw') {
        nextValidation.pwMessage = checkPwLive(value);
        if (currentConfirm) {
          const errorMsg = checkPwConfirmLive(value, currentConfirm);

          if (errorMsg) {
            setIsPwConfirmValid(false);
            nextValidation.pwConfirmMessage = errorMsg;
          } else {
            setIsPwConfirmValid(true);
            nextValidation.pwConfirmMessage = '비밀번호가 일치합니다.';
          }
        }
      }

      if (name === 'pwConfirm') {
        const errorMsg = checkPwConfirmLive(currentPw, value);
        if (errorMsg) {
          setIsPwConfirmValid(false);
          nextValidation.pwConfirmMessage = errorMsg;
        } else {
          setIsPwConfirmValid(true);
          nextValidation.pwConfirmMessage = '비밀번호가 일치합니다.';
        }
      }

      if (name === 'userName') {
        nextValidation.userNameMessage = checkUserNameLive(value);
      }

      if (name === 'nickName') {
        nextValidation.nickNameMessage = checkNickNameLive(value);
      }

      if (name === 'email') {
        nextValidation.emailMessage = checkEmailLive(value);
      }
      return nextValidation;
    });
  };

  // ===== 아이디 중복 확인 =====
  const handleIdCheck = () => {
    setErrors((prev) => ({ ...prev, id: '' }));

    const currentLiveMsg = checkIdLive(userInfo.id);
    if (!userInfo.id || currentLiveMsg !== '') {
      return setValidation((prev) => ({
        ...prev,
        idMessage: currentLiveMsg || '올바른 ID 형식을 입력한 후 중복확인을 해주세요.',
      }));
    }

    checkIdMutate(userInfo.id, {
      onSuccess: (res) => {
        const isAvailable = res.result;
        setIsIdValid(isAvailable);
        setValidation((prev) => ({
          ...prev,
          idMessage: isAvailable ? '사용 가능한 ID 입니다.' : '사용 불가능한 ID 입니다.',
        }));
      },
      onError: () => {
        console.error('아이디 중복확인 실패');
        setIsIdValid(false);
        setValidation((prev) => ({
          ...prev,
          idMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        }));
      },
    });
  };

  // ===== 회원가입 버튼 클릭 =====
  const handleSignup = () => {
    const error = validateFormSubmit({
      formData: userInfo,
      isIdValid: isIdValid,
      isPwCheckMode: true,
      liveValidation: validation,
    });

    if (error) {
      setErrors((prev) => ({ ...prev, [error.field]: error.message }));
      inputRefs.current[error.field]?.focus();
      return;
    }

    signUpMutate(userInfo, {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다!');
        navigate(ROUTES.MAIN);
      },
      onError: (error) => {
        console.error('회원가입 실패', error);
      },
    });
  };

  return {
    userInfo,
    errors,
    isIdValid,
    isPwConfirmValid,
    handleChange,
    handleIdCheck,
    handleSignup,
    inputRefs,
    validation,
  };
};
