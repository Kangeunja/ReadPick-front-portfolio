import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckIdMutation } from 'hooks/mutations/useAuthMutation';
import { useDeleteProfileImageMutation, useUpdateProfileMutation, useUpdateUserInfoMutation } from './useUserInfoQueries';
import { ROUTES } from 'constants/routes';
import { checkIdLive, checkPwLive, checkPwConfirmLive, checkEmailLive, checkUserNameLive, checkNickNameLive } from 'utils/liveValidator';
import { myPageValidation } from 'utils/validateFormSubmit';
import { MyPageOutletContext } from 'types/mypage';
import { usePopupStore } from 'store/popupStore';

export const useMyPageEdit = ({ userInfo }: MyPageOutletContext) => {
  const navigate = useNavigate();
  const openPopup = usePopupStore((state) => state.openPopup);

  const { mutate: checkIdMutate } = useCheckIdMutation();
  const { mutateAsync: uploadProfileImage } = useUpdateProfileMutation();
  const { mutateAsync: updateUserInfoMutate } = useUpdateUserInfoMutation();
  const { mutateAsync: deleteProfileImageAsync } = useDeleteProfileImageMutation();

  // 상태 관리
  const [editInfo, setEditInfo] = useState({ ...userInfo });

  const [idEditMode, setIdEditMode] = useState<'default' | 'checking'>('default');
  const [pwEditMode, setPwEditMode] = useState<'default' | 'checking'>('default');

  const [idValidation, setIdValidation] = useState({ message: '', isValid: false });
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
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // 기본 정보 변경
  const handleInfoChange = (field: string, value: string) => {
    setEditInfo((prev) => ({ ...prev, [field]: value }));

    const validatorMap: Record<string, (val: string) => string> = {
      nickName: checkNickNameLive,
      userName: checkUserNameLive,
      email: checkEmailLive,
    };

    if (field in validatorMap) {
      setInfoValidation((prev) => ({
        ...prev,
        [`${field}Message`]: validatorMap[field](value),
      }));
    }
  };

  // 아이디 실시간 유효성 검사
  const handleIdChange = (value: string) => {
    setError((prev) => (prev?.field === 'id' ? null : prev));
    setEditInfo((prev) => ({ ...prev, id: value }));

    const liveMessage = checkIdLive(value, userInfo.id);
    if (liveMessage) {
      setIdValidation({
        message: liveMessage || '중복확인이 필요합니다.',
        isValid: false,
      });
    }
  };

  // 아이디 변경 모드 진입
  const startIdCheckMode = () => setIdEditMode('checking');

  // 아이디 중복확인
  const handleIdCheck = async () => {
    setError((prev) => (prev?.field === 'id' || prev?.field === 'form' ? null : prev));

    const liveMessage = checkIdLive(editInfo.id, userInfo.id);
    if (!editInfo.id || liveMessage !== '') {
      setIdValidation({
        message: liveMessage || '올바른 ID 형식을 입력한 후 중복확인을 해주세요.',
        isValid: false,
      });
      fieldRefs.current['id']?.focus();
      return;
    }

    checkIdMutate(editInfo.id, {
      onSuccess: (res) => {
        const isAvailable = res.result !== false;
        setIdValidation({
          message: isAvailable ? '사용 가능한 ID 입니다.' : '사용 불가능한 ID 입니다.',
          isValid: isAvailable,
        });
        if (!isAvailable) {
          fieldRefs.current['id']?.focus();
        }
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
    setError(null);
  };

  // 비밀번호 변경 모드 진입
  const startPwCheckMode = () => setPwEditMode('checking');

  // 비밀번호 실시간 유효성 검사
  const handlePwChange = (field: string, value: string) => {
    setError((prev) => (prev?.field === field ? null : prev));

    const nextPasswordForm = { ...passwordForm, [field]: value };
    setPasswordForm(nextPasswordForm);

    const nextValidation = { ...passwordValidation };

    if (field === 'currentPw') {
      nextValidation.currentPwMessage = value ? '' : '현재 비밀번호를 입력해주세요.';
      nextValidation.isCurrentPwValid = !!value;
    }

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
    setPasswordForm({ currentPw: '', newPw: '', confirmPw: '' });
    setError(null);
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
    const isImageUnchanged = !imageState.isDeleted && !imageState.selectedFile;
    const isInfoUnchanged =
      editInfo.nickName === userInfo.nickName &&
      editInfo.userName === userInfo.userName &&
      editInfo.id === userInfo.id &&
      editInfo.pw === userInfo.pw &&
      editInfo.email === userInfo.email;

    const isModeActive = idEditMode === 'default' && pwEditMode === 'default';

    if (isImageUnchanged && isInfoUnchanged && isModeActive) {
      openPopup('수정된 내용이 없습니다.');
      return;
    }

    // 최종 유효성 검사
    const validationError = myPageValidation({
      formData: {
        nickName: editInfo.nickName,
        userName: editInfo.userName,
        id: editInfo.id,
        pw: passwordForm.newPw,
        pwConfirm: passwordForm.confirmPw,
        currentPw: passwordForm.currentPw,
        email: editInfo.email,
      },
      isIdValid: idEditMode === 'checking' ? idValidation.isValid : true,
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
      if (validationError.field && fieldRefs.current[validationError.field]) {
        fieldRefs.current[validationError.field]?.focus();
      }
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
      // 이미지와 텍스트 정보를 동시에 병렬로 처리!
      await Promise.all(promises);
      openPopup('변경 사항이 저장되었습니다.');
      setTimeout(() => navigate(ROUTES.MYPAGE), 2000);
    } catch (error: any) {
      if (error.message === 'fail:wrongCurrentPassword') {
        setError({ field: 'currentPw', message: '현재 비밀번호가 일치하지 않습니다.' });
      } else if ((error.message = 'fail:emptyCurrentPassword')) {
        setError({ field: 'currentPw', message: '현재 비밀번호를 입력해주세요.' });
      } else if (error.message === 'fail:userNull') {
        setError({ field: 'form', message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.' });
      } else {
        setError({ field: 'form', message: '오류가 발생했습니다. 다시 시도해주세요.' });
      }

      fieldRefs.current['currentPw']?.focus();
    }
  };

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
    handleSave,
    error,
    fieldRefs,
  };
};
