import { Outlet } from 'react-router-dom';

import { useUserInfoQuery } from './hooks/useUserInfoQueries';

import MyPageTopMenu from 'layouts/MypageTopMenu';

const MyPage = () => {
  const { data: userInfo } = useUserInfoQuery();

  if (!userInfo) return null;

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
