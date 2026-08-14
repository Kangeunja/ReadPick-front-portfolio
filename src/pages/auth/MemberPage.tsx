import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from 'constants/routes';

const MemberPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="mx-auto mb-[20px] mt-[80px] h-[54px] w-[127px] cursor-pointer bg-main-logo bg-cover laptop-lg:mt-[50px]"
        onClick={() => navigate(ROUTES.MAIN)}
      ></div>
      <div className="mb-[30px] flex h-[30px] items-center justify-center">
        <p className="mr-[15px] text-[15px]">이미 회원이신가요?</p>
        <button
          type="button"
          className="rounded-[6px] bg-[#111827] px-[16px] py-[5px] text-[14px] font-medium text-white hover:bg-[#1f2937]"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          로그인
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default MemberPage;
