import { NavLink, useMatch, useNavigate } from "react-router-dom";
import "../../assets/css/myPageTopMenu.css";
// interface MyPageTopMenuProps {
//   activeTab: "home" | "review" | "info";
//   onChange: (tab: "home" | "review" | "info") => void;
// }

const MyPageTopMenu = () => {
  // const navigate = useNavigate();
  const isProfilePage = useMatch("/mypage/profile");
  const isMypageInfo = useMatch("/mypage/myInfo");
  const isMypageReview = useMatch("/mypage/myReview");
  return (
    <div className="mypage-header">
      <div className="mypage-icon"></div>

      <NavLink
        to="/mypage"
        end
        className={({ isActive }) =>
          `mypage-header__title ${isActive ? "active" : ""}`
        }
      >
        마이페이지
      </NavLink>

      {isProfilePage && (
        <NavLink
          to="/mypage/profile"
          className={({ isActive }) =>
            `mypage-header__title ${isActive ? "active" : ""}`
          }
        >
          <span className="mypage-header__arrow" />
          프로필 관리
        </NavLink>
      )}

      {isMypageInfo && (
        <NavLink
          to="/mypage/myInfo"
          className={({ isActive }) =>
            `mypage-header__title ${isActive ? "active" : ""}`
          }
        >
          <span className="mypage-header__arrow" />내 정보 관리
        </NavLink>
      )}

      {isMypageReview && (
        <NavLink
          to="/mypage/myReview"
          className={({ isActive }) =>
            `mypage-header__title ${isActive ? "active" : ""}`
          }
        >
          <span className="mypage-header__arrow" />
          내리뷰
        </NavLink>
      )}
    </div>
  );
};

export default MyPageTopMenu;
