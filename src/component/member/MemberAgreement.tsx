import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [agreements, setAgreements] = useState({
    member: false,
    person: false,
  });

  const isAllChecked = agreements.member && agreements.person;

  // 체크박스 핸들러
  const toggleCheck = (name: "member" | "person" | "all") => {
    if (name === "all") {
      const nextState = !isAllChecked;
      setAgreements({ member: nextState, person: nextState });
    } else {
      setAgreements((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  // 확인 버튼
  const handleNextStep = () => {
    if (!agreements.member) return alert("회원가입약관에 동의체크 해주세요");
    if (!agreements.person)
      return alert("개인정보처리방침에 동의체크 해주세요");
    navigate("/member/login");
  };

  return (
    <div
      className="w-[550px]  mx-auto border border-[#c9c9c9]
      rounded-[20px] p-[30px] box-border relative
    "
    >
      <div className="absolute top-[-30px] left-[10px] w-[530px]">
        <p className="float-left">1/2</p>
      </div>
      <div className="text-center text-[25px] mb-10">회원가입약관동의</div>
      <div className="w-[450px] flex mt-[20px] mb-[10px] mx-auto">
        <input
          type="checkbox"
          id="icon-check-all"
          className="hidden peer"
          checked={isAllChecked}
          onChange={() => toggleCheck("all")}
        />
        <label
          htmlFor="icon-check-all"
          className="flex items-center cursor-pointer w-5 h-5 bg-icon-check bg-center rounded-full 
            border-2 border-[#bebebe] text-[#bebebe] text-[20px]
            mr-[10px] relative

            peer-checked:bg-[url('/src/assets/img/icon-check-color.png')] 
            peer-checked:bg-[#004f14] 
            peer-checked:border-[#004f14]"
        ></label>
        <div className="font-bold text-[14px]">전체 약관에 동의합니다.</div>
      </div>
      <div
        className="w-[460px] h-[150px] border border-[#d0d0d0]
        mx-auto p-[15px] box-border mb-[15px]

        peer-checked:bg-[url('/src/assets/img/icon-check-color.png')] 
        peer-checked:bg-[#004f14] 
        peer-checked:border-[#004f14]
      "
      >
        <div className="w-[460px] flex mb-[10px]">
          <input
            type="checkbox"
            id="icon-check"
            className="hidden peer"
            checked={agreements.member}
            onChange={() => toggleCheck("member")}
          />
          <label
            htmlFor="icon-check"
            className="w-5 h-5 bg-icon-check bg-center rounded-[50px]
            border-2 border-[#bebebe] text-[#bebebe] text-[20px]
            mr-[10px] cursor-pointer

            peer-checked:bg-[url('/src/assets/img/icon-check-color.png')] 
            peer-checked:bg-[#004f14] 
            peer-checked:border-[#004f14]"
          ></label>
          <div className="font-bold text-[14px]">
            회원가입약관에 동의합니다.(필수)
          </div>
        </div>
        <div
          className="w-[420px] h-[80px] bg-[#ebebeb] mx-auto
          py-[10px] px-[15px] box-border text-xs overflow-auto
        "
        >
          <p className="mb-[10px]">제1조 (회원가입 약관)</p>
          <p>
            본 약관은 [서비스 명칭]이 제공하는 인터넷 관련 서비스(이하
            "서비스")를 이용함에 있어, 회사와 이용자의 권리, 의무 및 책임 사항을
            규정함을 목적으로 합니다.
          </p>
          <br />
          <p className="mb-[10px]">제2조 (용어의 정의)</p>
          <p>
            "이용자"란 "서비스"에 접속하여 본 약관에 따라 이용 신청을 하고
            서비스를 이용하는 고객을 말합니다. "아이디(ID)"란 회원의 식별과
            서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의
            조합을 의미합니다.
          </p>
        </div>
      </div>
      <div
        className="w-[460px] h-[150px] border border-[#d0d0d0]
        mx-auto p-[15px] box-border mb-[15px]"
      >
        <div className="w-[460px] flex mb-[10px]">
          <input
            type="checkbox"
            id="icon-check2"
            className="hidden peer"
            checked={agreements.person}
            onChange={() => toggleCheck("person")}
          />
          <label
            htmlFor="icon-check2"
            className="w-5 h-5 bg-icon-check bg-center rounded-[50px]
            border-2 border-[#bebebe] text-[#bebebe] text-[20px]
            mr-[10px] cursor-pointer

            peer-checked:bg-[url('/src/assets/img/icon-check-color.png')] 
            peer-checked:bg-[#004f14] 
            peer-checked:border-[#004f14]
            "
          ></label>
          <div className="font-bold text-[14px]">
            개인정보처리방침에 동의합니다.(필수)
          </div>
        </div>
        <div
          className="w-[420px] h-[80px] bg-[#ebebeb] mx-auto
          py-[10px] px-[15px] box-border text-xs overflow-auto"
        >
          <p className="mb-[10px]">개인정보의 수집 및 이용목적</p>
          <p>1. 수집하는 개인정보 항목</p>
          <p>
            회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를
            수집하고 있습니다. 수집항목: 이름, 생년월일, 성별, 로그인ID,
            비밀번호, 휴대전화번호, 이메일
          </p>
          <br />
          <p>2. 개인정보의 수집 및 이용목적</p>
          <p>
            서비스 제공에 따른 요금정산 및 회원관리 <br />
            신규 서비스 개발 및 마케팅·광고에의 활용
          </p>
          <br />
          <p>3. 개인정보의 보유 및 이용기간</p>
          <p>
            원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가
            있는 경우 일정 기간 보관합니다.
          </p>
        </div>
      </div>
      <button
        className="w-[460px] h-[100px] bg-[#d9d9d9] block
          mx-auto border-none text-xs font-bold cursor-pointer
          hover:bg-[#b0b0b0]
        "
        onClick={handleNextStep}
      >
        확인
      </button>
    </div>
  );
};
export default Member;
