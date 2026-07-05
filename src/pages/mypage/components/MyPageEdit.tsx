import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProfileImage } from '../hooks/useProfileImage';
import { useMyPageEdit } from '../hooks/useMyPageEdit';
import { ROUTES } from 'constants/routes';
import { MyPageOutletContext } from 'types/mypage';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import FormField from 'components/common/FormField';
import MypageProfileDeletePopup from './MypageImgDeletePopup';
import ProfileImageUploader from './ProfileImageUploader';

const MyPageEdit = ({ userInfo, fetchUserInfo }: MyPageOutletContext) => {
  const navigate = useNavigate();

  const {
    isDefaultImage,
    previewUrl,
    handleFileChange,
    selectedFile,
    handleRemoveTempImage,
    isTempImage,
    handleSetDeleteState,
    isDeleted,
  } = useProfileImage();

  const {
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
  } = useMyPageEdit({ userInfo, fetchUserInfo });

  // 프로필 이미지 삭제 팝업 모달여부
  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false);

  // 토글 상태변화모드
  const [visibility, setVisibility] = useState({
    currentPw: false,
    newPw: false,
    confirmPw: false,
  });

  // 토글상태
  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <form className="mx-auto mb-[200px] flex w-main-w flex-col items-center pt-[50px]" onSubmit={(e) => e.preventDefault()}>
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

        <FormField
          id="nickName"
          direction="column"
          ref={(el) => (fieldRefs.current.nickName = el)}
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={editInfo.nickName}
          onChange={(value) => handleInfoChange('nickName', value)}
          messageSlot={
            infoValidation.nickNameMessage && (
              <p className={`text-[12px] ${infoValidation.isValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>
                {infoValidation.nickNameMessage}
              </p>
            )
          }
        />

        <FormField
          id="userName"
          direction="column"
          ref={(el) => (fieldRefs.current.userName = el)}
          label="이름"
          placeholder="이름을 입력해주세요"
          value={editInfo.userName}
          onChange={(value) => handleInfoChange('userName', value)}
          messageSlot={
            infoValidation.userNameMessage && (
              <p className={`text-[12px] ${infoValidation.isValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>
                {infoValidation.userNameMessage}
              </p>
            )
          }
        />

        <FormField
          id="id"
          direction="column"
          ref={(el) => (fieldRefs.current.id = el)}
          label="아이디"
          disabled={idEditMode === 'default'}
          placeholder="아이디를 입력해주세요"
          value={editInfo.id}
          autoComplete="username"
          onChange={(value) => handleIdChange(value)}
          actionSlot={
            idEditMode === 'default' ? (
              <button
                type="button"
                className="h-[35px] w-[75px] border bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor hover:text-white"
                onClick={startIdCheckMode}
              >
                변경하기
              </button>
            ) : (
              <div className="flex gap-[6px]">
                <button
                  type="button"
                  className="h-[35px] w-[75px] border bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor hover:text-white"
                  onClick={handleIdCheck}
                >
                  중복확인
                </button>
                <button
                  type="button"
                  className="h-[35px] w-[75px] border bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor"
                  onClick={cancelIdEdit}
                >
                  취소
                </button>
              </div>
            )
          }
          messageSlot={
            error?.field === 'id' ? (
              <p className="text-[12px] text-[#ff0004]">{error.message}</p>
            ) : (
              idValidation.message && (
                <p className={`text-[12px] ${idValidation.isValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>{idValidation.message}</p>
              )
            )
          }
        />

        {pwEditMode === 'default' && (
          <FormField
            id="pw"
            direction="column"
            ref={(el) => (fieldRefs.current.pw = el)}
            label="비밀번호"
            type="password"
            disabled={true}
            placeholder="비밀번호를 입력해주세요"
            value={editInfo.pw}
            autoComplete="current-password"
            onChange={(value) => handleInfoChange('pw', value)}
            actionSlot={
              <button
                type="button"
                className="h-[35px] w-[75px] border bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor"
                onClick={startPwCheckMode}
              >
                변경하기
              </button>
            }
          />
        )}

        {pwEditMode === 'checking' && (
          <>
            <FormField
              id="currentPw"
              direction="column"
              ref={(el) => (fieldRefs.current.currentPw = el)}
              label="현재 비밀번호"
              type={visibility.currentPw ? 'text' : 'password'}
              placeholder="현재 비밀번호를 입력해주세요"
              value={passwordForm.currentPw}
              onChange={(value) => handlePwChange('currentPw', value)}
              rightSlot={
                <span className="text-[#9a9a9a] hover:text-[#454545]" onClick={() => toggleVisibility('currentPw')}>
                  {visibility.currentPw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              }
              messageSlot={
                error?.field === 'currentPw' ? (
                  <p className="text-[12px] text-[#ff0004]">{error.message}</p>
                ) : (
                  passwordValidation.currentPwMessage && (
                    <p className={`text-[12px] ${passwordValidation.isCurrentPwValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>
                      {passwordValidation.currentPwMessage}
                    </p>
                  )
                )
              }
            />

            <FormField
              id="newPw"
              direction="column"
              ref={(el) => (fieldRefs.current.newPw = el)}
              label="새 비밀번호"
              type={visibility.newPw ? 'text' : 'password'}
              placeholder="새 비밀번호를 입력해주세요"
              value={passwordForm.newPw}
              onChange={(value) => handlePwChange('newPw', value)}
              rightSlot={
                <span className="text-[#9a9a9a] hover:text-[#454545]" onClick={() => toggleVisibility('newPw')}>
                  {visibility.newPw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              }
              messageSlot={
                error?.field === 'newPw' ? (
                  <p className="text-[12px] text-[#ff0004]">{error.message}</p>
                ) : (
                  passwordValidation.newPwMessage && (
                    <p className={`text-[12px] ${passwordValidation.isNewPwValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>
                      {passwordValidation.newPwMessage}
                    </p>
                  )
                )
              }
            />

            <FormField
              id="confirmPw"
              direction="column"
              ref={(el) => (fieldRefs.current.confirmPw = el)}
              label="새 비밀번호 확인"
              type={visibility.confirmPw ? 'text' : 'password'}
              placeholder="새 비밀번호 확인을 입력해주세요"
              value={passwordForm.confirmPw}
              onChange={(value) => handlePwChange('confirmPw', value)}
              rightSlot={
                <span className="text-[#9a9a9a] hover:text-[#454545]" onClick={() => toggleVisibility('confirmPw')}>
                  {visibility.confirmPw ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              }
              messageSlot={
                error?.field === 'confirmPw' ? (
                  <p className="text-[12px] text-[#ff0004]">{error.message}</p>
                ) : (
                  passwordValidation.confirmPwMessage && (
                    <p className={`text-[12px] ${passwordValidation.isConfirmPwValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>
                      {passwordValidation.confirmPwMessage}
                    </p>
                  )
                )
              }
            />

            <div className="relative mb-[45px] flex w-[363px] flex-col">
              <button
                type="button"
                className="mb-[20px] mt-[-20px] h-[40px] w-[363px] cursor-pointer rounded-[3px] bg-[#a0a0a0] text-[12px] text-white hover:bg-btnhoverColor"
                onClick={cancelPwEdit}
              >
                비밀번호 변경 취소
              </button>
            </div>
          </>
        )}

        <FormField
          id="email"
          direction="column"
          ref={(el) => (fieldRefs.current.email = el)}
          label="이메일"
          placeholder="이메일을 입력해주세요"
          value={editInfo.email}
          onChange={(value) => handleInfoChange('email', value)}
          messageSlot={
            infoValidation.emailMessage && (
              <p className={`text-[12px] ${infoValidation.isValid ? 'text-[#008000]' : 'text-[#ff0004]'}`}>{infoValidation.emailMessage}</p>
            )
          }
        />

        <div className="flex gap-[15px]">
          <button
            type="button"
            className="h-[40px] w-[174px] cursor-pointer rounded-[3px] border bg-gray-100 text-[12px] font-bold text-gray-700 hover:bg-gray-500 hover:text-white"
            onClick={() => navigate(ROUTES.MYPAGE)}
          >
            취소
          </button>
          <button
            type="button"
            className="h-[40px] w-[174px] cursor-pointer rounded-[3px] border bg-gray-100 text-[12px] font-bold text-gray-700 hover:bg-pointColor hover:text-white"
            onClick={() => handleSave({ isDeleted, selectedFile, previewUrl })}
          >
            저장
          </button>
        </div>
      </form>

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

export default MyPageEdit;
