import { EMAIL_REGEX, ID_REGEX, KOREAN_REGEX, PW_REGEX } from './validation';

// 아이디 실시간 포맷 검증
export const checkIdLive = (value: string, currentId?: string) => {
  if (!value) return '아이디를 입력해주세요.';
  if (value === currentId) return '현재 아이디와 동일합니다.';
  if (KOREAN_REGEX.test(value)) return '아이디에 한글은 사용할 수 없습니다.';
  if (!ID_REGEX.test(value)) return '6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.';
  return '';
};

// 비밀번호 규칙 검증
export const checkPwLive = (pw: string, currentPw?: string) => {
  if (!pw) return '비밀번호를 입력해주세요.';
  if (!PW_REGEX.test(pw)) return '영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.';
  if (currentPw && pw === currentPw) return '현재 비밀번호와 다르게 입력해주세요.';
  return '';
};

// 비밀번호 확인 검증
export const checkPwConfirmLive = (pw: string, confirmPw: string) => {
  if (!confirmPw) return '비밀번호 확인을 입력해주세요.';
  if (pw !== confirmPw) return '비밀번호가 일치하지 않습니다.';
  return '';
};

// 이메일 실시간 검증
export const checkEmailLive = (email: string) => {
  if (!email) return '이메일을 입력해주세요.';
  if (!EMAIL_REGEX.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return '';
};

// 이름 실시간 검증
export const checkUserNameLive = (userName: string) => {
  if (!userName) return '이름을 입력해주세요.';
  return '';
};

// 닉네임 실시간 검증
export const checkNickNameLive = (nickName: string) => {
  if (!nickName) return '닉네임을 입력해주세요.';
  return '';
};
