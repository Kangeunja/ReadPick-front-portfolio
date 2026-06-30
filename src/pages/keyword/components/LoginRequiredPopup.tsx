import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';

const LoginRequiredPopup = ({ onClose }: any) => {
  const navigate = useNavigate();

  useLockBodyScroll();

  return (
    <div className="animation-fadeIn-popup">
      <div className="animation-fadeIn-box">
        <div className="mb-[16px] text-[20px] font-medium">로그인이 필요한 서비스입니다.</div>
        <div className="text-[14px] text-[#333333]">로그인 페이지로 이동하시겠습니까?</div>

        <div className="mt-[36px] flex justify-center gap-[15px]">
          <button
            className="login-required__cancel-btn h-[43px] w-[111px] rounded-[5px] border-none bg-[#545454] text-white"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="login-required__check-btn h-[43px] w-[111px] rounded-[5px] border-none bg-pointColor text-white hover:bg-btnhoverColor"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredPopup;
