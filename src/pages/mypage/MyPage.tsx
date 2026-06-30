import { Outlet } from 'react-router-dom';

import MyPageTopMenu from '../../layouts/MypageTopMenu';
import { useUserInfoQuery } from './hooks/useUserInfoQueries';

const MyPage = () => {
  // 마이페이지 사용자 정보 조회
  const { data: userInfo, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* 마이페이지에 어울리는 문구로 교체 */}
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
