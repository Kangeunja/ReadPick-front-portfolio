import { Outlet, useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-[100px] overflow-hidden">
      <div
        className="w-[127px] h-[54px] bg-logo-png
        bg-cover cursor-pointer my-[80px] mx-auto
        laptop-lg:my-[50px] 
        "
        onClick={() => navigate("/")}
      ></div>
      <div className="flex justify-center mb-[50px]">
        <p className="mr-[10px]">이미 회원이신가요?</p>
        <button
          className="border-none bg-transparent cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Member;
