// react
import { useEffect, useRef, useState } from "react";

// Router
import { useLocation, useNavigate } from "react-router-dom";

// Hooks
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";

// Store
import useAuthStore from "../store/authStore";

// Constants
import { ROUTES } from "../constants/routes";

interface HeaderProps {
  className?: string;
}

const SEARCH_OPTIONS = ["도서명", "작가명"];

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectRef = useRef<HTMLDivElement>(null); // selectRef 영역 DOM을 감지하기 위한 Ref
  const user = useAuthStore((state) => state.user);
  const { mutate: logoutMutate } = useLogoutMutation();

  // 상태 관리
  const [isFocused, setIsFocused] = useState(false); // 검색포커싱
  const [isOpen, setIsOpen] = useState(false); // selectbox 클릭유무
  const [selected, setSelected] = useState("선택"); // 선택된 selectbox
  const [keyword, setKeyword] = useState(""); // 검색어 상태

  // url 검색옵션과 키워드 추출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelected(params.get("option") || "선택");
    setKeyword(params.get("keyword") || "");
  }, [location.search]);

  // 바깥 클릭시 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // 검색 이동
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selected !== "선택" && keyword.trim()) {
      const params = new URLSearchParams({
        option: selected,
        keyword,
      });

      navigate(`${ROUTES.KEYWORD}?${params.toString()}`);
    }
  };

  // 로그아웃 api
  const handleLogout = () => {
    if (!window.confirm("로그아웃하시겠습니까?")) return;
    logoutMutate(undefined, {
      onSuccess: (res) => {
        if (res === "success") {
          alert("로그아웃되었습니다.");
          navigate(ROUTES.MAIN);
        }
      },
      onError: (error) => {
        console.error("로그아웃 중 에러 발생:", error);
        alert("로그아웃에 실패했습니다.");
      },
    });
  };

  return (
    <div className={`w-full h-[120px] border border-gray-line ${className}`}>
      <div
        className="
        w-[1300px] h-[100px] my-[20px] mx-auto 
        flex justify-between items-center"
      >
        <div
          className="w-[127px] h-[54px] bg-logo-png bg-cover cursor-pointer"
          onClick={() => navigate(ROUTES.MAIN)}
        ></div>
        <div>
          <div className="relative float-left mr-5" ref={selectRef}>
            <div
              className="
              w-[90px] h-[45px] bg-white border-[0.5px] 
              border-solid border-[#c4bfbf] rounded-[10px]
              p-[10px] box-border flex items-center cursor-pointer
              justify-between text-[#797979]
              "
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p
                className={
                  selected === "선택" ? "text-[#5e5e5e]" : "text-black"
                }
              >
                {selected}
              </p>
              <div className="w-3 h-3 bg-select-arrow"></div>
            </div>

            {isOpen && (
              <ul
                className="
              w-[90px] border-[0.5px] border-solid border-[#c4bfbf]
              rounded-[10px] p-[10px] box-border absolute top-[calc(100%+5px)]
              shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] bg-white z-10
              "
              >
                {SEARCH_OPTIONS.map((item) => (
                  <li
                    key={item}
                    className="transition-colors duration-200 
                    cursor-pointer block hover:bg-[#f2f2f2]"
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={`w-[400px] h-[45px] border border-[#d7d5d5] 
              rounded-[10px] flex items-center
              ${isFocused ? "border-[#393939]" : ""}`}
          >
            <i className="w-[25px] h-[25px] bg-search-icon bg-cover ml-5 float-left"></i>
            <input
              className="w-[350px] h-full outline-none border-none
                ml-[15px] text-[#393939] text-base bg-transparent
              "
              type="search"
              placeholder="원하는 도서명이나 작가명을 검색해보세요."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        <div className="h-[50px] leading-[50px] flex">
          {user ? (
            <>
              <button
                className="side-btn mr-[15px] hover:text-[#393939]"
                onClick={() => navigate(ROUTES.MYPAGE)}
              >
                마이페이지
              </button>
              <button
                className="side-btn mr-[15px] hover:text-[#393939]"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                className="side-btn mr-[15px] hover:text-[#393939]"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                로그인
              </button>
              <button
                className="side-btn mr-[15px] hover:text-[#393939]"
                onClick={() => navigate(ROUTES.MEMBER)}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
