import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

const IsLoginPopup = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed w-full h-full top-0 bottom-0 left-0 right-0
      bg-[rgba(0, 0, 0, 0.4)] z-99
    "
    >
      <div
        className="h-[200px] bg-white fixed z-[100]
        shadow-card-shadow
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
         px-[25px] box-border flex flex-col justify-center items-center
      "
      >
        <div className="mb-5 text-[17px] font-medium">
          🎉ReadPick에 오신 걸 환영해요!
        </div>
        <p className="text-[14px] mb-[30px]">
          첫 리뷰를 남기고 당신만의 독서 기록을 시작해보세요 📖
        </p>
        <div className="flex gap-[10px]">
          <button
            className="loginPopup-btn 
            hover:bg-[rgb(223,159,76)] 
              hover:cursor-pointer"
            onClick={() => navigate(ROUTES.MAIN)}
          >
            메인으로 가기
          </button>
          <button
            className="loginPopup-btn
            hover:bg-[rgb(223,159,76)] 
              hover:cursor-pointer"
            onClick={() => navigate(ROUTES.KEYWORD)}
          >
            리뷰 쓰러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsLoginPopup;
