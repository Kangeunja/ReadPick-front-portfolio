import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { useLogoutMutation } from 'hooks/mutations/useAuthMutation';
import { useAuthStore } from 'store/authStore';
import { ROUTES } from 'constants/routes';

type HeaderProps = {
  isMain: boolean;
};

const SEARCH_OPTIONS = ['도서명', '작가명'];

const Header = ({ isMain }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);
  const { mutate: logoutMutate } = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false); // selectbox 클릭유무
  const [selected, setSelected] = useState('선택'); // 선택된 selectbox
  const [isFocused, setIsFocused] = useState(false); // 검색포커싱
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const selectRef = useOutsideClick(() => setIsOpen(false));

  // url 검색옵션과 키워드 추출
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSelected(searchParams.get('option') || '선택');
    setKeyword(searchParams.get('keyword') || '');
  }, [location.search]);

  // 검색어 결과
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
        logoutStore();

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
    <div className={`border-gray-linew-full ${isMain ? 'border-none' : ''} border`}>
      <div className="mx-auto my-[20px] flex h-[50px] w-main-w items-center justify-between">
        <div className="h-[50px] w-[127px] cursor-pointer bg-main-logo bg-cover" onClick={() => navigate(ROUTES.MAIN)}></div>

        <div className="mr-5 flex gap-[20px]">
          <div className="relative" ref={selectRef}>
            <div
              className="box-border flex h-[40px] w-[85px] cursor-pointer items-center justify-between rounded-[10px] border-[0.5px] border-solid border-borderLightGray bg-white p-[10px]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p className={selected === '선택' ? 'text-textGrayColor' : 'text-black'}>{selected}</p>
              <div className="h-[12px] w-[12px] bg-select-arrow"></div>
            </div>

            {isOpen && (
              <ul className="absolute top-[calc(100%+5px)] z-[10] box-border w-[85px] rounded-[10px] border-[0.5px] border-solid border-borderLightGray bg-white p-[10px]">
                {SEARCH_OPTIONS.map((item) => (
                  <li
                    key={item}
                    className="block cursor-pointer transition-colors duration-200 hover:bg-mainBoxColor"
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
            className={`flex h-[40px] w-[400px] items-center rounded-[10px] border border-borderLightGray p-[10px] ${isFocused ? 'border-borderMColor' : ''}`}
          >
            <i className="h-[20px] w-[20px] bg-icon-search bg-cover"></i>
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

            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword('')}
                className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700"
                aria-label="검색어 지우기"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex h-[50px] items-center gap-[15px]">
          {user ? (
            <>
              <button onClick={() => navigate(ROUTES.MYPAGE)}>마이페이지</button>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button className="side-btn bg-[#e5e7eb] text-[#374151] hover:bg-[#d1d5db]" onClick={() => navigate(ROUTES.MEMBER)}>
                회원가입
              </button>
              <button className="side-btn bg-[#111827] text-white hover:bg-[#1f2937]" onClick={() => navigate(ROUTES.LOGIN)}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
