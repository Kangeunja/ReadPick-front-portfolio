import { useEffect } from "react";
import "../../assets/css/LoginRequiredPopup.css";
import { useNavigate } from "react-router-dom";

const LoginRequiredPopup = ({ onClose }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="login-required__popup">
      <div className="login-required__popup-box">
        <div className="login-required__popup-header">
          로그인이 필요한 서비스입니다.
        </div>
        <div className="login-required__popup-info">
          로그인 페이지로 이동하시겠습니까?
        </div>

        <div className="login-required__popup-actions">
          <button
            className="login-required__popup-btn login-required__cancel-btn"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="login-required__popup-btn login-required__check-btn"
            onClick={() => navigate("/login")}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredPopup;
