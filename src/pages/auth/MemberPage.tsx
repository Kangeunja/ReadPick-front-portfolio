import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

const MemberPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="mx-auto mb-[20px] mt-[80px] h-[54px] w-[127px] cursor-pointer bg-main-logo bg-cover laptop-lg:mt-[50px]"
        onClick={() => navigate(ROUTES.MAIN)}
      ></div>
      <div className="mb-[30px] flex justify-center text-[14px]">
        <p className="mr-[10px]">이미 회원이신가요?</p>
        <button type="button" className="cursor-pointer border-none bg-transparent hover:underline" onClick={() => navigate(ROUTES.LOGIN)}>
          로그인
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default MemberPage;
