import { useState } from "react";
import "../../assets/css/mypageInfo.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useOutletContext } from "react-router-dom";
import { MyPageOutletContext } from "../../types/mypage";
import MyPageEdit from "./MyPageEdit ";
import MessagePopup from "../popup/MessagePopup";

const MyPageInfo = () => {
  // interface 함수
  const { userInfo, fetchUserInfo } = useOutletContext<MyPageOutletContext>();

  // 비밀번호 수정용 로컬 상태
  const [editPassword, setEditPassword] = useState("");

  // 비밀번호 토글상태
  const [isPassworVisible, setPasswordVisible] = useState(false);

  // 완료 팝업 메시지 상태
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  // 실패 메세지 상태
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 비밀번호 확인 완료 후 페이지 상태
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // 프로필 이미지 변경용 임시 상태 (추가/수정 공용)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // 서버 전송용으로 선택된 실제 파일 객체를 저장하는 상태
  const [tempImageFile, setSelectedFile] = useState<File | null>(null);

  // 기본 프로필 이미지 사용 여부
  const isDefaultImage = !uploadedImage && userInfo.fileName === "default";

  // 확인버튼
  const handlePasswordConfirm = () => {
    if (userInfo.pw === editPassword) {
      setPasswordError(null);
      setCompleteMessage("비밀번호가 확인되었습니다.");

      setTimeout(() => {
        setCompleteMessage(null);
        setIsPasswordVerified(true);
      }, 1500);
    } else {
      setPasswordError("비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.");
    }
  };

  // 프로필 사진 선택/미리보기 처리함수, 실제 서버 저장은 handleSave에서 진행
  const handleEditProfileImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setUploadedImage(imgUrl);
    setSelectedFile(file);
  };

  return (
    <>
      <div className="mypage-info">
        {isPasswordVerified ? (
          <MyPageEdit
            isDefaultImage={isDefaultImage}
            uploadedImage={uploadedImage}
            handleEditProfileImg={handleEditProfileImg}
            userInfo={userInfo}
            fetchUserInfo={fetchUserInfo}
          />
        ) : (
          <div className="mypage-info__container">
            <div className="mypage-info__box">
              <div className="mypage-info__icon"></div>
            </div>
            <div className="mypage-info__detail">
              <p>비밀번호 확인</p>
              <p>
                회원님의 안전한 개인정보변경을 위해
                <br />
                비밀번호를 다시 입력해주세요.
              </p>
            </div>

            <div className="mypage-info__field">
              <input
                type={isPassworVisible ? "text" : "password"}
                id="password"
                className={`mypage-info____input ${
                  editPassword ? "has-value" : ""
                }`}
                placeholder=""
                required
                value={editPassword}
                onChange={(e) => {
                  setEditPassword(e.target.value);
                  setPasswordError(null);
                }}
              />
              <label htmlFor="password" className="mypage-info__label">
                비밀번호 입력<span>*</span>
              </label>

              <span
                className="mypage-info__password-icon"
                onClick={() => setPasswordVisible(!isPassworVisible)}
              >
                {isPassworVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            <button
              className={`mypage-info__save ${!editPassword ? "active" : ""}`}
              onClick={handlePasswordConfirm}
            >
              확인
            </button>

            {passwordError && (
              <p className="mypage-info__error">
                비밀번호가 일치하지 않습니다. 다시 입력해 주세요.
              </p>
            )}
          </div>
        )}
      </div>

      {completeMessage && (
        <MessagePopup
          message={completeMessage}
          onFinish={() => setCompleteMessage(null)}
        />
      )}
    </>
  );
};

export default MyPageInfo;
