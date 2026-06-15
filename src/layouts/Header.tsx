import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../hooks/mutations/useLogoutMutation';

import useAuthStore from '../store/authStore';

import { ROUTES } from '../constants/routes';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface HeaderProps {
  className?: string;
}

const SEARCH_OPTIONS = ['도서명', '작가명'];

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const { mutate: logoutMutate } = useLogoutMutation();

  const getParam = (key: string, fallback: string) => {
    return new URLSearchParams(location.search).get(key) || fallback;
  };

  // 상태 관리
  const [isFocused, setIsFocused] = useState(false); // 검색포커싱
  const [isOpen, setIsOpen] = useState(false); // selectbox 클릭유무
  const [selected, setSelected] = useState('선택'); // 선택된 selectbox
  const [keyword, setKeyword] = useState(''); // 검색어 상태

  const selectRef = useOutsideClick(() => setIsOpen(false));

  // url 검색옵션과 키워드 추출
  useEffect(() => {
    setSelected(getParam('option', '선택'));
    setKeyword(getParam('keyword', ''));
  }, [location.search]);

  // 검색 이동
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selected !== '선택' && keyword.trim()) {
      const params = new URLSearchParams({
        option: selected,
        keyword,
      });

      navigate(`${ROUTES.KEYWORD}?${params.toString()}`);
    }
  };

  // 로그아웃 api
  const handleLogout = () => {
    if (!window.confirm('로그아웃하시겠습니까?')) return;

    logoutMutate(undefined, {
      onSuccess: () => {
        alert('로그아웃되었습니다.');
        navigate(ROUTES.MAIN);
      },
      onError: (error) => {
        console.error('로그아웃 중 에러 발생:', error);
        alert('로그아웃에 실패했습니다.');
      },
    });
  };

  return (
    <div className={`h-[120px] w-full border border-gray-line ${className}`}>
      <div className="mx-auto my-[20px] flex h-[100px] w-main-w items-center justify-around">
        <div className="h-[54px] w-[127px] cursor-pointer bg-main-logo bg-cover" onClick={() => navigate(ROUTES.MAIN)}></div>

        <div>
          <div className="relative float-left mr-5" ref={selectRef}>
            <div
              className="box-border flex h-[45px] w-[90px] cursor-pointer items-center justify-between rounded-[10px] border-[0.5px] border-solid border-borderLightGray bg-white p-[10px] text-memberColor"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p className={selected === '선택' ? 'text-[#5e5e5e]' : 'text-black'}>{selected}</p>
              <div className="h-3 w-3 bg-select-arrow"></div>
            </div>

            {isOpen && (
              <ul className="shadow-[0_4px_8px_rgba(0, 0, 0, 0.1)] absolute top-[calc(100%+5px)] z-[10] box-border w-[90px] rounded-[10px] border-[0.5px] border-solid border-borderLightGray bg-white p-[10px]">
                {SEARCH_OPTIONS.map((item) => (
                  <li
                    key={item}
                    className="block cursor-pointer transition-colors duration-200 hover:bg-[#f2f2f2]"
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
            className={`flex h-[45px] w-[400px] items-center rounded-[10px] border border-[#d7d5d5] ${isFocused ? 'border-borderMColor' : ''}`}
          >
            <i className="float-left ml-5 h-[25px] w-[25px] bg-icon-search bg-cover"></i>
            <input
              className="ml-[15px] h-full w-[350px] border-none bg-transparent text-base text-borderMColor outline-none"
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

        <div className="flex h-[50px] leading-[50px]">
          {user ? (
            <>
              <button className="side-btn mr-[15px] hover:text-borderMColor" onClick={() => navigate(ROUTES.MYPAGE)}>
                마이페이지
              </button>
              <button className="side-btn mr-[15px] hover:text-borderMColor" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="side-btn mr-[15px] hover:text-borderMColor" onClick={() => navigate(ROUTES.LOGIN)}>
                로그인
              </button>
              <button className="side-btn mr-[15px] hover:text-borderMColor" onClick={() => navigate(ROUTES.MEMBER)}>
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
