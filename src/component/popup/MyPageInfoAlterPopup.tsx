import { useEffect, useRef, useState } from "react";
import "../../assets/css/mypageInfoAlterPopup.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MyPageInfoAlterPopup = ({
  onClose,
  editableUserInfo,
  onPasswordChange,
}: any) => {
  console.log(editableUserInfo.pw);

  // 현재 비밀번호 입력창
  const [currentPw, setCurrentPw] = useState("");

  // 현재 비밀번호 메시지 상태
  const [currentPwMessage, setCurrentPwMessage] = useState("");

  // 현재 비밀번호 메시지 색깔
  const [currentPwVaild, setCurrentPwValid] = useState(true);

  // 새 비밀번호 입력창
  const [newPw, setNewPw] = useState("");

  // 새 비밀번호 메시지 상태
  const [newPwMessage, setNewPwMessage] = useState("");

  // 새 비밀번호 메시지 색깔
  const [newPwVaild, setNewPwValid] = useState(true);

  // 새 비밀번호 확인 입력창
  const [newPwCheck, setNewPwCheck] = useState("");

  // 새 비밀번호 확인 메시지 상태
  const [newPwCheckMessage, setNewPwCheckMessage] = useState("");

  // 새 비밀번호 확인 메시지 색깔
  const [newPwCheckVaild, setNewPwCheckValid] = useState(true);

  // 현재 비밀번호 확인 보이기 상태
  const [isPasswordCurrentVisible, setPasswordCurrentVisible] = useState(false);

  // 비밀번호 보이기 상태
  const [isPasswordNewVisible, setPasswordNewVisible] = useState(false);

  // 비밀번호 확인 보이기 상태
  const [isPasswordNewCheckVisible, setPasswordNewCheckVisible] =
    useState(false);

  // 현재 비밀번호 포커싱
  const pwRef = useRef<HTMLInputElement>(null);

  // 새 비밀번호 포커싱
  const newPwRef = useRef<HTMLInputElement>(null);

  // 새 비밀번호 확인 포커싱
  const newPwCheckRef = useRef<HTMLInputElement>(null);

  // 현재 비밀번호 숨기기/보이기 토글 함수
  const toggleCurrentPasswordVisibility = () => {
    setPasswordCurrentVisible(!isPasswordCurrentVisible);
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const toggleNewPasswordVisibility = () => {
    setPasswordNewVisible(!isPasswordNewVisible);
  };

  // 비밀번호 확인 숨기기/보이기 토글 함수
  const toggleNewCheckPasswordVisibility = () => {
    setPasswordNewCheckVisible(!isPasswordNewCheckVisible);
  };

  // 새 비밀번호 확인 비활성화 로직
  const isNewPwCheckDisabled =
    !newPw || newPw === editableUserInfo.pw || !newPwVaild;

  // 확인버튼 비활성화 로직
  const isConfirmDisabled =
    !currentPw ||
    !currentPwVaild ||
    !newPw ||
    !newPwVaild ||
    !newPwCheck ||
    !newPwCheckVaild;

  // 페이지 진입시 처음 실행
  useEffect(() => {
    pwRef.current?.focus();
    if (!newPw) {
      setNewPwCheck("");
      setNewPwCheckMessage("");
      setNewPwCheckValid(true);
    }
  }, []);

  // 새 비밀번호 검증 함수
  const validateNewPw = (pw: string) => {
    if (!pw) {
      setNewPwMessage("");
      setNewPwValid(true);
      return;
    }

    if (pw === editableUserInfo.pw) {
      setNewPwMessage("현재 비밀번호와 일치합니다.");
      setNewPwValid(false);
      return;
    }

    if (pw.length < 5) {
      setNewPwMessage("비밀번호는 최소 5자리 이상이어야 합니다.");
      setNewPwValid(false);
      return;
    }

    setNewPwMessage("사용가능한 비밀번호입니다.");
    setNewPwValid(true);
  };

  // 새 비밀번호 확인 검증 함수
  const validateNewPwCheck = (value: string) => {
    if (!value) {
      setNewPwCheckMessage("");
      setNewPwCheckValid(true);
      return;
    }

    if (value === newPw) {
      setNewPwCheckMessage("입력한 비밀번호와 일치합니다.");
      setNewPwCheckValid(true);
    } else {
      setNewPwCheckMessage("입력한 비밀번호와 일치하지 않습니다.");
      setNewPwCheckValid(false);
    }
  };

  const handleChange = (
    field: "current" | "new" | "newCheck",
    value: string
  ) => {
    const normalized = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");

    // 유효성 검사
    if (field === "current") {
      setCurrentPw(normalized);

      if (!normalized) {
        setCurrentPwMessage("");
        setCurrentPwValid(true);
        return;
      }

      if (editableUserInfo.pw === normalized) {
        setCurrentPwMessage("비밀번호가 일치합니다.");
        setCurrentPwValid(true);
      } else {
        setCurrentPwMessage("비밀번호가 일치하지 않습니다.");
        setCurrentPwValid(false);
      }
      return;
    }

    if (field === "new") {
      setNewPw(normalized);

      // 새 비밀번호 변경 시 새 비밀번호 확인 관련 초기화
      setNewPwCheck("");
      setNewPwCheckMessage("");
      setNewPwCheckValid(true);

      validateNewPw(normalized);
      return;
    }

    if (field === "newCheck") {
      setNewPwCheck(normalized);

      validateNewPwCheck(normalized);
    }
  };

  // 취소버튼
  const handleClose = () => {
    onClose(false);
  };

  // 확인버튼
  const handleConfirm = () => {
    if (isConfirmDisabled) {
      if (!currentPw) {
        alert("현재 비밀번호를 입력해주세요.");
        pwRef.current?.focus();
        return;
      }

      if (!currentPwVaild) {
        pwRef.current?.focus();
        return;
      }

      if (!newPw) {
        alert("새 비밀번호를 입력해주세요.");
        newPwRef.current?.focus();
        return;
      }

      if (!newPwVaild) {
        newPwRef.current?.focus();
        return;
      }

      if (!newPwCheck) {
        alert("새 비밀번호 확인을 입력해주세요.");
        newPwCheckRef.current?.focus();
        return;
      }

      if (!newPwCheckVaild) {
        newPwCheckRef.current?.focus();
        return;
      }
    }

    // 부모 상태 업데이트
    onPasswordChange(newPw);
  };

  return (
    <div className="mypageInfoAlter-wrap">
      <div className="mypageInfoAlter-box">
        <div className="mypageInfoAlter-title">비밀번호 변경</div>
        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>현재 비밀번호</p>
            <input
              ref={pwRef}
              // onChange={handleChange}
              onChange={(e) => handleChange("current", e.target.value)}
              type={isPasswordCurrentVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={currentPw}
            />
            {!isPasswordCurrentVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityIcon onClick={toggleCurrentPasswordVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityOffIcon onClick={toggleCurrentPasswordVisibility} />
              </div>
            )}
          </div>
          {currentPwMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                currentPwVaild ? "success" : "error"
              }`}
            >
              {currentPwMessage}
            </p>
          )}
        </div>

        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>새 비밀번호</p>
            <input
              ref={newPwRef}
              onChange={(e) => handleChange("new", e.target.value)}
              type={isPasswordNewVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPw}
            />
            {!isPasswordNewVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityIcon onClick={toggleNewPasswordVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityOffIcon onClick={toggleNewPasswordVisibility} />
              </div>
            )}
          </div>
          {newPwMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                newPwVaild ? "success" : "error"
              }`}
            >
              {newPwMessage}
            </p>
          )}
        </div>

        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>새 비밀번호 확인</p>
            <input
              ref={newPwCheckRef}
              onChange={(e) => handleChange("newCheck", e.target.value)}
              type={isPasswordNewCheckVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPwCheck}
              disabled={isNewPwCheckDisabled}
            />
            {!isPasswordNewCheckVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityIcon onClick={toggleNewCheckPasswordVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <VisibilityOffIcon onClick={toggleNewCheckPasswordVisibility} />
              </div>
            )}
          </div>

          {newPwCheckMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                newPwCheckVaild ? "success" : "error"
              }`}
            >
              {newPwCheckMessage}
            </p>
          )}
        </div>

        <div className="mypageInfoAlter-button">
          <button type="button" onClick={handleClose}>
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfoAlterPopup;
