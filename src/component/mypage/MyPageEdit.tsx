// react
import { useRef, useState } from "react";

// router
import { useNavigate } from "react-router-dom";

// mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// api
import axiosInstance from "../../api/axiosInstance";

// common
import FormField from "../common/FormField";
import MessagePopup from "../popup/MessagePopup";

const MyPageEdit = ({
  isDefaultImage,
  uploadedImage,
  handleEditProfileImg,
  userInfo,
  fetchUserInfo,
}: any) => {
  const navigate = useNavigate();
  const editImgRef = useRef<HTMLInputElement | null>(null);

  // UI 및 모달 상태
  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false); // 프로필 이미지 삭제 팝업 모달여부
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null,
  );
  const [idEditMode, setIdEditMode] = useState<
    "default" | "checking" | "confirmed"
  >("default"); // 아이디 변경하기 버튼 클릭시 상태변화모드
  const [pwEditMode, setPwEditMode] = useState<"default" | "checking">(
    "default",
  ); // 비밀번호 변경하기 버튼 클릭시 현재비밀번호, 새비밀번호 상태

  // 데이터 입력상태
  const [editInfo, setEditInfo] = useState({ ...userInfo });
  const [passwordForm, setPasswordForm] = useState({
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });

  const [idValidation, setIdValidation] = useState({
    message: "",
    isValid: false,
  }); // 아이디 중복확인

  const [passwordValidation, setPwValidation] = useState({
    newPwMessage: "",
    confirmPwMessage: "",
    isNewPwValid: false,
    isConfirmPwValid: false,
  });

  const [visibility, setVisibility] = useState({
    currentPw: false,
    newPw: false,
    confirmPw: false,
  });

  // 아이디 중복확인 메세지 추가
  const [idCheckMessage, setIdCheckMessage] = useState("");

  // 새 비밀번호 토글상태
  const [isNewPwVisible, setIsNewPwVisible] = useState(false);

  // 새 비밀번호확인 토글상태
  const [isConfirmPwVisible, setIsConfirmVisible] = useState(false);

  const fieldRefs = {
    nickName: useRef(null),
    userName: useRef(null),
    id: useRef(null),
    email: useRef(null),
    currentPw: useRef(null),
    newPw: useRef(null),
    confirmPw: useRef(null),
  };

  // 기본 정보 변경 핸들러
  const handleInfoChange = (field: string, value: string) => {
    setEditInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  // 아이디 중복확인
  const handleIdCheck = async () => {
    if (!editInfo.id)
      return setIdValidation({
        message: "아이디가 입력되지 않았습니다.",
        isValid: false,
      });

    if (userInfo.id === editInfo.id)
      return setIdValidation({
        message: "아이디가 변경되지 않았습니다.",
        isValid: false,
      });

    try {
      const res = await axiosInstance.post(`/checkId?id=${editInfo.id}`);
      const isAvailable = res.data.result !== false;
      setIdValidation({
        message: isAvailable
          ? "사용 가능한 ID 입니다."
          : "사용 불가능한 ID 입니다.",
        isValid: isAvailable,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 실시간 유효성 검사
  const handlePwChange = (field: string, value: string) => {
    setPasswordForm({ ...passwordForm, [field]: value });

    if (field === "newPw") {
      const pwRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      let msg = "";
      if (value.length < 8) msg = "비밀번호는 최소 8자리 이상이어야 합니다.";
      else if (value === passwordForm.currentPw)
        msg = "현재 비밀번호와 다르게 입력해주세요.";
      else if (!pwRegex.test(value))
        msg = "영문, 숫자, 특수문자를 포함해주세요.";
    }

    if (field === "confirmPw" || field === "newPw") {
      // if (passwordForm.newPw !== value) {
      //   setConfirmPwError("입력한 비밀번호와 일치하지 않습니다.");
      //   setIsConfirmPwValid(false);
      // } else {
      //   setConfirmPwError("");
      // }
    }
  };

  // 최종 유효성 검사
  const validateForm = () => {
    if (!editInfo.nickName)
      return { field: "nickName", message: "닉네임을 입력해주세요." };

    if (!editInfo.userName)
      return { field: "userName", message: "이름을 입력해주세요." };

    if (!editInfo.id) return { field: "id", message: "아이디를 입력해주세요." };

    if (!editInfo.email)
      return { field: "id", message: "이메일을 입력해주세요." };

    if (pwEditMode === "checking") {
      if (!passwordForm.currentPw)
        return { field: "currentPw", message: "현재 비밀번호를 입력해주세요." };
      if (!passwordValidation.newPwMessage)
        return { field: "newPw", message: "새 비밀번호를 입력해주세요." };
      if (!passwordValidation.isConfirmPwValid)
        return { field: "confirmPw", message: "비밀번호가 일치하지 않습니다." };
    }
  };

  // 저장버튼
  const handleSave = () => {
    // if (!editInfo.nickName) {
    //   setError({
    //     field: "nickName",
    //     message: "닉네임을 입력해주세요.",
    //   });
    //   return;
    // }

    // if (!editInfo.userName) {
    //   setError({
    //     field: "userName",
    //     message: "이름을 입력해주세요.",
    //   });
    //   return;
    // }

    // if (!editInfo.id) {
    //   setError({
    //     field: "id",
    //     message: "아이디를 입력해주세요.",
    //   });
    //   return;
    // }

    if (pwEditMode === "checking") {
      if (!passwordForm.currentPw) {
        setError({
          field: "currentPw",
          message: "현재 비밀번호를 입력해주세요.",
        });
        return;
      }

      if (!passwordForm.newPw) {
        setError({
          field: "newPw",
          message: "새 비밀번호를 입력해주세요.",
        });
        return;
      }

      if (!passwordForm.confirmPw) {
        setError({
          field: "confirmPw",
          message: "새 비밀번호 확인을 입력해주세요.",
        });
        return;
      }
    }

    if (!editInfo.email) {
      setError({
        field: "email",
        message: "이메일을 입력해주세요.",
      });
      return;
    }

    if (passwordForm.newPw !== passwordForm.confirmPw) {
      setError({
        field: "confirmPw",
        message: "새 비밀번호가 일치하지 않습니다.",
      });
    }

    if (idCheckMessage) {
      setError({
        field: "newPw",
        message: "아이디를 다시 확인해주세요.",
      });
    }

    if (passwordValidation.newPwMessage) {
      setError({
        field: "newPw",
        message: "비밀번호를 다시 확인해주세요.",
      });
    }

    if (passwordValidation.confirmPwMessage) {
      setError({
        field: "confirmPw",
        message: "비밀번호를 다시 확인해주세요.",
      });
    }

    axiosInstance
      .post("/myPage/userInfoModify", {
        ...editInfo,
      })
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("변경 사항이 저장되었습니다.");
        fetchUserInfo();
        setTimeout(() => {
          navigate("/mypage");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-main-w mx-auto flex items-center flex-col pt-[50px] mb-[200px]">
        <div className="w-[100px] flex justify-center">
          <div
            className={`w-20 h-20 flex rounded-[50px] justify-center items-center mb-[23px] ${
              isDefaultImage ? "border border-[#1b1b1b]" : ""
            }`}
          >
            {isDefaultImage ? (
              <div className="w-[30px] h-[30px] bg-default-img bg-cover" />
            ) : (
              <img
                src={uploadedImage || userInfo.fileName}
                alt="프로필 이미지"
                className="w-20 h-20 rounded-[50px]"
              />
            )}
          </div>
        </div>
        <div className="flex w-[100px] justify-between mb-[60px]">
          <div onClick={() => editImgRef.current?.click()}>
            <button
              className="border-none text-white text-xs w-[61px] h-[30px] bg-[#a0a0a0]
            rounded-[10px] cursor-pointer hover:bg-[#1e7373]
            "
            >
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
            className={`border-none text-white text-xs  bg-[#a0a0a0]
            rounded-[10px]  w-[30px] h-[30px] bg-trash-icon
            bg-no-repeat bg-center bg-[length:15px_15px]  
              ${isDefaultImage ? "opacity-[0.3] cursor-not-allowed" : "hover:bg-[#1e7373]"}`}
            onClick={() => setIsProfileDeletePopup(true)}
            disabled={isDefaultImage}
          ></button>
        </div>

        <FormField
          id="nickname"
          ref={fieldRefs.nickName}
          label="닉네임"
          required
          placeholder="닉네임을 입력해주세요"
          value={editInfo.nickName}
          onChange={(value) => handleInfoChange("nickName", value)}
        />

        <FormField
          id="userName"
          ref={fieldRefs.userName}
          label="이름"
          required
          placeholder="이름을 입력해주세요"
          value={editInfo.userName}
          onChange={(value) => handleInfoChange("userName", value)}
        />

        <FormField
          id="id"
          ref={fieldRefs.id}
          label="아이디"
          required
          disabled={idEditMode === "default"}
          placeholder="아이디를 입력해주세요"
          value={editInfo.id}
          onChange={(value) => {
            handleInfoChange("id", value);
            setIdCheckMessage("");
          }}
          rightSlot={
            idEditMode === "default" ? (
              <button
                className="mypage-edit__id-edit"
                onClick={() => setIdEditMode("checking")}
              >
                변경하기
              </button>
            ) : (
              <div className="mypage-edit__id-btn-group">
                <button
                  className="mypage-edit__id-check"
                  onClick={handleIdCheck}
                >
                  중복확인
                </button>
                <button
                  className="mypage-edit__id-cancel"
                  onClick={() => {
                    setEditInfo((prev: any) => ({
                      ...prev,
                      id: userInfo.id,
                    }));
                    setIdEditMode("default");
                    setIdCheckMessage("");
                  }}
                >
                  취소
                </button>
              </div>
            )
          }
          messageSlot={
            idCheckMessage && (
              <p
                className={`mypage-edit__id-check-message ${
                  idValidation.isValid ? "success" : "error"
                }`}
              >
                {idCheckMessage}
              </p>
            )
          }
        />

        {pwEditMode === "default" && (
          <FormField
            id="pw"
            label="비밀번호"
            type="password"
            required
            disabled={true}
            placeholder="비밀번호를 입력해주세요"
            value={editInfo.pw}
            onChange={(value) => handleInfoChange("pw", value)}
            rightSlot={
              <button
                className="mypage-edit__pw-edit"
                onClick={() => setPwEditMode("checking")}
              >
                변경하기
              </button>
            }
          />
        )}

        {pwEditMode === "checking" && (
          <>
            <FormField
              id="currentPw"
              ref={fieldRefs.currentPw}
              label="현재 비밀번호"
              required
              type={visibility.currentPw ? "text" : "password"}
              placeholder="현재 비밀번호를 입력해주세요"
              value={passwordForm.currentPw}
              onChange={(value) => handlePwChange("currentPw", value)}
              rightSlot={
                <span
                  className="mypage-edit__visible"
                  // onClick={() => setIsCurrentPwVisible((prev) => !prev)}
                >
                  {passwordForm.currentPw ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              }
            />

            <FormField
              id="newPw"
              ref={fieldRefs.newPw}
              label="새 비밀번호"
              required
              type={isNewPwVisible ? "text" : "password"}
              placeholder="새 비밀번호를 입력해주세요"
              value={passwordForm.newPw}
              onChange={(value) => handlePwChange("newPw", value)}
              rightSlot={
                <span
                  className="mypage-edit__visible"
                  onClick={() => setIsNewPwVisible((prev) => !prev)}
                >
                  {isNewPwVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              }
              messageSlot={
                passwordValidation.newPwMessage && (
                  <p
                    className={`mypage-edit__newPw-message ${
                      passwordValidation.isNewPwValid ? "success" : "error"
                    }`}
                  >
                    {passwordValidation.newPwMessage}
                  </p>
                )
              }
            />

            <FormField
              id="confirmPw"
              ref={fieldRefs.confirmPw}
              label="새 비밀번호 확인"
              required
              type={isConfirmPwVisible ? "text" : "password"}
              placeholder="새 비밀번호 확인을 입력해주세요"
              value={passwordForm.confirmPw}
              onChange={(value) => handlePwChange("confirmPw", value)}
              rightSlot={
                <span
                  className="mypage-edit__visible"
                  onClick={() => setIsConfirmVisible((prev) => !prev)}
                >
                  {isConfirmPwVisible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              }
              messageSlot={
                passwordValidation.confirmPwMessage && (
                  <p
                    className={`mypage-edit__confirmPw-message ${
                      passwordValidation.isConfirmPwValid ? "success" : "error"
                    }`}
                  >
                    {passwordValidation.confirmPwMessage}
                  </p>
                )
              }
            />

            <div className="w-[363px] flex flex-col relative mb-[45px]">
              <button
                type="button"
                className="mypage-edit__pw-cancel"
                onClick={() => setPwEditMode("default")}
              >
                비밀번호 변경 취소
              </button>
            </div>
          </>
        )}

        <FormField
          id="email"
          ref={fieldRefs.email}
          label="이메일"
          required
          placeholder="이메일을 입력해주세요"
          value={editInfo.email}
          onChange={(value) => handleInfoChange("email", value)}
        />

        <div className="mypage-edit__action-group">
          <button onClick={() => navigate("/mypage")}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
      {successMessage && (
        <MessagePopup
          message={successMessage}
          onFinish={() => setSuccessMessage(null)}
        />
      )}

      {error && (
        <MessagePopup
          message={error.message}
          onFinish={() => {
            // fieldRefs[error.field].current?.focus();
            setError(null);
          }}
        />
      )}
    </>
  );
};

export default MyPageEdit;
