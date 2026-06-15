import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import Main from '../pages/main/MainPage';
import MemberLogin from '../pages/auth/member/MemberLogin';
import MemberKeyword from '../pages/keyword/KeywordBookListPage';
import MemberKeywordDetail from '../pages/keyword/KeywordBookDetailPage';
import MyPage from '../pages/mypage/MyPage';
import { RecoilRoot } from 'recoil';
import Admin from '../component/admin/Admin';
import AdminMain from '../component/admin/AdminMain';
import ScrollTop from '../component/common/ScrollTop';
import MyPageHome from '../pages/mypage/MyPageDashboardPage';
import ProfileManage from '../component/mypage/ProfileManage';
import MyPageReview from '../pages/mypage/MyReviewsPage';
import Member from '../pages/auth/MemberPage';
import MemberAgreement from '../pages/auth/member/MemberAgreement';
import { ROUTES } from '../constants/routes';
import PasswordConfirm from '../component/mypage/PasswordConfirm';
import { USER_ROLE } from '../constants/role';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';

const BrowserRouterDom = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.MAIN} element={<Main />}></Route>

            <Route path={ROUTES.KEYWORD} element={<MemberKeyword />}></Route>
            <Route path={ROUTES.KEYWORDDETAIL} element={<MemberKeywordDetail />}></Route>

            <Route
              path={ROUTES.MYPAGE}
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<MyPageHome />} />
              <Route path={ROUTES.PROFILE} element={<ProfileManage />} />
              <Route path={ROUTES.PWCONFIRM} element={<PasswordConfirm />}></Route>
              <Route path={ROUTES.MYPAGEREVIEW} element={<MyPageReview />}></Route>
            </Route>
          </Route>

          {/* 로그인 페이지 */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>

          <Route path={ROUTES.MEMBER} element={<Member />}>
            <Route index element={<MemberAgreement />} />
            <Route path={ROUTES.MEMBERLOGIN} element={<MemberLogin />} />
          </Route>

          <Route path={USER_ROLE.ADMIN} element={<Admin />}></Route>
          <Route path={USER_ROLE.USER} element={<AdminMain />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default BrowserRouterDom;
