import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxMember, setCheckboxMember] = useState(false);
  const [checkboxPerson, setCheckboxPerson] = useState(false);

  const updateSelectAll = (newMember: boolean, newPerson: boolean) => {
    setIsChecked(newMember && newPerson);
  };

  const handleMemberCheck = () => {
    if (!checkboxMember) {
      alert("회원가입약관에 동의체크 해주세요");
    } else if (!checkboxPerson) {
      alert("개인정보처리방침에 동의체크 해주세요");
    } else if (checkboxMember && checkboxPerson) {
      navigate("/member/login");
    }
  };

  // 전체 동의 체크박스를 클릭할 때 모든 체크박스의 상태를 반영
  const handleSelectAll = () => {
    const newState = !isChecked;
    setCheckboxMember(newState);
    setIsChecked(newState);
    setCheckboxPerson(newState);
  };

  const handleSelectMember = () => {
    const newState = !checkboxMember;
    setCheckboxMember(newState);
    updateSelectAll(newState, checkboxPerson);
  };

  const handleSelectPerson = () => {
    const newState = !checkboxPerson;
    setCheckboxPerson(newState);
    updateSelectAll(checkboxMember, newState);
  };

  return (
    <>
      <div className="sub-img"></div>

      <div className="member-wrap">
        <div className="member-number-text">
          <p className="number">1/2</p>
        </div>
        <div className="member-title">회원가입약관동의</div>
        <div className="member-text-wrap">
          <input
            type="checkbox"
            id="icon-check-all"
            className="icon-check-basic"
            checked={isChecked}
            onChange={handleSelectAll}
          />
          <label htmlFor="icon-check-all">
            <div className="icon-check-all"></div>
          </label>
          <div className="member-text">전체 약관에 동의합니다.</div>
        </div>
        <div className="member-top-box">
          <div className="member-top-wrap">
            <input
              type="checkbox"
              id="icon-check"
              className="icon-check-basic"
              checked={checkboxMember}
              onChange={handleSelectMember}
            />
            <label htmlFor="icon-check">
              <div className="icon-check"></div>
            </label>
            <div className="member-top-text">
              회원가입약관에 동의합니다.(필수)
            </div>
          </div>
          <div className="member-top-con">
            <p>제1조</p>
            <p>
              약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
              <br />
              약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
            </p>
          </div>
        </div>
        <div className="member-top-box">
          <div className="member-top-wrap">
            <input
              type="checkbox"
              id="icon-check2"
              className="icon-check-basic"
              checked={checkboxPerson}
              onChange={handleSelectPerson}
            />
            <label htmlFor="icon-check2">
              <div className="icon-check2"></div>
            </label>
            <div className="member-top-text">
              개인정보처리방침에 동의합니다.(필수)
            </div>
          </div>
          <div className="member-top-con">
            <p>개인정보의 수집 및 이용목적</p>
            <p>
              다음목적을 위하여 개인정보를 수집합니다. <br />
              이용자 식별 및 본인확인, 가입의사 확인, 불량회원 부정이용 방지,
              불만처리 등 민원처리, 공지사항 전달, 회원탈퇴 의사확인
            </p>
          </div>
        </div>
        <button className="member-check" onClick={handleMemberCheck}>
          확인
        </button>
      </div>
    </>
  );
};
export default Member;
