import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import Main from "../component/main/Main";
import Login from "../component/login/Login";
import Member from "../component/member/Member";
import MemberLogin from "../component/member/MemberLogin";
import MemberKeyword from "../component/memberKeyword/MemberKeyword";
import MemberKeywordDetail from "../component/memberKeyword/MemberKeywordDetail";
import MyPage from "../component/mypage/MyPage";
import { RecoilRoot } from "recoil";
import Admin from "../component/admin/Admin";
import AdminMain from "../component/admin/AdminMain";
import ScrollTop from "../layouts/scrollTop/ScrollTop";
import MyPageHome from "../component/mypage/MyPageHome";
import MyReviewManage from "../component/mypage/MyReviewManage";
import ProfileManage from "../component/mypage/ProfileManage";
import MyPageInfo from "../component/mypage/MyPageInfo";
import MyPageReview from "../component/mypage/MyPageReview";

const BrowserRouterDom = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />}></Route>

            <Route path="/member" element={<Member />}></Route>
            <Route path="/member/login" element={<MemberLogin />}></Route>
            <Route path="/member/keyword" element={<MemberKeyword />}></Route>
            <Route
              path="/member/keyword/detail/:bookIdx"
              element={<MemberKeywordDetail />}
            ></Route>

            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<MyPageHome />} />
              <Route path="profile" element={<ProfileManage />} />
              <Route path="myInfo" element={<MyPageInfo />}></Route>
              <Route path="myReview" element={<MyPageReview />}></Route>
              <Route path="reviews" element={<MyReviewManage />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/main" element={<AdminMain />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default BrowserRouterDom;
