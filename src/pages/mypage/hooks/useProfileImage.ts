import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MyPageOutletContext } from '../../../types/mypage';

export const useProfileImage = () => {
  const { userInfo } = useOutletContext<MyPageOutletContext>();

  // 화면 표시용 이미지 URL (기존 이미지 주소)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userInfo.fileName && userInfo.fileName !== 'default' ? userInfo.fileName : null,
  );
  // 서버로 전송할 새 이미지 파일 객체 (추가/변경 시 사용)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 기존 서버 이미지 삭제 예정 여부 (기존 이미지 삭제 시 사용)
  const [isDeleted, setIsDeleted] = useState(false);

  // 완료 팝업 메시지 상태
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // 기본 프로필 이미지 조건
  const isDefaultImage = (userInfo.fileName === 'default' && !selectedFile) || isDeleted;

  // 파일이 선택되었거나, 원래 이미지가 있었는데 프리뷰가 완전히 비워진(삭제된) 경우 임시 상태
  const isTempImage = selectedFile !== null || isDeleted;

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

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleSetDeleteState = () => {
    setIsDeleted(true);
    setSelectedFile(null); // 업로드 대기파일 비우기
    setPreviewUrl(null); // 미리보기를 기본 이미지(null) 상태로 변경
  };

  const messageChange = (message: string | null) => {
    setCompleteMessage(message);
    setSelectedFile(null);
    setIsDeleted(false);
    setPreviewUrl(null);
  };

  return {
    isDefaultImage,
    previewUrl,
    userInfo,
    isTempImage,
    handleFileChange,
    selectedFile,
    isDeleted,
    handleRemoveTempImage,
    clearSelectedFile,
    handleSetDeleteState,
    messageChange,
    completeMessage,
  };
};
