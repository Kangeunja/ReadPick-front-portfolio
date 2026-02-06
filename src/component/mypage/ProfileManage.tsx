import "../../assets/css/profileManage.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MyPageOutletContext } from "../../types/mypage";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import MypageImgDeletePopup from "../popup/MypageImgDeletePopup";
import SuccessPopup from "../popup/MessagePopup";

const ProfileManage = () => {
  // interface 함수
  const { userInfo, fetchUserInfo } = useOutletContext<MyPageOutletContext>();
  const navigate = useNavigate();

  // 프로필 파일 input 포커싱
  const editImgRef = useRef<HTMLInputElement | null>(null);

  // 프로필 이미지 변경용 임시 상태 (추가/수정 공용)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // 서버 전송용으로 선택된 실제 파일 객체를 저장하는 상태
  const [tempImageFile, setSelectedFile] = useState<File | null>(null);

  // 기본 프로필 이미지 사용 여부
  const isDefaultImage = !uploadedImage && userInfo.fileName === "default";

  // 프로필 이미지 삭제 팝업 모달여부
  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false);

  // 화면에서 닉네임 수정용 로컬 상태 (서버 전송 시 전체 User 객체에 반영)
  // const [editedUser, setEditedUser] = useState({
  //   userName: userInfo.userName,
  //   nickName: userInfo.nickName,
  //   id: userInfo.id,
  //   pw: userInfo.pw,
  //   email: userInfo.email,
  //   adminAt: userInfo.adminAt,
  //   firstAt: userInfo.firstAt,
  // });

  // 닉네임 수정용 로컬 상태
  const [editedNickName, setEditedNickName] = useState(userInfo.nickName);

  // 완료 팝업 메시지 상태
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  const isImageModified = tempImageFile
    ? tempImageFile.name !== userInfo.fileName
    : false;

  // 변경된 필드 수 (이미지/닉네임) 계산
  const modifiedCount = [
    isImageModified,
    editedNickName &&
      // editedNickName !== null &&
      editedNickName !== userInfo.nickName,
  ].filter(Boolean).length;
  console.log(uploadedImage);
  console.log(userInfo.fileName);

  useEffect(() => {
    if (userInfo?.nickName) {
      setEditedNickName(userInfo.nickName);
    }
  }, [userInfo]);

  // 프로필 사진 선택/미리보기 처리함수, 실제 서버 저장은 handleSave에서 진행
  const handleEditProfileImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setUploadedImage(imgUrl);
    setSelectedFile(file);
  };

  // 닉네임 입력 값 로컬 상태 업데이트
  const handleIdChange = (e: any) => {
    setEditedNickName(e.target.value);
    // setEditedUser((prev: any) => ({
    //   ...prev,
    //   nickName: e.target.value,
    // }));
  };

  // 저장하기 버튼
  const handleSave = () => {
    if (uploadedImage && tempImageFile) {
      const formData = new FormData();
      formData.append("file", tempImageFile);
      const uploadUrl =
        userInfo.fileName === "default"
          ? "/userImageInsert"
          : "/userImageUpdate";

      axiosInstance
        .post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data) {
            setCompleteMessage("변경 사항이 저장되었습니다.");
            fetchUserInfo();
            setTimeout(() => {
              navigate("/mypage");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (editedNickName && editedNickName !== userInfo.nickName) {
      axiosInstance
        .post("/myPage/userInfoModify", {
          ...userInfo,
          nickName: editedNickName,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "success") {
            setCompleteMessage("변경 사항이 저장되었습니다.");
            fetchUserInfo();
            setTimeout(() => {
              navigate("/mypage");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // 프로필 삭제하기 버튼
  const handleDeleteProfileImg = () => {
    setIsProfileDeletePopup(true);
  };

  return (
    <>
      <div className="profile-manage">
        <div className="profile-manage__img-wrap">
          <div
            className={`profile-manage__img ${
              isDefaultImage ? "profile-manage__img-has-default" : ""
            }`}
          >
            {isDefaultImage ? (
              <div className="profile-manage__img--default" />
            ) : (
              <img
                src={uploadedImage || userInfo.fileName}
                alt="프로필 이미지"
              />
            )}
          </div>
        </div>

        <div className="profile-manage__btn-wrap">
          <div onClick={() => editImgRef.current?.click()}>
            <button className="profile-manage__edit-btn">
              {isDefaultImage ? "사진추가" : "사진수정"}
            </button>
            <input
              type="file"
              ref={editImgRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleEditProfileImg}
            />
          </div>

          <button
            className={`profile-manage__edit_trash ${
              isDefaultImage ? "disabled" : ""
            }`}
            onClick={handleDeleteProfileImg}
            disabled={isDefaultImage}
          ></button>
        </div>

        <div className="profile-manage__field">
          <input
            type="text"
            id="nickname"
            className={`profile-manage__input ${
              editedNickName ? "has-value" : ""
            }`}
            placeholder=""
            required
            value={editedNickName}
            onChange={handleIdChange}
          />
          <label htmlFor="nickname" className="profile-manage__label">
            닉네임 입력<span>*</span>
          </label>
        </div>

        <button
          className={`${
            modifiedCount
              ? "profile-manage__save active"
              : "profile-manage__save"
          }`}
          onClick={handleSave}
        >
          {`${modifiedCount ? `저장(${modifiedCount})` : "저장"}`}
        </button>
        <p className="profile-manage__text">
          닉네임은 ReadPick에서 보여지는 나의 활동명이에요.
          <br /> 나만의 프로필 사진과 닉네임을 설정해보세요.
        </p>
      </div>

      {isProfileDeletePopup && (
        <MypageImgDeletePopup
          onClose={() => setIsProfileDeletePopup(false)}
          setCompleteMessage={setCompleteMessage}
          fetchUserInfo={fetchUserInfo}
          isDefaultImage={userInfo.fileName === "default"}
        />
      )}

      {completeMessage && (
        <SuccessPopup
          message={completeMessage}
          onFinish={() => setCompleteMessage(null)}
        />
      )}
    </>
  );
};

export default ProfileManage;
