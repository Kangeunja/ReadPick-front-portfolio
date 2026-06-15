import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

const IsLoginPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="animation-popup">
      <div className="shadow-card-shadow animation-box px-[40px] py-[25px]">
        <div className="mb-[10px] text-[15px] font-bold">🎉ReadPick에 오신 걸 환영해요!</div>
        <p className="mb-[20px] text-[13px]">첫 리뷰를 남기고 당신만의 독서 기록을 시작해보세요 :)</p>
        <div className="flex gap-[15px]">
          <button
            className="border-borderLightColor hover:border-pointColor hover:shadow-borderShadow cursor-pointer border px-[18px] py-[8px] text-[13px]"
            onClick={() => navigate(ROUTES.MAIN)}
          >
            메인으로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsLoginPopup;
