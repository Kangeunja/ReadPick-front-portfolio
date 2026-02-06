import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/mypageInfoPopup.css";

import profileDefaultImg from "../../assets/img/icon-profile-2.png";
import TrashImg from "../../assets/img/icon-trash.png";
import MypageInfoEditPopup from "./MypageInfoEditPopup";
import MyPageInfoAlterPopup from "./MyPageInfoAlterPopup";

const MypageInfoPopup = ({ onClose, userInfo, setUserInfo }: any) => {
  // 회원 상세 정보
  const [editableUserInfo, setEditableUserInfo] = useState({
    userName: userInfo.userName,
    nickName: userInfo.nickName,
    email: userInfo.email,
    id: userInfo.id,
    pw: userInfo.pw,
    fileName: userInfo.fileName,
  });

  // 회원 정보 기본 프로필 이미지
  const [image, setImage] = useState(profileDefaultImg);

  // 프로필 사진 임시 상태
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

  // 프로필 이미지가 수정되었는지 여부
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  // 프로필 이미지가 삭제되었는지 여부
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  // 회원 정보 기본 프로필 이미지 포커싱
  const imgRef = useRef<HTMLInputElement | null>(null);
  // 회원 정보 프로필 수정 이미지 포커싱
  const editImgRef = useRef<HTMLInputElement | null>(null);
  // 회원 정보 이름 포커싱
  const userNameRef = useRef<HTMLInputElement>(null);
  // 회원 정보 닉네임 포커싱
  const nickNameRef = useRef<HTMLInputElement>(null);
  // 회원 정보 이메일 포커싱
  const emailRef = useRef<HTMLInputElement>(null);
  // 회원 정보 아이디 포커싱
  const idRef = useRef<HTMLInputElement>(null);
  // 회원 정보 비밀번호 포커싱
  const pwRef = useRef<HTMLInputElement>(null);
  // 회원 정보 비밀번호 확인 포커싱
  const pwCheckRef = useRef<HTMLInputElement>(null);

  // 회원 정보 수정
  const [editMode, setEditMode] = useState({
    userName: false,
    nickName: false,
    email: false,
    id: false,
    pw: false,
  });

  // 아이디 중복 확인 버튼 유무
  const [idCheck, setIdcheck] = useState(false);

  // 아이디 체크 메세지 추가
  const [idCheckMessage, setIdCheckMessage] = useState("");

  // 아이디 체크 메세지 색깔
  const [idValId, setIdValId] = useState(true);

  // 비밀번호 보이기 상태
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // 비밀번호 확인 보이기 상태
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  // 비밀번호 확인 메세지 추가
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  // 비밀번호 메세지 색깔
  const [pwValPw, setPwValPw] = useState(true);

  // 비밀번호 확인 팝업창
  const [isShowEditPopup, setIsShowEditPopup] = useState(false);

  // 비밀번호 변경 팝업창
  const [isShowAlterPopup, setIsShowAlterPopup] = useState(false);

  // 필드 정보
  const [targetField, setTargetField] = useState<string>("");

  const modifiedCount = [
    editableUserInfo.userName !== userInfo.userName,
    editableUserInfo.nickName !== userInfo.nickName,
    editableUserInfo.email !== userInfo.email,
    editableUserInfo.id !== userInfo.id,
    editableUserInfo.pw !== userInfo.pw,
    isImageUpdated,
  ].filter(Boolean).length;

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";

    // 프로필 이미지 초기화
    if (userInfo.fileName && userInfo.fileName !== "default") {
      setImage(editableUserInfo.fileName);
    } else {
      setImage(profileDefaultImg);
    }
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  // 프로필 사진 임시업로드 (미리보기용)
  const handleProfileImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file); // 로컬 프리뷰
    setImage(imageUrl);
    setTempImageFile(file);
    setIsImageUpdated(true);
    e.target.value = "";
  };

  // 프로필 사진 수정하기
  const handleEditProfileImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file); // 로컬 프리뷰
    setImage(imageUrl);
    setTempImageFile(file);
    setIsImageUpdated(true);
    e.target.value = "";
  };

  // 프로필 사진 삭제하기
  const handleDeleteProfileImg = () => {
    if (window.confirm("사진을 정말로 삭제하시겠습니까?")) {
      setImage(profileDefaultImg);
      setTempImageFile(null);
      setIsImageUpdated(true);
      setIsImageDeleted(true); // 삭제 상태 true로 세팅
      setEditableUserInfo((prev) => ({
        ...prev,
        fileName: "default",
      }));
    } else {
      return;
    }
  };

  // 회원정보 수정내용
  const handleChange = (
    field: keyof typeof editableUserInfo,
    value: string
  ) => {
    setEditableUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field !== "userName" && field !== "nickName") {
      value = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    }
    if (field === "id") {
      setIdCheckMessage("");
      setIdValId(true);
    }
    if (field === "pw") {
      setPasswordCheckMessage("");
      setPwValPw(true);
    }
  };

  // 회원정보 수정하기 버튼
  const handleEdit = (field: any, ref: React.RefObject<HTMLInputElement>) => {
    if (field === "email" || field === "id") {
      setIsShowEditPopup(true);
      setTargetField(field);
      return;
    }

    if (field === "pw") {
      setIsShowAlterPopup(true);
      return;
    }

    setEditMode((prev) => ({
      ...prev,
      [field]: true,
    }));

    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        const length = ref.current.value.length;
        ref.current.setSelectionRange(length, length);
      }
      // ref.current?.focus();
    });
  };

  // const handleClosePopup = (sucess, field) => {
  //   setIsShowEditPopup(false);

  //   // setEditMode((prev: any) => ({
  //   //   ...prev,
  //   //   [targetField]: true,
  //   // }));

  //   setTimeout(() => {
  //     // if (ref.current) {
  //     //   ref.current.focus();
  //     //   const length = ref.current.value.length;
  //     //   ref.current.setSelectionRange(length, length);
  //     // }
  //     // ref.current?.focus();
  //   });
  // };

  // 비밀번호 변경 콜백함수
  const handlePasswordChange = (newPw: string) => {
    setEditableUserInfo((prev) => ({
      ...prev,
      pw: newPw,
    }));
    setIsShowAlterPopup(false);
  };

  const handleClosePopup = (field: string) => {
    setIsShowEditPopup(false);

    setEditMode((prev) => ({ ...prev, [field]: true }));

    setTimeout(() => {
      if (field === "email") emailRef.current?.focus();
      if (field === "id") idRef.current?.focus();
    }, 0);
  };

  // 아이디 중복확인
  const handleIdCheck = () => {
    if (!editableUserInfo.id.trim()) {
      alert("아이디를 입력해주세요");
      return;
    }

    if (editableUserInfo.id === userInfo.id) {
      setIdCheckMessage("아이디가 변경되지 않았습니다.");
      setIdValId(false);
      return;
    }

    axiosInstance
      .post(`/checkId?id=${editableUserInfo.id}`)
      .then((res) => {
        if (res.data.result === false) {
          setIdCheckMessage("사용 불가능한 ID 입니다.");
          setIdValId(false);
        } else {
          setIdCheckMessage("사용 가능한 ID 입니다.");
          setIdValId(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 아이디 수정취소 버튼
  const handleIdCancel = (field: any) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
    setIdCheckMessage("");
    setEditableUserInfo((prev) => ({
      ...prev,
      id: userInfo.id,
    }));
    setIdValId(true);
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // 비밀번호확인 숨기기/보이기 토글 함수
  const togglePasswordCheckVisibility = () => {
    setPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  // 비밀번호 확인
  const handleOnChangePassword = (value: string) => {
    if (value !== editableUserInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
    } else if (value === editableUserInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setPwValPw(true);
    }
  };

  // 저장하기 버튼
  const handleSave = () => {
    const isModified =
      editableUserInfo.userName !== userInfo.userName ||
      editableUserInfo.nickName !== userInfo.nickName ||
      editableUserInfo.email !== userInfo.email ||
      editableUserInfo.id !== userInfo.id ||
      editableUserInfo.pw !== userInfo.pw ||
      isImageUpdated;

    if (!isModified) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    if (editableUserInfo.userName === "") {
      alert("이름을 입력해주세요");
      userNameRef.current?.focus();
      return;
    }
    if (editableUserInfo.nickName === "") {
      alert("닉네임을 입력해주세요");
      nickNameRef.current?.focus();
      return;
    }
    if (editableUserInfo.email === "") {
      alert("이메일을 입력해주세요");
      emailRef.current?.focus();
      return;
    }
    if (idCheck && editableUserInfo.id !== userInfo.id) {
      if (editableUserInfo.id === "") {
        alert("아이디를 입력해주세요");
        idRef.current?.focus();
        return;
      } else if (!idCheckMessage) {
        alert("아이디 중복확인 해주세요");
        return;
      }
    }
    if (!idValId) {
      alert("사용 불가능한 아이디입니다. 다시 입력 후 중복 확인을 해주세요.");
      return;
    }

    if (isImageDeleted) {
      axiosInstance
        .post("/userImageDelete")
        .then((res) => {
          console.log(res.data);
          if (res.data === "success") {
            console.log("이미지 삭제 요청");
            setUserInfo((prev: any) => ({
              ...prev,
              fileName: "default",
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (isImageUpdated && tempImageFile) {
      const formData = new FormData();
      formData.append("file", tempImageFile);

      const uploadUrl =
        userInfo.fileName === "default"
          ? "/userImageInsert"
          : "/userImageUpdate";
      console.log(uploadUrl);
      axiosInstance
        .post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          // setEditableUserInfo((prev) => ({
          //   ...prev,
          //   fileName: res.data,
          // }));
          setUserInfo((prev: any) => ({
            ...prev,
            fileName: res.data,
          }));
          // setUserInfo(editableUserInfo);
        });
    } else {
      // setUserInfo(editableUserInfo);
    }
    axiosInstance
      .post("/myPage/userInfoModify", {
        userName: editableUserInfo.userName,
        nickName: editableUserInfo.nickName,
        email: editableUserInfo.email,
        id: editableUserInfo.id,
        pw: editableUserInfo.pw,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          alert("수정완료되었습니다.");
          onClose();
          setUserInfo(editableUserInfo);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   // 이미지 삭제 요청
    //   if (isImageDeleted) {
    //     const res = await axiosInstance.post("/userImageDelete");
    //     if (res.data === "success") {
    //       console.log("이미지 삭제 요청");
    //       setUserInfo((prev: any) => ({
    //         ...prev,
    //         fileName: "default",
    //       }));
    //     }
    //   }
    //   // 새 이미지 업로드
    //   if (isImageUpdated && tempImageFile && !isImageDeleted) {
    //     const formData = new FormData();
    //     formData.append("file", tempImageFile);

    //     const uploadUrl =
    //       userInfo.fileName === "default"
    //         ? "/userImageInsert"
    //         : "/userImageUpdate";
    //     const res = await axiosInstance.post(uploadUrl, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     setEditableUserInfo((prev) => {
    //       const updated = {
    //         ...prev,
    //         fileName: res.data,
    //       };
    //       setUserInfo(updated);
    //       return updated;
    //     });
    //   } else {
    //     // 이미지 변경이 없는 경우
    //     setUserInfo(editableUserInfo);
    //   }
    //   // 회원 정보 수정 요청 api
    //   const res = await axiosInstance.post("/myPage/userInfoModify", {
    //     userName: editableUserInfo.userName,
    //     nickName: editableUserInfo.nickName,
    //     email: editableUserInfo.email,
    //     id: editableUserInfo.id,
    //     pw: editableUserInfo.pw,
    //   });
    //   if (res.data === "success") {
    //     alert("수정완료되었습니다.");
    //     onClose();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // 취소(x) 버튼
  const handleClose = () => {
    // setUserInfo(editableUserInfo);
    onClose();
  };

  return (
    <>
      <div className="mypageInfo-popup-wrap">
        <div className="mypageInfo-popup-box">
          <div className="mypageInfo-popup-text">회원정보수정</div>

          <div className="mypageInfo-popup-img-wrap">
            {editableUserInfo.fileName === "default" ? (
              <div className="mypageInfo-popup-img-box">
                <img src={image} alt="기본 이미지" />
                <div
                  className="mypageInfo-popup-bottom-box"
                  onClick={() => imgRef.current?.click()}
                >
                  <div className="mypageInfo-popup-bottom-img"></div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imgRef}
                    style={{ display: "none" }}
                    onChange={handleProfileImage}
                  />
                </div>
              </div>
            ) : (
              <>
                <img
                  // src={
                  //   editableUserInfo.fileName.startsWith("http")
                  //     ? editableUserInfo.fileName
                  //     : `http://localhost:8080/READPICKImages/${editableUserInfo.fileName}`
                  // }
                  src={image}
                  alt="프로필 이미지"
                  className="mypageInfo-uploaded-img"
                />
                <div className="mypageInfo-popup-correction-wrap">
                  <div onClick={() => editImgRef.current?.click()}>
                    <button type="button" className="mypageInfo-popup-edit-btn">
                      사진 수정
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={editImgRef}
                      style={{ display: "none" }}
                      onChange={handleEditProfileImg}
                    />
                  </div>
                  <button
                    type="button"
                    className="mypageInfo-popup-delete-btn"
                    onClick={handleDeleteProfileImg}
                  >
                    <img src={TrashImg} alt="쓰레기통" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mypageInfo-popup-text-wrap">
            <div className="mypageInfo-popup-text-box">
              <div className="mypageInfo-popup-title">이름</div>
              <input
                ref={userNameRef}
                type="text"
                placeholder={userInfo.userName}
                value={editableUserInfo.userName}
                disabled={!editMode.userName}
                onChange={(e) => handleChange("userName", e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleEdit("userName", userNameRef)}
              >
                수정
              </button>
            </div>
            <div className="mypageInfo-popup-text-box">
              <div className="mypageInfo-popup-title">닉네임</div>
              <input
                ref={nickNameRef}
                type="text"
                placeholder={userInfo.nickName}
                value={editableUserInfo.nickName}
                disabled={!editMode.nickName}
                onChange={(e) => handleChange("nickName", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEdit("nickName", nickNameRef)}
              >
                수정
              </button>
            </div>
            <div className="mypageInfo-popup-text-box">
              <div className="mypageInfo-popup-title">이메일</div>
              <input
                type="text"
                ref={emailRef}
                placeholder={userInfo.email}
                value={editableUserInfo.email}
                disabled={!editMode.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {/* <button type="button" onClick={() => setIsShowEditPopup(true)}>
                수정
              </button> */}
              <button
                type="button"
                onClick={() => handleEdit("email", emailRef)}
              >
                수정
              </button>
            </div>
            <div className="mypageInfo-popup-text-box">
              <div className="mypageInfo-popup-title">아이디</div>
              <input
                className={editMode.id ? "id-edit" : ""}
                type="text"
                ref={idRef}
                onCopy={(e) => e.preventDefault()}
                placeholder={userInfo.id}
                value={editableUserInfo.id}
                disabled={!editMode.id}
                onChange={(e) => handleChange("id", e.target.value)}
              />
              <div className="mypageInfo-popup-button-wrap">
                {!editMode.id ? (
                  <button type="button" onClick={() => handleEdit("id", idRef)}>
                    수정
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={() => handleIdCancel("id")}>
                      취소
                    </button>
                    <button type="button" onClick={handleIdCheck}>
                      중복확인
                    </button>
                  </>
                )}
              </div>
              <div className="mypageInfo-popup-message">
                {idCheckMessage && (
                  <p
                    className={`mypageInfo-popup-id-CheckMessage ${
                      idValId ? "success" : "error"
                    }`}
                  >
                    {idCheckMessage}
                  </p>
                )}
                {/* {idCheckMessage && (
                <button type="button" onClick={handleMessageCancel}>
                  수정취소
                </button>
              )} */}
              </div>
            </div>
            <div className="mypageInfo-popup-text-box">
              <div className="mypageInfo-popup-title">비밀번호</div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                ref={pwRef}
                onCopy={(e) => e.preventDefault()}
                value={editableUserInfo.pw}
                disabled={!editMode.pw}
                onChange={(e) => handleChange("pw", e.target.value)}
              />

              {/* {!isPasswordVisible ? (
              <div className="mypageInfo-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordVisibility} />
              </div>
            ) : (
              <div className="mypageInfo-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordVisibility} />
              </div>
            )} */}
              <button type="button" onClick={() => handleEdit("pw", pwRef)}>
                수정
              </button>
            </div>

            {/* <div className="mypageInfo-popup-text-box">
            <div className="mypageInfo-popup-title">비밀번호확인</div>
            <input
              type={isPasswordConfirmVisible ? "text" : "password"}
              ref={pwCheckRef}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onChange={(e) => handleOnChangePassword(e.target.value)}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfo-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfo-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}

            {passwordCheckMessage && (
              <p
                className={`mypageInfo-popup-member-pwCheck ${
                  pwValPw ? "success" : "error"
                }`}
              >
                {passwordCheckMessage}
              </p>
            )}
          </div> */}

            {modifiedCount > 0 && (
              <div className="mypageInfo-popup-notice">
                변경사항이 {modifiedCount}개 있습니다. 저장하지 않으면 반영되지
                않습니다.
              </div>
            )}
          </div>

          <button
            type="button"
            className="mypage-popup-button cancel"
            onClick={handleClose}
          >
            취소
          </button>

          <button
            type="button"
            // className="mypage-popup-button save"
            className={`mypage-popup-button save  ${
              modifiedCount > 0 ? "highlight" : ""
            }`}
            onClick={handleSave}
          >
            저장{modifiedCount > 0 && ` (${modifiedCount})`}
          </button>

          <button
            type="button"
            className="mypage-popup-icon"
            onClick={handleClose}
          ></button>
        </div>
      </div>
      {isShowEditPopup && (
        <MypageInfoEditPopup
          // onClose={() => setIsShowEditPopup(false)}
          onClose={handleClosePopup}
          editableUserInfo={editableUserInfo}
          setEditMode={setEditMode}
          targetField={targetField}
        />
      )}
      {isShowAlterPopup && (
        <MyPageInfoAlterPopup
          onPasswordChange={handlePasswordChange}
          onClose={() => setIsShowAlterPopup(false)}
          editableUserInfo={editableUserInfo}
        />
      )}
    </>
  );
};
export default MypageInfoPopup;
