import { useRef, useState } from "react";
import "../../assets/css/mypageEdit.css";
import FormField from "../../layouts/field/FormField";
import axiosInstance from "../../api/axiosInstance";
import MessagePopup from "../popup/MessagePopup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const MyPageEdit = ({
  isDefaultImage,
  uploadedImage,
  handleEditProfileImg,
  userInfo,
  fetchUserInfo,
}: any) => {
  // 프로필 파일 input 포커싱
  const editImgRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // 프로필 이미지 삭제 팝업 모달여부
  const [isProfileDeletePopup, setIsProfileDeletePopup] = useState(false);

  // 아이디 변경하기 버튼 클릭시 상태변화모드
  const [idEditMode, setIdEditMode] = useState<
    "default" | "checking" | "confirmed"
  >("default");

  // 비밀번호 변경하기 버튼 클릭시 현재비밀번호, 새비밀번호 상태
  const [pwEditMode, setPwEditMode] = useState<"default" | "checking">(
    "default"
  );

  const [passwordForm, setPasswordForm] = useState({
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });

  // 수정용 로컬 상태
  const [editInfo, setEditInfo] = useState({
    userName: userInfo.userName,
    nickName: userInfo.nickName,
    id: userInfo.id,
    pw: userInfo.pw,
    email: userInfo.email,
    adminAt: userInfo.adminAt,
    firstAt: userInfo.firstAt,
  });

  // 아이디 중복확인 메세지 추가
  const [idCheckMessage, setIdCheckMessage] = useState("");

  // 아이디 중복확인 메세지 색깔
  const [isIdValid, setIsIdValid] = useState(false);

  // 실패 팝업 메세지 상태
  // const [pwErrorMessage, setPwErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<{
    field: keyof typeof fieldRefs;
    message: string;
  } | null>(null);

  // 새 비밀번호 메시지 추가
  const [newPwError, setNewPwError] = useState("");

  // 아이디 중복확인 메세지 색깔
  const [isNewPwValid, setIsNewPwValid] = useState(false);

  // 새 비밀번호 확인 메시지 추가
  const [confirmPwError, setConfirmPwError] = useState("");

  // 아이디 중복확인 메세지 색깔
  const [isConfirmPwValid, setIsConfirmPwValid] = useState(false);

  // 현재 비밀번호 토글상태
  const [isCurrentPwVisible, setIsCurrentPwVisible] = useState(false);

  // 새 비밀번호 토글상태
  const [isNewPwVisible, setIsNewPwVisible] = useState(false);

  // 새 비밀번호확인 토글상태
  const [isConfirmPwVisible, setIsConfirmVisible] = useState(false);

  // 최종 저장버튼 완료팝업
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fieldRefs = {
    nickName: useRef<HTMLInputElement | null>(null),
    userName: useRef<HTMLInputElement | null>(null),
    id: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    currentPw: useRef<HTMLInputElement | null>(null),
    newPw: useRef<HTMLInputElement | null>(null),
    confirmPw: useRef<HTMLInputElement | null>(null),
  };

  // 필드 수정하기 change
  const handleInfoChange = (field: keyof typeof editInfo, value: string) => {
    setEditInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 중복확인 버튼
  const handleIdCheck = () => {
    if (!editInfo.id) {
      setIdCheckMessage("아이디가 입력되지 않았습니다.");
      setIsIdValid(false);
      return;
    }
    if (userInfo.id === editInfo.id) {
      setIdCheckMessage("아이디가 변경되지 않았습니다.");
      setIsIdValid(false);
      return;
    }

    axiosInstance
      .post(`/checkId?id=${editInfo.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result === false) {
          setIdCheckMessage("사용 불가능한 ID 입니다.");
          setIsIdValid(false);
        } else {
          setIdCheckMessage("사용 가능한 ID 입니다.");
          setIsIdValid(true);
        }
      })
      .catch((error) => console.log(error));
  };

  // 새 비밀번호 정규식
  const validateNewPassword = (newPw: string) => {
    if (newPw.length < 8) return "비밀번호는 최소 8자리 이상이어야 합니다.";
    if (newPw === passwordForm.currentPw)
      return "현재 비밀번호와 다르게 입력해주세요.";

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!pwRegex.test(newPw)) {
      return "영문, 숫자, 특수문자를 포함해주세요.";
    }

    return "";
  };

  // 현재비밀번호, 새비밀번호 수정하기 change
  const handlePwChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPw") {
      setNewPwError(validateNewPassword(value));
      setIsNewPwValid(false);
    }

    if (field === "confirmPw") {
      if (passwordForm.newPw !== value) {
        setConfirmPwError("입력한 비밀번호와 일치하지 않습니다.");
        setIsConfirmPwValid(false);
      } else {
        setConfirmPwError("");
      }
    }
  };

  // 저장버튼
  const handleSave = () => {
    if (!editInfo.nickName) {
      setError({
        field: "nickName",
        message: "닉네임을 입력해주세요.",
      });
      return;
    }

    if (!editInfo.userName) {
      setError({
        field: "userName",
        message: "이름을 입력해주세요.",
      });
      return;
    }

    if (!editInfo.id) {
      setError({
        field: "id",
        message: "아이디를 입력해주세요.",
      });
      return;
    }

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

    if (newPwError) {
      setError({
        field: "newPw",
        message: "비밀번호를 다시 확인해주세요.",
      });
    }

    if (confirmPwError) {
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
      <div className="mypage-edit__container">
        <div className="mypage-edit__img-wrap">
          <div
            className={`mypage-edit__img ${
              isDefaultImage ? "mypage-edit__img-has-default" : ""
            }`}
          >
            {isDefaultImage ? (
              <div className="mypage-edit__img--default" />
            ) : (
              <img
                src={uploadedImage || userInfo.fileName}
                alt="프로필 이미지"
              />
            )}
          </div>
        </div>
        <div className="mypage-edit__btn-wrap">
          <div onClick={() => editImgRef.current?.click()}>
            <button className="mypage-edit__btn">
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
            className={`mypage-edit__btn-trash ${
              isDefaultImage ? "disabled" : ""
            }`}
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
                    setEditInfo((prev) => ({
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
                  isIdValid ? "success" : "error"
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
              type={isCurrentPwVisible ? "text" : "password"}
              placeholder="현재 비밀번호를 입력해주세요"
              value={passwordForm.currentPw}
              onChange={(value) => handlePwChange("currentPw", value)}
              rightSlot={
                <span
                  className="mypage-edit__visible"
                  onClick={() => setIsCurrentPwVisible((prev) => !prev)}
                >
                  {isCurrentPwVisible ? (
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
                newPwError && (
                  <p
                    className={`mypage-edit__newPw-message ${
                      isNewPwValid ? "success" : "error"
                    }`}
                  >
                    {newPwError}
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
                confirmPwError && (
                  <p
                    className={`mypage-edit__confirmPw-message ${
                      isConfirmPwValid ? "success" : "error"
                    }`}
                  >
                    {confirmPwError}
                  </p>
                )
              }
            />

            <div className="mypage-edit__field">
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
            fieldRefs[error.field].current?.focus();
            setError(null);
          }}
        />
      )}
    </>
  );
};

export default MyPageEdit;
