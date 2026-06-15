import { NavLink, useLocation } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

const MENU_MAP = {
  [ROUTES.PROFILE]: '프로필 관리',
  [ROUTES.PWCONFIRM]: '내 정보 관리',
  [ROUTES.MYPAGEREVIEW]: '내리뷰',
};

const MyPageTopMenu = () => {
  const { pathname } = useLocation();

  const currentMenuKey = Object.keys(MENU_MAP).find((item) => pathname.startsWith(item));
  const currentMenuName = currentMenuKey ? MENU_MAP[currentMenuKey] : null;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => `nav-link-item ${isActive ? 'active' : ''}`;

  return (
    <div className="box-border flex px-0 py-5">
      <div className="bg-icon-home mr-[10px] mt-[3px] h-[13px] w-3"></div>

      <NavLink to={ROUTES.MYPAGE} end className={getNavLinkClass}>
        마이페이지
      </NavLink>

      {currentMenuKey && currentMenuName && (
        <>
          <span className="bg-icon-arrow mr-1 mt-[3px] inline-block h-3 w-3 bg-contain bg-no-repeat" />
          <NavLink to={currentMenuKey} className={getNavLinkClass}>
            {currentMenuName}
          </NavLink>
        </>
      )}
    </div>
  );
};

export default MyPageTopMenu;
