// react
import { useRef } from "react";

// types
import { Review } from "../../types/review";
import { UserInfo } from "../../types/user";

// hooks
import useOutsideClick from "../../hooks/useOutsideClick";

// utils
import { getLargeBookImage } from "../../utils/image";

interface Prop {
  item: Review;
  openMoreReviewId: number | null;
  userInfo: UserInfo;

  onToggleMenu: (rvIdx: number) => void;
  onCloseMenu: () => void;
  handleOpenPopup: (type: "edit" | "delete", review: Review) => void;
}

const MyReviewItem = ({
  item,
  openMoreReviewId,
  userInfo,
  onToggleMenu,
  handleOpenPopup,
  onCloseMenu,
}: Prop) => {
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: moreMenuRef,
    handler: onCloseMenu,
  });

  return (
    <div className="mb-[60px] relative" ref={moreMenuRef}>
      <div className="flex mb-[11px]">
        <div
          className={`
          w-[28px] h-[28px] flex-shrink-0 flex
          rounded-[50px] 
          justify-center items-center 
          mr-[11px]
          ${userInfo.fileName === "default" ? "border border-[#1b1b1b]" : ""}`}
        >
          {userInfo.fileName === "default" ? (
            <div
              className="
              w-[15px] h-[15px] 
              bg-cover bg-review-profile-png"
            />
          ) : (
            <img
              className="w-[28px] h-[28px] rounded-[50px]"
              src={userInfo.fileName}
              alt="프로필 이미지"
            />
          )}
        </div>
        <div className="w-full flex justify-between leading-[30px]">
          <p className="text-[14px] text-[#333333]">{item.nickName}</p>
          <p className="text-[12px] text-[#797979]">{item.regDate}</p>
        </div>
        <div
          className="
          cursor-pointer 
          w-5 h-5 b bg-review-add 
          bg-no-repeat bg-center 
          mt-[4px]
          "
          onClick={(e) => {
            e.stopPropagation();
            onToggleMenu(item.rvIdx);
          }}
        ></div>
      </div>
      {openMoreReviewId === item.rvIdx && (
        <div
          className="
          w-[83px] bg-white 
          shadow-[3px_2px_6px_1px_rgba(0,0,0,0.15)]
          absolute right-[18px] top-0 
          text-[12px] text-center 
          leading-[28px] p-[5px] 
          box-border rounded-[3px]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {item.userIdx === userInfo.userIdx && (
            <>
              <button onClick={() => handleOpenPopup("edit", item)}>
                수정하기
              </button>
              <button onClick={() => handleOpenPopup("delete", item)}>
                삭제하기
              </button>
            </>
          )}
        </div>
      )}

      <div
        className="
        w-full p-[10px] 
        border border-[#f3f3f3] 
        box-border rounded-[5px] 
        flex items-center mb-3
      "
      >
        <div className="w-[60px] h-[75px] rounded-[12px] mr-5">
          <img
            src={getLargeBookImage(item.bookImageName)}
            alt="책 이미지"
            className="w-[60px] h-[75px] rounded-[12px]"
          />
        </div>
        <div className="mypage-review__book-info">
          <p className="text-[14px] font-bold">{item.bookName}</p>
          <p className="text-xs color-[#343434]">{item.author}</p>
        </div>
      </div>

      <div className="text-[13px] text-[#333333]">{item.content}</div>
    </div>
  );
};

export default MyReviewItem;
