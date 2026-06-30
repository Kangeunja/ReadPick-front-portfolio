import { useState } from 'react';
import { User } from '../../../types/user';
import {
  checkIdLive,
  checkPwLive,
  checkPwConfirmLive,
  checkEmailLive,
  checkUserNameLive,
  checkNickNameLive,
} from '../../../utils/liveValidator';

import { useDeleteProfileImageMutation, useUpdateProfileMutation, useUpdateUserInfoMutation } from './useUserInfoQueries';

import { ROUTES } from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { validateFormSubmit } from '../../../utils/submitValidator';
import { useCheckIdMutation } from 'hooks/mutations/useAuthMutation';

export const useMyPageEdit = ({ userInfo }: any) => {
  const navigate = useNavigate();
  const { mutate: checkIdMutate } = useCheckIdMutation();
  const { mutateAsync: uploadProfileImage } = useUpdateProfileMutation();
  const { mutateAsync: updateUserInfoMutate } = useUpdateUserInfoMutation();
  const { mutateAsync: deleteProfileImageAsync } = useDeleteProfileImageMutation();

  const [editInfo, setEditInfo] = useState({ ...userInfo });

  // 아이디 중복확인 상태(메세지,글자색)
  const [idValidation, setIdValidation] = useState({ message: '', isValid: false });
  // 아이디 변경하기 버튼 클릭시 상태변화모드
  const [idEditMode, setIdEditMode] = useState<'default' | 'checking' | 'confirmed'>('default');

  // 비밀번호 변경하기 버튼 클릭시 ui 상태변화모드
  const [pwEditMode, setPwEditMode] = useState<'default' | 'checking'>('default');
  const [passwordForm, setPasswordForm] = useState({
    currentPw: '',
    newPw: '',
    confirmPw: '',
  });
  // 비밀번호 유효성 상태
  const [passwordValidation, setPwValidation] = useState({
    currentPwMessage: '',
    newPwMessage: '',
    confirmPwMessage: '',
    isCurrentPwValid: false,
    isNewPwValid: false,
    isConfirmPwValid: false,
  });

  // 나머지 메세지 상태
  const [infoValidation, setInfoValidation] = useState({
    nickNameMessage: '',
    userNameMessage: '',
    emailMessage: '',
    isValid: false,
  });

  const [error, setError] = useState<{ field: string; message: string } | null>(null);
  // UI 및 모달 상태
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 기본 정보 변경
  const handleInfoChange = (field: string, value: string) => {
    setEditInfo((prev: any) => ({ ...prev, [field]: value }));

    if (field === 'nickName') {
      setInfoValidation((prev) => ({ ...prev, nickNameMessage: checkNickNameLive(value) }));
    }
    if (field === 'userName') {
      setInfoValidation((prev) => ({ ...prev, userNameMessage: checkUserNameLive(value) }));
    }
    if (field === 'email') {
      setInfoValidation((prev) => ({ ...prev, emailMessage: checkEmailLive(value) }));
    }
  };

  // 아이디 실시간 유효성 검사
  const handleIdChange = (value: string) => {
    setEditInfo((prev: User) => ({ ...prev, id: value }));

    let message = checkIdLive(value, userInfo.id);

    if (!message) {
      message = '중복확인이 필요합니다.';
    }

    setIdValidation({ message, isValid: false });
  };

  // 아이디 변경 모드 진입
  const startIdCheckMode = () => {
    setIdEditMode('checking');
  };

  // 아이디 중복확인
  const handleIdCheck = async () => {
    const liveMessage = checkIdLive(editInfo.id, userInfo.id);
    if (!editInfo.id || liveMessage !== '') {
      return setIdValidation({
        message: liveMessage || '올바른 ID 형식을 입력한 후 중복확인을 해주세요.',
        isValid: false,
      });
    }

    checkIdMutate(editInfo.id, {
      onSuccess: (res) => {
        const isAvailable = res.data !== false;
        setIdValidation({
          message: isAvailable ? '사용 가능한 ID 입니다.' : '사용 불가능한 ID 입니다.',
          isValid: isAvailable,
        });
      },
      onError: () => {
        console.error('아이디 중복확인 실패');
      },
    });
  };

  // 아이디 변경 취소
  const cancelIdEdit = () => {
    setEditInfo((prev: any) => ({ ...prev, id: userInfo.id }));
    setIdEditMode('default');
    setIdValidation({ message: '', isValid: false });
  };

  // 비밀번호 변경 모드 진입
  const startPwCheckMode = () => {
    setPwEditMode('checking');
  };

  // 비밀번호 실시간 유효성 검사
  const handlePwChange = (field: string, value: string) => {
    const nextPasswordForm = { ...passwordForm, [field]: value };
    setPasswordForm(nextPasswordForm);

    let nextValidation = { ...passwordValidation };

    if (field === 'currentPw') {
      nextValidation.currentPwMessage = value ? '' : '현재 비밀번호를 입력해주세요.';
      nextValidation.isCurrentPwValid = !!value;
    }
    console.log(nextValidation.isCurrentPwValid);

    if (field === 'newPw') {
      const msg = checkPwLive(value, nextPasswordForm.currentPw);
      nextValidation.newPwMessage = msg;
      nextValidation.isNewPwValid = msg === '';
    }

    if (field === 'confirmPw' || field === 'newPw') {
      if (nextPasswordForm.confirmPw) {
        const msg = checkPwConfirmLive(nextPasswordForm.newPw, nextPasswordForm.confirmPw);
        nextValidation.confirmPwMessage = msg === '' ? '비밀번호가 일치합니다.' : msg;
        nextValidation.isConfirmPwValid = msg === '';
      } else {
        nextValidation.confirmPwMessage = '';
        nextValidation.isConfirmPwValid = false;
      }
    }

    setPwValidation(nextValidation);
  };

  // 비밀번호 변경 취소
  const cancelPwEdit = () => {
    setPwEditMode('default');
    setPasswordForm({
      currentPw: '',
      newPw: '',
      confirmPw: '',
    });

    setPwValidation({
      currentPwMessage: '',
      newPwMessage: '',
      confirmPwMessage: '',
      isCurrentPwValid: false,
      isNewPwValid: false,
      isConfirmPwValid: false,
    });
  };

  // 저장버튼
  const handleSave = async (imageState: { isDeleted: boolean; selectedFile: File | null; previewUrl: string | null }) => {
    // 최종 유효성 검사
    const validationError = validateFormSubmit({
      formData: {
        id: editInfo.id,
        userName: editInfo.userName,
        nickName: editInfo.nickName,
        email: editInfo.email,
        currentPw: passwordForm.currentPw,
        pw: passwordForm.newPw,
        pwConfirm: passwordForm.confirmPw,
      },
      isIdValid: idEditMode !== 'checking' ? true : idValidation.isValid,
      isPwCheckMode: pwEditMode === 'checking',
      liveValidation: {
        idMessage: idValidation.message,
        pwMessage: passwordValidation.newPwMessage,
        pwConfirmMessage: passwordValidation.confirmPwMessage,
        emailMessage: infoValidation.emailMessage,
      },
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    const promises = [];

    if (imageState.isDeleted) {
      promises.push(deleteProfileImageAsync());
    }

    if (imageState.previewUrl && imageState.selectedFile) {
      const isDefault = userInfo.fileName === 'default';
      promises.push(uploadProfileImage({ file: imageState.selectedFile, isDefaultImage: isDefault }));
    }

    const requestBody = {
      ...editInfo,
      ...(pwEditMode === 'checking' && {
        currentPw: passwordForm.currentPw,
        newPw: passwordForm.newPw,
      }),
    };

    promises.push(updateUserInfoMutate(requestBody));

    try {
      // 4️⃣ 이미지와 텍스트 정보를 동시에 병렬로 처리!
      await Promise.all(promises);
      setSuccessMessage('변경 사항이 저장되었습니다.');
      setTimeout(() => navigate(ROUTES.MYPAGE), 2000);
    } catch (error: any) {
      console.log(error.message);
      if (error.message === 'fail:wrongCurrentPassword') {
        setError({ field: 'currentPw', message: '현재 비밀번호가 일치하지 않습니다.' });
      } else if ((error.message = 'fail:emptyCurrentPassword')) {
        setError({ field: 'currentPw', message: '현재 비밀번호를 입력해주세요.' });
      } else if (error.message('fail:userNull')) {
        setError({ field: 'form', message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.' });
      } else {
        setError({ field: 'form', message: '오류가 발생했습니다. 다시 시도해주세요.' });
      }
    }
  };

  const clearSuccessMessage = () => setSuccessMessage(null);
  const clearError = () => setError(null);

  return {
    editInfo,
    infoValidation,
    handleInfoChange,
    handleIdChange,
    idEditMode,
    startIdCheckMode,
    handleIdCheck,
    cancelIdEdit,
    idValidation,
    pwEditMode,
    startPwCheckMode,
    passwordForm,
    handlePwChange,
    passwordValidation,
    cancelPwEdit,
    error,
    handleSave,
    successMessage,
    clearSuccessMessage,
    clearError,
  };
};
