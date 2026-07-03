import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { MyPageOutletContext } from 'types/mypage';
import { useDeleteProfileImageMutation, useUpdateProfileMutation, useUpdateUserInfoMutation } from './useUserInfoQueries';
import { ROUTES } from 'constants/routes';
import { usePopupStore } from 'store/popupStore';

export const useProfileImage = () => {
  const { userInfo } = useOutletContext<MyPageOutletContext>();
  const openPopup = usePopupStore((state) => state.openPopup);

  const navigate = useNavigate();

  const { mutateAsync: uploadProfileImage } = useUpdateProfileMutation();
  const { mutateAsync: updateUserInfoMutate } = useUpdateUserInfoMutation();
  const { mutateAsync: deleteProfileImageAsync } = useDeleteProfileImageMutation();

  // 화면 표시용 이미지 URL (기존 이미지 주소)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userInfo.fileName && userInfo.fileName !== 'default' ? userInfo.fileName : null,
  );
  // 서버로 전송할 새 이미지 파일 객체 (추가/변경 시 사용)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 기존 서버 이미지 삭제 예정 여부 (기존 이미지 삭제 시 사용)
  const [isDeleted, setIsDeleted] = useState(false);
  // 닉네임 수정용 로컬 상태
  const [editedNickName, setEditedNickName] = useState(userInfo.nickName);

  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // 기본 프로필 이미지 조건
  const isDefaultImage = (userInfo.fileName === 'default' && !selectedFile) || isDeleted;

  // 파일이 선택되었거나, 원래 이미지가 있었는데 프리뷰가 완전히 비워진(삭제된) 경우 임시 상태
  const isTempImage = selectedFile !== null || isDeleted;
  const isNameModified = editedNickName !== userInfo.nickName;

  // 완료 팝업 메시지 상태
  const modifiedCount = [isTempImage, isNameModified].filter(Boolean).length;

  // 닉네임 입력 값 로컬 상태 업데이트
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickName(e.target.value);
  };

  // 프로필 사진 선택/미리보기 처리함수, 실제 서버 저장은 handleSave에서 진행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsDeleted(false);
      const imgUrl = URL.createObjectURL(file);
      setPreviewUrl(imgUrl);
      e.target.value = '';
    }
  };

  // 저장하기 버튼
  const handleFinalSave = async () => {
    if (!modifiedCount) return;

    const promises = [];

    if (isDeleted) {
      promises.push(deleteProfileImageAsync());
    }

    if (previewUrl && selectedFile) {
      const isDefault = userInfo.fileName === 'default';
      promises.push(uploadProfileImage({ file: selectedFile, isDefaultImage: isDefault }));
    }

    if (editedNickName && editedNickName !== userInfo.nickName) {
      promises.push(
        updateUserInfoMutate({
          ...userInfo,
          nickName: editedNickName,
        }),
      );
    }

    try {
      await Promise.all(promises);
      setSelectedFile(null);

      openPopup('변경 사항이 저장되었습니다.');
      setTimeout(() => navigate(ROUTES.MYPAGE), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  // 임시 업로드된 이미지를 지우고 초기 상태로 되돌리는 함수
  const handleRemoveTempImage = () => {
    setSelectedFile(null);
    setIsDeleted(false);

    if (userInfo.fileName && userInfo.fileName !== 'default') {
      setPreviewUrl(userInfo.fileName);
    } else {
      setPreviewUrl(null);
    }
  };

  // 프로필 이미지 삭제 함수
  const handleSetDeleteState = () => {
    setIsDeleted(true);
    setSelectedFile(null); // 업로드 대기파일 비우기
    setPreviewUrl(null); // 미리보기를 기본 이미지(null) 상태로 변경
  };

  return {
    isDefaultImage,
    previewUrl,
    userInfo,
    handleFileChange,
    selectedFile,
    editedNickName,
    handleIdChange,
    modifiedCount,
    handleFinalSave,
    isTempImage,
    handleRemoveTempImage,
    handleSetDeleteState,
  };
};
