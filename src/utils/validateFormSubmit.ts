import { UserProfileUpdateForm } from 'types/auth';

interface ValidateFormArgs {
  formData: UserProfileUpdateForm;
  isIdValid: boolean;
  isPwCheckMode?: boolean;
  liveValidation: {
    idMessage?: string;
    pwMessage?: string;
    pwConfirmMessage?: string;
    emailMessage?: string;
  };
}

export const signupValidation = ({ formData, isIdValid, liveValidation }: ValidateFormArgs) => {
  // 아이디 검증
  if (!formData.id) return { field: 'id', message: '아이디를 입력해주세요.' };
  if (liveValidation.idMessage && liveValidation.idMessage !== '사용 가능한 ID 입니다.')
    return { field: 'id', message: liveValidation.idMessage };
  if (!isIdValid) return { field: 'id', message: '아이디 중복확인이 필요합니다.' };

  // 비밀번호 & 비밀번호 확인검증
  if (!formData.pw) return { field: 'pw', message: '비밀번호를 입력해주세요.' };
  if (liveValidation.pwMessage) return { field: 'pw', message: liveValidation.pwMessage };
  if (!formData.pwConfirm) return { field: 'pwConfirm', message: '비밀번호 확인을 입력해주세요.' };
  if (liveValidation.pwConfirmMessage && liveValidation.pwConfirmMessage !== '비밀번호가 일치합니다.')
    return { field: 'pwConfirm', message: liveValidation.pwConfirmMessage };

  // 이름 검증
  if (!formData.userName) return { field: 'userName', message: '이름을 입력해주세요.' };

  // 닉네임 검증
  if (!formData.nickName) return { field: 'nickName', message: '닉네임을 입력해주세요.' };

  // 이메일 검증
  if (!formData.email) return { field: 'email', message: '이메일을 입력해주세요.' };
  if (liveValidation.emailMessage) return { field: 'email', message: liveValidation.emailMessage };

  return null;
};

export const myPageValidation = ({ formData, isIdValid, isPwCheckMode = true, liveValidation }: ValidateFormArgs) => {
  // 닉네임 검증
  if (!formData.nickName) return { field: 'nickName', message: '닉네임을 입력해주세요.' };

  // 이름 검증
  if (!formData.userName) return { field: 'userName', message: '이름을 입력해주세요.' };

  // 아이디 검증
  if (!formData.id) return { field: 'id', message: '아이디를 입력해주세요.' };
  if (liveValidation.idMessage && liveValidation.idMessage !== '사용 가능한 ID 입니다.')
    return { field: 'id', message: liveValidation.idMessage };
  if (!isIdValid) return { field: 'id', message: '아이디 중복확인이 필요합니다.' };

  // 비밀번호 검증
  if (isPwCheckMode) {
    if (formData.hasOwnProperty('currentPw')) {
      if (!formData.currentPw) return { field: 'currentPw', message: '현재 비밀번호를 입력해주세요.' };
      if (!formData.pw) return { field: 'newPw', message: '새 비밀번호를 입력해주세요.' };
      if (liveValidation.pwMessage) return { field: 'newPw', message: liveValidation.pwMessage };
      if (!formData.pwConfirm) return { field: 'confirmPw', message: '새 비밀번호 확인을 입력해주세요.' };
    } else {
      if (!formData.pw) return { field: 'pw', message: '비밀번호를 입력해주세요.' };
      if (liveValidation.pwMessage) return { field: 'pw', message: liveValidation.pwMessage };
      if (!formData.pwConfirm) return { field: 'pwConfirm', message: '비밀번호 확인을 입력해주세요.' };
      if (liveValidation.pwConfirmMessage && liveValidation.pwConfirmMessage !== '비밀번호가 일치합니다.')
        return { field: 'pwConfirm', message: liveValidation.pwConfirmMessage };
    }
  }

  // 이메일 검증
  if (!formData.email) return { field: 'email', message: '이메일을 입력해주세요.' };
  if (liveValidation.emailMessage) return { field: 'email', message: liveValidation.emailMessage };

  return null;
};
