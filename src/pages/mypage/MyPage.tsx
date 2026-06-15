import { Outlet } from 'react-router-dom';

import MyPageTopMenu from '../../layouts/MypageTopMenu';
import { useUserInfoQuery } from './hooks/useUserQueries';

const MyPage = () => {
  // 마이페이지 사용자 정보 조회
  const { data: userInfo } = useUserInfoQuery();

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
