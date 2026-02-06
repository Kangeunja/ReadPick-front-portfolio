import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Outlet } from "react-router-dom";
import "../../assets/css/myPage.css";
import MyPageTopMenu from "../../layouts/myPageTopMenu/MypageTopMenu";

const MyPage = () => {
  // 회원정보
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    fileName: "",
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    axiosInstance
      .post("/myPage/userInfo", {})
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error.response?.status);
      });
  };

  return (
    <>
      <div className="mypage">
        <div className="mypage__container">
          <MyPageTopMenu />
          <Outlet context={{ userInfo, fetchUserInfo }} />
        </div>
      </div>
      {/* {isShowPopup && (
        <MypageInfoPopup
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          onClose={() => setIsShowPopup(false)}
        />
      )} */}
    </>
  );
};

export default MyPage;
