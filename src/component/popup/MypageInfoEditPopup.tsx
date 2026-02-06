import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../../assets/css/mypageInfoEditPopup.css";
import { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MypageInfoEditPopup = ({
  onClose,
  editableUserInfo,
  emailRef,
  idRef,
  setEditMode,
  targetField,
}: any) => {
  // 비밀번호 확인 보이기 상태
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  // 비밀번호 확인 메세지 추가
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  // 비밀번호 메세지 색깔
  const [pwValPw, setPwValPw] = useState(true);

  // 비밀번호 정보
  const [checkPw, setCheckPw] = useState("");

  // 비밀번호 포커싱
  const pwRef = useRef<HTMLInputElement>(null);

  // 페이지 진입시 처음 실행
  useEffect(() => {
    pwRef.current?.focus(); // ← 여기서 자동 포커싱!
  }, []);

  // 비밀번호확인 숨기기/보이기 토글 함수
  const togglePasswordCheckVisibility = () => {
    setPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  // 확인버튼 비활성화 로직
  const isConfirmDisabled = editableUserInfo.pw !== checkPw;

  // onChange 함수
  const handleChange = (e: string) => {
    const normalized = e.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");

    setCheckPw(normalized);

    // 입력할 때마다 메시지 초기화
    if (!normalized) {
      setPasswordCheckMessage("");
      setPwValPw(true);
      return;
    }

    if (editableUserInfo.pw === normalized) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setPwValPw(true);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
    }

    // // 한글 제거
    // const newValue = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");

    // // 영문으로 시작 + 영문/숫자, 15자 제한
    // const idRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;

    // if (newValue !== "" && !idRegex.test(newValue)) {
    //   return;
    // }
  };

  // onKeyDown 함수
  const handleKeyDown = (e: any) => {
    // if (e.nativeEvent.isComposing) return;
    // if (e.key === "Enter") {
    //   handleCheck();
    // }
  };

  // 취소버튼
  const handleClose = () => {
    onClose(false);
  };

  // 확인버튼
  const handleConfirm = () => {
    if (editableUserInfo.pw === checkPw) {
      // onClose(true);
      onClose(targetField);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
      pwRef.current?.focus();
    }
  };

  const handleCheck = () => {
    if (editableUserInfo.pw === checkPw) {
      onClose(true);
      if (emailRef?.current || idRef?.current) {
        emailRef.current.focus();
        idRef.current.focus();
        const length = emailRef.current.value.length;
        emailRef.current.setSelectionRange(length, length);
      }
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
      pwRef.current?.focus();
    }
  };

  return (
    <div className="mypageInfoEdit-wrap">
      <div className="mypageInfoEdit-box">
        <div className="mypageInfoEdit-title">본인 확인</div>
        <p className="mypageInfoEdit-sub-title">
          회원님의 정보를 안전하게 보호하기 위해 <br />
          비밀번호를 다시 입력해주세요.
        </p>
        <div className="mypageInfoEdit-input-box">
          <input
            ref={pwRef}
            className="mypageInfoEdit-input"
            value={checkPw}
            type={isPasswordConfirmVisible ? "text" : "password"}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleChange(e.target.value)}
            // onChange={(e) => setCheckPw(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //   handleCheck();
            //   }
            // }}
          />
          {!isPasswordConfirmVisible ? (
            <div className="mypageInfoEdit-popup-toggle-visibility">
              <VisibilityIcon onClick={togglePasswordCheckVisibility} />
            </div>
          ) : (
            <div className="mypageInfoEdit-popup-toggle-visibility">
              <VisibilityOffIcon onClick={togglePasswordCheckVisibility} />
            </div>
          )}
        </div>

        {passwordCheckMessage && (
          <p
            className={`mypageInfoEdit-popup-member-pwCheck ${
              pwValPw ? "success" : "error"
            }`}
          >
            {passwordCheckMessage}
          </p>
        )}

        <div className="mypageInfoEdit-button">
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
          {/* <button type="button" onClick={() => handleConfirm(targetField)}>
            확인
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MypageInfoEditPopup;
