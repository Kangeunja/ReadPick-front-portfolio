import { useNavigate } from 'react-router-dom';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

const LoginRequiredPopup = ({ onClose }: any) => {
  const navigate = useNavigate();

  useLockBodyScroll();

  return (
    <div className="animate-popup-bg-fade fixed bottom-0 left-0 right-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/40 opacity-0">
      <div className="animate-popup-box-fade fixed box-border flex w-[360px] flex-col justify-center bg-white p-[30px] text-center opacity-0 delay-[0.05s]">
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
            className="login-required__check-btn h-[43px] w-[111px] rounded-[5px] border-none bg-[#248f8f] text-white hover:bg-[#1e7373]"
            onClick={() => navigate('/login')}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredPopup;
