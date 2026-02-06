import { useNavigate } from "react-router-dom";
import "../../assets/css/loginPopup.css";

const IsLoginPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="isLoginPopup-wrap">
      <div className="isLoginPopup-box">
        <div className="isLoginPopup-title">🎉ReadPick에 오신 걸 환영해요!</div>
        <p>첫 리뷰를 남기고 당신만의 독서 기록을 시작해보세요 📖</p>
        <div className="isLoginPopup-btn">
          <button onClick={() => navigate("/")}>메인으로 가기</button>
          <button onClick={() => navigate("/member/keyword")}>
            리뷰 쓰러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsLoginPopup;
