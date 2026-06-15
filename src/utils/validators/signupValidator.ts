import { SignupFormData } from '../../types/auth';
import { EMAIL_REGEX, ID_REGEX, PW_REGEX } from '../validation';

export const validateSignup = (userInfo: SignupFormData, isIdValid: boolean) => {
  const fields = [
    {
      name: 'id',
      checks: [
        { condition: !userInfo.id, message: '아이디를 입력해주세요.' },
        {
          condition: !ID_REGEX.test(userInfo.id),
          message: '아이디는 6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.',
        },
        { condition: !isIdValid, message: '아이디 중복확인 해주세요' },
      ],
    },

    {
      name: 'pw',
      checks: [
        { condition: !userInfo.pw, message: '비밀번호를 입력해주세요.' },
        {
          condition: !PW_REGEX.test(userInfo.pw),
          message: '비밀번호는 영문과 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
        },
      ],
    },

    {
      name: 'pwConfirm',
      checks: [
        {
          condition: !userInfo.pwConfirm,
          message: '비밀번호 확인을 입력해주세요.',
        },
        {
          condition: userInfo.pw !== userInfo.pwConfirm,
          message: '비밀번호가 일치하지 않습니다.',
        },
      ],
    },

    {
      name: 'userName',
      checks: [{ condition: !userInfo.userName, message: '이름을 입력해주세요.' }],
    },

    {
      name: 'nickName',
      checks: [{ condition: !userInfo.nickName, message: '닉네임을 입력해주세요.' }],
    },

    {
      name: 'email',
      checks: [
        { condition: !userInfo.email, message: '이메일을 입력해주세요.' },
        {
          condition: !EMAIL_REGEX.test(userInfo.email),
          message: '유효한 이메일 주소를 입력해주세요.',
        },
      ],
    },
  ];

  for (const field of fields) {
    for (const check of field.checks) {
      if (check.condition) {
        return {
          field: field.name,
          message: check.message,
        };
      }
    }
  }

  return null;
};
