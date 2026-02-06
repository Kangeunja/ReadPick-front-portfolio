import { useState } from "react";
import "../../assets/css/admin.css";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    id: "",
    pw: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserLogin((state) => ({
      ...state,
      [name]: newValue,
    }));

    let newValue = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 제거

    if (name === "id" || name === "pw") {
      const idRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
      if (!idRegex.test(newValue)) return;
    }
  };

  const handleLogin = () => {
    if (userLogin.id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (userLogin.pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    axiosInstance
      .post("/login", {
        id: userLogin.id,
        pw: userLogin.pw,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.adminAt === "Y") {
          alert("관리자가 확인되었습니다.");
          navigate("/admin/main");
        } else {
          alert("관리자 로그인 확인해주세요");
        }
      });
  };

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h1>Admin Login</h1>
        <p>관리자 로그인</p>
      </div>
      <div className="admin-input-wrap">
        <input
          name="id"
          type="text"
          placeholder="아이디를 입력해주세요"
          value={userLogin.id}
          onChange={handleChange}
        />
        <input
          name="pw"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChange}
          value={userLogin.pw}
        />
        <button className="admin-login" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Admin;
