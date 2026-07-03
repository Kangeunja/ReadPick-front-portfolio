import { useState } from 'react';

import { useProfileImage } from './hooks/useProfileImage';

import MypageProfileDeletePopup from './components/MypageImgDeletePopup';
import ProfileImageUploader from './components/ProfileImageUploader';

const MyProfilePage = () => {
  const {
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
  } = useProfileImage();

  // 프로필 이미지 삭제 팝업 모달여부
  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false);

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
          className={`mb-[30px] h-[45px] w-[363px] rounded-[5px] border-none bg-[#a0a0a0] text-white ${modifiedCount ? 'cursor-pointer bg-pointColor' : 'cursor-not-allowed'} `}
          onClick={handleFinalSave}
          disabled={!modifiedCount}
        >
          {`${modifiedCount ? `저장(${modifiedCount})` : '저장'}`}
        </button>

        <p className="text-center text-[13px] text-[#454545]">
          닉네임은 ReadPick에서 보여지는 나의 활동명이에요.
          <br /> 나만의 프로필 사진과 닉네임을 설정해보세요.
        </p>
      </div>

      {isProfileDeletePopup && (
        <MypageProfileDeletePopup
          isTempImage={isTempImage}
          onRemoveTempImage={handleRemoveTempImage}
          onSetDeleteState={handleSetDeleteState}
          onClose={() => setIsProfileDeletePopup(false)}
        />
      )}
    </>
  );
};

export default MyProfilePage;
