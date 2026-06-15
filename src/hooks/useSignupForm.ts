import { useRef, useState } from 'react';
import { SignupFormData } from '../types/auth';
import { EMAIL_REGEX, ID_REGEX, KOREAN_REGEX, PW_REGEX } from '../utils/validation';
import { useCheckIdMutation } from './mutations/useCheckIdMutation';
import { useSignupMutation } from './mutations/useSignupMutation';
import { useNavigate } from 'react-router-dom';
import { validateSignup } from '../utils/validators/signupValidator';

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

  //  실시간 에러메세지 상태
  const [errors, setErrors] = useState<ErrorState>({});

  // 아이디 중복확인 성공 상태
  const [idSuccessMessage, setIdSuccessMessage] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);

  const { mutate: checkIdMutate } = useCheckIdMutation();
  const { mutate: signUpMutate } = useSignupMutation();

  // ===== field change handler =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 상태 업데이트
    setUserInfo((state) => ({
      ...state,
      [name]: value,
    }));

    // 에러메세지 초기화
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    if (name === 'id') {
      setIsIdValid(false);
      setIdSuccessMessage('');
      if (!value) {
        setErrors((prev) => ({ ...prev, id: '아이디를 입력해주세요.' }));
      } else if (KOREAN_REGEX.test(value)) {
        setErrors((prev) => ({ ...prev, id: '아이디에 한글은 사용할 수 없습니다.' }));
      } else if (!ID_REGEX.test(value)) {
        setErrors((prev) => ({ ...prev, id: '6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.' }));
      }
    }

    if (name === 'pw' || name === 'pwConfirm') {
      const currentPw = name === 'pw' ? value : userInfo.pw;
      const currentConfirm = name === 'pwConfirm' ? value : userInfo.pwConfirm;

      let pwError = '';
      let confirmError = '';

      // ===== password validation =====
      if (currentPw && !PW_REGEX.test(currentPw)) {
        pwError = '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.';
      }
      if (currentConfirm && currentPw !== currentConfirm) {
        confirmError = '비밀번호가 일치하지 않습니다.';
      }

      setErrors((prev) => ({ ...prev, pw: pwError, pwConfirm: confirmError }));
    }

    if (name === 'email') {
      if (value && !EMAIL_REGEX.test(value)) {
        setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      }
    }
  };

  // ===== 아이디 중복 확인 =====
  const handleIdCheck = () => {
    if (!userInfo.id) {
      setErrors((prev) => ({ ...prev, id: '아이디를 입력해주세요.' }));
      return;
    }

    // 안전장치
    if (KOREAN_REGEX.test(userInfo.id) || !ID_REGEX.test(userInfo.id)) {
      return;
    }

    checkIdMutate(userInfo.id, {
      onSuccess: (res) => {
        if (!res) {
          setErrors((prev) => ({ ...prev, id: '사용 불가능한 ID 입니다. 다시 입력 후 중복 확인을 해주세요.' }));
          setIsIdValid(false);
          setIdSuccessMessage('');
        } else {
          setErrors((prev) => ({ ...prev, id: '' }));
          setIdSuccessMessage('사용 가능한 ID 입니다.');
          setIsIdValid(true);
        }
      },

      onError: () => {
        console.error('아이디 중복확인 실패');
      },
    });
  };

  // ===== 회원가입 버튼 클릭 =====
  const handleSignup = () => {
    const error = validateSignup(userInfo, isIdValid);

    if (error) {
      setErrors((prev) => ({ ...prev, [error.field]: error.message }));
      inputRefs.current[error.field]?.focus();
      return;
    }

    signUpMutate(userInfo, {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      },
      onError: (error) => {
        console.error('회원가입 실패', error);
      },
    });
  };

  return {
    userInfo,
    errors,
    idSuccessMessage,
    isIdValid,
    handleChange,
    handleIdCheck,
    handleSignup,
    inputRefs,
  };
};
