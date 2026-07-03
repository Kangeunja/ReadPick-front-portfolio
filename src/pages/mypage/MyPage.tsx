import { Outlet } from 'react-router-dom';

import { useUserInfoQuery } from './hooks/useUserInfoQueries';
import MyPageTopMenu from 'layouts/MypageTopMenu';

const MyPage = () => {
  const { data: userInfo, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="font-gowun text-[20px] text-[#454545]">내 서재 정보를 불러오고 있어요... 📖</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-container-w">
        <MyPageTopMenu />
        <Outlet context={{ userInfo }} />
      </div>
    </>
  );
};

export default MyPage;
