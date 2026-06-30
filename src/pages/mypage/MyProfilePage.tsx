import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MypageProfileDeletePopup from './components/MypageImgDeletePopup';
import SuccessPopup from '../../component/common/MessagePopup';
import ProfileImageUploader from './components/ProfileImageUploader';

import { useDeleteProfileImageMutation, useUpdateProfileMutation, useUpdateUserInfoMutation } from './hooks/useUserInfoQueries';
import { useProfileImage } from './hooks/useProfileImage';

import { ROUTES } from '../../constants/routes';

const MyProfilePage = () => {
  const navigate = useNavigate();

  const { mutateAsync: uploadProfileImage } = useUpdateProfileMutation();
  const { mutateAsync: updateUserInfoMutate } = useUpdateUserInfoMutation();
  const { mutateAsync: deleteProfileImageAsync } = useDeleteProfileImageMutation();

  const {
    isDefaultImage,
    previewUrl,
    userInfo,
    handleFileChange,
    selectedFile,
    isDeleted,
    handleRemoveTempImage,
    clearSelectedFile,
    isTempImage,
    handleSetDeleteState,
    messageChange,
    completeMessage,
  } = useProfileImage();

  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false); // 프로필 이미지 삭제 팝업 모달여부
  const [editedNickName, setEditedNickName] = useState(userInfo.nickName); // 닉네임 수정용 로컬 상태

  const isNameModified = editedNickName !== userInfo.nickName;
  const modifiedCount = [isTempImage, isNameModified].filter(Boolean).length;

  // 닉네임 입력 값 로컬 상태 업데이트
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickName(e.target.value);
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
      clearSelectedFile();

      messageChange('변경 사항이 저장되었습니다.');
      setTimeout(() => navigate(ROUTES.MYPAGE), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-[200px] flex w-full flex-col items-center pt-[50px]">
        <ProfileImageUploader
          isDefaultImage={isDefaultImage}
          uploadedImage={previewUrl}
          userInfo={userInfo}
          handleFileChange={handleFileChange}
          onClose={() => {
            if (selectedFile) {
              handleRemoveTempImage();
            } else {
              setIsProfileDeletePopup(true);
            }
          }}
        />

        <div className="relative mb-[16px] w-[363px]">
          <input
            type="text"
            id="nickname"
            className={`peer box-border h-[54px] w-full rounded-[5px] border border-[#e0e0e0] p-[23px_12px_8px] ${editedNickName ? 'has-value' : ''}`}
            placeholder=""
            required
            value={editedNickName}
            onChange={handleIdChange}
          />
          <label
            htmlFor="nickname"
            className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#9a9a9a] transition-all duration-200 ease-in-out peer-focus:top-[10px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#454545] peer-[.has-value]:top-[10px] peer-[.has-value]:translate-y-0 peer-[.has-value]:text-[11px] peer-[.has-value]:text-[#454545]"
          >
            닉네임 입력<span className="text-[#b80000]">*</span>
          </label>
        </div>

        <button
          className={`mb-[40px] h-[45px] w-[363px] rounded-[5px] border-none bg-[#a0a0a0] text-white ${modifiedCount ? 'cursor-pointer bg-pointColor' : 'cursor-not-allowed'} `}
          onClick={handleFinalSave}
          disabled={!modifiedCount}
        >
          {`${modifiedCount ? `저장(${modifiedCount})` : '저장'}`}
        </button>

        <p className="text-center text-[14px] text-[#454545]">
          닉네임은 ReadPick에서 보여지는 나의 활동명이에요.
          <br /> 나만의 프로필 사진과 닉네임을 설정해보세요.
        </p>
      </div>

      {isProfileDeletePopup && (
        <MypageProfileDeletePopup
          isTempImage={isTempImage}
          onRemoveTempImage={handleRemoveTempImage}
          onSetDeleteState={handleSetDeleteState}
          // onSuccess={() => {
          //   messageChange('변경 사항이 저장되었습니다.');
          //   // setTimeout(() => {
          //   //   navigate(ROUTES.MYPAGE);
          //   // }, 2000);
          // }}
          onClose={() => setIsProfileDeletePopup(false)}
        />
      )}

      {completeMessage && <SuccessPopup message={completeMessage} onFinish={() => messageChange(null)} />}
    </>
  );
};

export default MyProfilePage;
