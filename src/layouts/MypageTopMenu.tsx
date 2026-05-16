// library
import { NavLink, useLocation } from "react-router-dom";
// constants
import { ROUTES } from "../constants/routes";

const MyPageTopMenu = () => {
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith(ROUTES.PROFILE);
  const isInfoPage = location.pathname.startsWith(ROUTES.PWCONFIRM);
  const isReviewPage = location.pathname.startsWith(ROUTES.MYPAGEREVIEW);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link-item ${isActive ? "active" : ""}`;

  return (
    <div className="py-5 px-0 box-border flex">
      <div className="w-3 h-[13px] mr-[10px] mt-[3px] bg-keyword-home"></div>

      <NavLink to={ROUTES.MYPAGE} end className={getNavLinkClass}>
        마이페이지
      </NavLink>

      {isProfilePage && (
        <NavLink to={ROUTES.PROFILE} className={getNavLinkClass}>
          <span className="mypage-header__arrow" />
          프로필 관리
        </NavLink>
      )}

      {isInfoPage && (
        <NavLink to={ROUTES.PWCONFIRM} className={getNavLinkClass}>
          <span className="nav-arrow-icon" />내 정보 관리
        </NavLink>
      )}

      {isReviewPage && (
        <NavLink to={ROUTES.MYPAGEREVIEW} className={getNavLinkClass}>
          <span className="nav-arrow-icon" />
          내리뷰
        </NavLink>
      )}
    </div>
  );
};

export default MyPageTopMenu;
