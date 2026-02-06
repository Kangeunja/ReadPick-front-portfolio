import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MemberLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    nickName: "",
    id: "",
    pw: "",
    email: "",
  });

  const [idCheckMessage, setIdCheckMessage] = useState(""); // 아이디 체크 메세지 추가
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(""); // 비밀번호 확인 메세지 추가
  const [idValId, setIdValId] = useState(true); // 아이디 체크 메세지 색깔
  const [pwValPw, setPwValPw] = useState(true); // 비밀번호 메세지 색깔

  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 보이기 상태
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false); // 비밀번호 확인 보이기 상태

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((state) => ({
      ...state,
      [name]: newValue,
    }));

    let newValue = value;
    if (name !== "userName" && name !== "nickName") {
      newValue = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    }

    if (name === "id") {
      setIdCheckMessage(""); // 아이디 새로 입력시 메세지 초기화
      setIdValId(true);
    }

    if (name === "pw") {
      setPasswordCheckMessage(""); // 비밀번호 새로 입력시 메세지 초기화
      setPwValPw(true);
    }
  };

  // 회원가입
  const handleLoginController = () => {
    if (userInfo.id === "") {
      alert("아이디를 입력해주세요");
      return;
    } else if (!idCheckMessage) {
      alert("아이디 중복확인 해주세요");
      return;
    } else if (!idValId) {
      alert("사용 불가능한 아이디입니다. 다시 입력 후 중복 확인을 해주세요.");
      return;
    } else if (userInfo.pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    } else if (!passwordCheckMessage) {
      alert("비밀번호확인을 입력해주세요");
      return;
    } else if (!pwValPw) {
      alert("일치하지 않은 비밀번호입니다. 다시 입력해주세요");
      return;
    } else if (userInfo.userName === "") {
      alert("이름을 입력해주세요");
      return;
    } else if (userInfo.nickName === "") {
      alert("닉네임을 입력해주세요");
      return;
    } else if (userInfo.email === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    axiosInstance
      .post("/userInsert", userInfo)
      .then((res) => {
        console.log(res.data, "sucess");
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      })
      .catch((error) => {
        console.log("Member Login failed", error);
      });
  };

  // 아이디 중복확인
  const handleIdCheck = () => {
    if (!userInfo.id.trim()) {
      alert("아이디를 입력해주세요");
      return;
    }
    axiosInstance
      .post(`/checkId?id=${userInfo.id}`)
      .then((res) => {
        if (res.data.result === false) {
          setIdCheckMessage("사용 불가능한 ID 입니다.");
          setIdValId(false);
        } else {
          setIdCheckMessage("사용 가능한 ID 입니다.");
          setIdValId(true);
        }
      })
      .catch((error) => {
        console.log("Member checkId failed", error);
      });
  };

  // 비밀번호 확인
  const handleOnChangePassword = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((state) => ({
      ...state,
      [name]: value,
    }));

    if (value !== userInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
    } else if (value === userInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setPwValPw(true);
    }
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // 비밀번호확인 숨기기/보이기 토글 함수
  const togglePasswordCheckVisibility = () => {
    setPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  return (
    <>
      <div className="sub-img"></div>
      <div className="member-wrap">
        <div className="member-number-text">
          <p className="number">2/2</p>
          <p className="require">
            <span>*</span>필수입력사항
          </p>
        </div>
        <div className="member-title">회원가입</div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>아이디</p>
            <p>*</p>
          </div>
          <div className="id-check-wrap">
            <input
              name="id"
              className="mem-id"
              type="text"
              placeholder="6자이상의 영문 혹은 영문과 숫자조합"
              maxLength={15}
              value={userInfo.id}
              onChange={handleChange}
            />
            {idCheckMessage && (
              <p className={`id-CheckMessage ${idValId ? "success" : "error"}`}>
                {idCheckMessage}
              </p>
            )}
          </div>

          <button type="button" className="id-check" onClick={handleIdCheck}>
            중복확인
          </button>
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>비밀번호</p>
            <p>*</p>
          </div>
          <input
            name="pw"
            className="mem-pw"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
            value={userInfo.pw}
            onChange={handleChange}
          />

          {!isPasswordVisible ? (
            <div className="toggle-visibility">
              <VisibilityIcon onClick={togglePasswordVisibility} />
            </div>
          ) : (
            <div className="toggle-visibility">
              <VisibilityOffIcon onClick={togglePasswordVisibility} />
            </div>
          )}
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>비밀번호확인</p>
            <p>*</p>
          </div>
          <div className="password-wrap">
            <input
              name="pwConfirm"
              className="mem-pw"
              type={isPasswordConfirmVisible ? "text" : "password"}
              placeholder="비밀번호를 한번 더 입력해주세요"
              maxLength={15}
              onChange={handleOnChangePassword}
            />
            {passwordCheckMessage && (
              <p className={`member-pwCheck ${pwValPw ? "success" : "error"}`}>
                {passwordCheckMessage}
              </p>
            )}
          </div>
          {!isPasswordConfirmVisible ? (
            <div className="toggle-visibility">
              <VisibilityIcon onClick={togglePasswordCheckVisibility} />
            </div>
          ) : (
            <div className="toggle-visibility">
              <VisibilityOffIcon onClick={togglePasswordCheckVisibility} />
            </div>
          )}
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>이름</p>
            <p>*</p>
          </div>
          <input
            name="userName"
            className="mem-name"
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={15}
            value={userInfo.userName}
            onChange={handleChange}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>닉네임</p>
            <p>*</p>
          </div>
          <input
            name="nickName"
            className="mem-nickName"
            type="text"
            placeholder="닉네임을 입력해주세요"
            maxLength={15}
            value={userInfo.nickName}
            onChange={handleChange}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>이메일</p>
            <p>*</p>
          </div>
          <input
            name="email"
            className="mem-email"
            type="text"
            placeholder="예:dmswk2414@readpick.com"
            // maxLength={15}
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="member-button-wrap">
          <button className="mem-cancel">취소</button>
          <button className="mem-ok" onClick={handleLoginController}>
            회원가입
          </button>
        </div>
      </div>
      {/* {isShowPopup && <MemberLoginPopup onClose={() => setShowPopup(false)} />} */}
    </>
  );
};
export default MemberLogin;
