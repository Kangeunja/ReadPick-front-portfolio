// react
import { useState } from "react";

// Router
import { useOutletContext } from "react-router-dom";

// mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// components
import MyPageEdit from "./MyPageEdit";

// types
import { MyPageOutletContext } from "../../types/mypage";

const PasswordConfirm = () => {
  const { userInfo, fetchUserInfo } = useOutletContext<MyPageOutletContext>();

  // 상태 관리
  const [password, setPassword] = useState(""); // 입력 중인 비밀번호
  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 표시여부
  const [passwordError, setPasswordError] = useState<string | null>(null); // 에러 메세지
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 인증 성공 여부

  // 이미지 관련 상태
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 미리보기 url
  const [tempImageFile, setTempImageFile] = useState<File | null>(null); // 실제 파일 객체

  // 프로필 이미지 상태 계산
  const isDefaultImage = !uploadedImage && userInfo.fileName === "default";

  // 비밀번호 확인 로직
  const handlePasswordConfirm = () => {
    if (!password) return;

    if (userInfo.pw === password) {
      setPasswordError(null);

      setIsPasswordVerified(true);
    } else {
      setPasswordError("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePasswordConfirm();
  };

  // 프로필 사진 선택/미리보기 처리함수, 실제 서버 저장은 handleSave에서 진행
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setUploadedImage(imgUrl);
    setTempImageFile(file);
  };

  if (isPasswordVerified) {
    return (
      <MyPageEdit
        isDefaultImage={isDefaultImage}
        uploadedImage={uploadedImage}
        handleProfileImageChange={handleProfileImageChange}
        userInfo={userInfo}
        fetchUserInfo={fetchUserInfo}
      />
    );
  }

  return (
    <div className="w-full box-border pt-[50px] mb-[200px]">
      <div className="w-main-w mx-auto flex items-center flex-col">
        <div
          className="w-[50px] h-[50px] bg-[#ffe019] rounded-[50px]
              box-border flex justify-center items-center mb-[31px]
            "
        >
          <div className="w-[14px] h-[18px] bg-my-page-icon"></div>
        </div>

        <div className="text-center">
          <p className="text-[24x] mb-[11px] font-medium">비밀번호 확인</p>
          <p className="text-[15px] text-[#454545] mb-[41px]">
            회원님의 안전한 개인정보변경을 위해
            <br />
            비밀번호를 다시 입력해주세요.
          </p>
        </div>

        <div className="relative w-[363px] mb-4">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className={`peer 
              w-full h-[54px] border border-[#e0e0e0] 
              text-[16px]
              rounded-[5px] box-border 
              relative p-[23px_12px_8px]
              ${password ? "has-value" : ""}`}
            placeholder=""
            required
            value={password}
            onKeyDown={handlePasswordKeyDown}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(null);
            }}
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-1/2 -translate-y-1/2
                text-[14px] text-[#9a9a9a] pointer-events-none
                transition-all duration-200 ease-in-out
                peer-focus:top-[16px] peer-focus:text-[11px] peer-focus:text-[#454545]
                peer-[.has-value]:top-[16px] peer-[.has-value]:text-[11px] peer-[.has-value]:text-[#454545]
                "
          >
            비밀번호 입력<span className="text-[#b80000]">*</span>
          </label>

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer
                flex items-center text-[#9a9a9a]
                hover:text-[#454545]
                "
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>

        <button
          className={`w-[363px] h-[45px] bg-[#1e7373] text-white
                border-none rounded-[5px] mb-[30px] 
                ${!password ? "cursor-not-allowed bg-[#a0a0a0]" : "cursor-pointer"}`}
          onClick={handlePasswordConfirm}
        >
          확인
        </button>

        {passwordError && (
          <p className="text-red-600 text-[14px]">{passwordError}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordConfirm;
