import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import { useEffect, useRef, useState } from "react";
import "../../assets/css/header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인유무
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 검색포커싱
  const [isFocused, setIsFocused] = useState(false);

  // selectbox 클릭유무
  const [isOpen, setIsOpen] = useState(false);

  // 선택된 selectbox
  const [selected, setSelected] = useState("선택");

  // selectRef 영역 DOM을 감지하기 위한 Ref
  const selectRef = useRef<HTMLDivElement>(null);

  // 검색어 상태
  const [keyword, setKeywrod] = useState("");

  // url 변경할때 검색창 자동 초기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlOption = params.get("option") || "선택";
    if (urlOption) setSelected(urlOption);
    const urlKeyword = params.get("keyword") || "";
    if (urlKeyword !== null) setKeywrod(urlKeyword);
    // setKeywrod(urlKeyword);
  }, [location.search]);

  // handleSelect
  const handleSelect = (value: any) => {
    setSelected(value);
    setIsOpen(false);
  };

  // handlesearch
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selected === "선택") {
        return;
      }
      if (!keyword.trim()) {
        return;
      }

      navigate(
        `/member/keyword/?option=${selected}&keyword=${encodeURIComponent(
          keyword
        )}`
      );
    }
  };

  // 바깥 클릭시 select  닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    // return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // 로그아웃 api
  const handleLogout = () => {
    if (!window.confirm("로그아웃하시겠습니까?")) {
      return;
    }
    axiosInstance
      .post("/logout", {})
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          alert("로그아웃되었습니다.");
          setUserInfo(null);
          sessionStorage.removeItem("recoil-persist");
          // if (window.confirm("로그아웃하시겠습니까?")) {
          //   alert("로그아웃되었습니다.");
          //   setUserInfo({
          //     userIdx: null,
          //     nickName: "",
          //     userName: "",
          //     email: "",
          //     adminAt: "",
          //     firstAt: "",
          //     id: "",
          //   });
          //   sessionStorage.removeItem("recoil-persist");
          // }
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div className="header-wrap">
        <div className="logo" onClick={() => navigate("/")}></div>
        <div>
          <div className="customSelect" ref={selectRef}>
            <div
              className="selectBox"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p className={selected === "선택" ? "placeholder" : "black"}>
                {selected}
              </p>
              <div className="selectBox-arrow"></div>
            </div>

            {isOpen && (
              <ul className="optionList">
                <li onClick={() => handleSelect("도서명")}>도서명</li>
                <li onClick={() => handleSelect("작가명")}>작가명</li>
              </ul>
            )}
          </div>

          <div className={`search-bar-wrap ${isFocused ? "focused" : ""}`}>
            <i className="search-icon"></i>
            <input
              className="search"
              type="search"
              placeholder="원하는 도서명이나 작가명을 검색해보세요."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={keyword}
              onChange={(e) => setKeywrod(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div className="side-menu">
          {userInfo ? (
            <>
              <button
                className="menu-mypage"
                onClick={() => navigate("/mypage")}
              >
                <p className="menu-mypage-text">마이페이지</p>
              </button>
              <button className="menu-logout" onClick={handleLogout}>
                <p className="menu-logout-text">로그아웃</p>
              </button>
            </>
          ) : (
            <>
              <button className="menu-logIn" onClick={() => navigate("/login")}>
                <p className="menu-login-text">로그인</p>
              </button>
              <button
                className="menu-membership"
                onClick={() => navigate("/member")}
              >
                <p className="menu-membership-text">회원가입</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
