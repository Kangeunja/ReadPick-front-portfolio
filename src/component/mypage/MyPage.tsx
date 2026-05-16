// router
import { Outlet } from "react-router-dom";

// components
import MyPageTopMenu from "../../layouts/MypageTopMenu";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";

const MyPage = () => {
  // 마이페이지 사용자 정보 조회
  const { data: userInfo } = useUserInfoQuery();

  return (
    <>
      <div className="w-full">
        <div className="w-main-w mx-auto">
          <MyPageTopMenu />
          <Outlet context={{ userInfo }} />
        </div>
      </div>
    </>
  );
};

export default MyPage;
