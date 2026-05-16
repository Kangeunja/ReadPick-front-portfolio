import { useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ID_REGEX = /^[A-Za-z0-9]{6,15}$/;
const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const PW_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface Validators {
  [key: string]: ((val: string) => void) | undefined;
}

const MemberLogin = () => {
  const navigate = useNavigate();

  // 회원정보 입력 폼 상태
  const [userInfo, setUserInfo] = useState({
    userName: "",
    nickName: "",
    id: "",
    pw: "",
    pwConfirm: "",
    email: "",
  });

  // 에러메세지 상태
  const [errors, setErrors] = useState({
    id: "",
    pw: "",
    pwConfirm: "",
    userName: "",
    nickName: "",
    email: "",
  });

  // 상태 관리
  const [idMessage, setIdMessage] = useState(""); // 아이디에 표시할 가이드 문구 (예: "6자 이상 입력", "사용 가능")
  const [isIdValid, setIsIdValid] = useState(false); // 아이디 최종 통과 여부 (중복확인+정규식 합격 시 true)

  const [pwMessage, setPwMessage] = useState(""); // 비밀번호에 표시할 가이드 문구
  const [pwConfirmMessage, setPwConfirmMessage] = useState(""); // 비밀번호 확인란 일치 여부 메시지
  const [isPwMatched, setIsPwMatched] = useState(false); // 비밀번호와 비밀번호확인란 최종 통과 여부 (통과 시 true)

  const [emailMessage, setEmailMessage] = useState(""); // 이메일에 표시할 가이드 문구

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 입력창 토글
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // 비밀번호 확인창 토글

  // 모든 input 요소들의 위치(참조값)를 저장하는 보관함
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // 회원정보 입력값 변경 처리 함수
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let newValue = value;

    // 상태 업데이트
    setUserInfo((state) => ({
      ...state,
      [name]: newValue,
    }));

    // 에러메세지 초기화
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    const validatePassword = (pw: string, confirm: string) => {
      setPwMessage(
        pw && !PW_REGEX.test(pw)
          ? "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다."
          : "",
      );

      if (!confirm) {
        setPwConfirmMessage("");
        setIsPwMatched(false);
      } else {
        const matched = pw === confirm;
        setPwConfirmMessage(
          matched ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.",
        );
        setIsPwMatched(matched);
      }
    };

    const validators: Validators = {
      id: (val: string) => {
        if (KOREAN_REGEX.test(val))
          return setIdMessage("아이디에 한글은 사용할 수 없습니다.");
        if (!ID_REGEX.test(val))
          return setIdMessage(
            "6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.",
          );
        setIdMessage("");
        setIsIdValid(false);
      },

      pw: (val: string) => validatePassword(val, userInfo.pwConfirm),
      pwConfirm: (val: string) => validatePassword(userInfo.pw, val),
      email: (val: string) =>
        setEmailMessage(
          val && !EMAIL_REGEX.test(val) ? "올바른 이메일 형식이 아닙니다." : "",
        ),
    };

    validators[name]?.(newValue);
  };

  // 회원가입
  const handleLoginController = () => {
    setErrors({
      id: "",
      pw: "",
      pwConfirm: "",
      userName: "",
      nickName: "",
      email: "",
    });

    const refs = [
      {
        name: "id",
        checks: [
          { condition: !userInfo.id, message: "아이디를 입력해주세요." },
          {
            condition: !ID_REGEX.test(userInfo.id),
            message: "아이디는 6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.",
          },
          { condition: !idMessage, message: "아이디 중복확인 해주세요" },
          {
            condition: !isIdValid,
            message:
              "사용 불가능한 아이디입니다. 다시 입력 후 중복 확인을 해주세요.",
          },
        ],
      },

      {
        name: "pw",
        checks: [
          { condition: !userInfo.pw, message: "비밀번호를 입력해주세요." },
          {
            condition: !PW_REGEX.test(userInfo.pw),
            message:
              "비밀번호는 영문과 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.",
          },
        ],
      },

      {
        name: "pwConfirm",
        checks: [
          {
            condition: !userInfo.pwConfirm,
            message: "비밀번호 확인을 입력해주세요.",
          },
          {
            condition: userInfo.pw !== userInfo.pwConfirm,
            message: "비밀번호가 일치하지 않습니다.",
          },
        ],
      },

      {
        name: "userName",
        checks: [
          { condition: !userInfo.userName, message: "이름을 입력해주세요." },
        ],
      },

      {
        name: "nickName",
        checks: [
          { condition: !userInfo.nickName, message: "닉네임을 입력해주세요." },
        ],
      },

      {
        name: "email",
        checks: [
          { condition: !userInfo.email, message: "이메일을 입력해주세요." },
          {
            condition: !EMAIL_REGEX.test(userInfo.email),
            message: "유효한 이메일 주소를 입력해주세요.",
          },
        ],
      },
    ];

    for (const field of refs) {
      for (const check of field.checks) {
        if (check.condition) {
          setErrors((prev) => ({ ...prev, [field.name]: check.message }));
          inputRefs.current[field.name]?.focus();
          return;
        }
      }
    }
    axiosInstance
      .post("/userInsert", userInfo)
      .then((res) => {
        console.log(res.data);
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      })
      .catch((error) => {
        console.log("Member Login failed", error);
      });
  };

  // 아이디 중복확인
  const handleIdCheck = async () => {
    setErrors((prev) => ({ ...prev, id: "" }));

    if (!userInfo.id) {
      setIdMessage("아이디를 입력해주세요.");
      return;
    }

    if (KOREAN_REGEX.test(userInfo.id)) {
      setIdMessage("아이디에 한글은 사용할 수 없습니다.");
      return;
    }

    if (!ID_REGEX.test(userInfo.id)) {
      setIdMessage("6~15자의 영문 혹은 영문+숫자 조합이어야 합니다.");
      return;
    }

    try {
      const res = await axiosInstance.post(`/checkId?id=${userInfo.id}`);

      if (res.data.result === false) {
        setIdMessage("사용 불가능한 ID 입니다.");
        setIsIdValid(false);
      } else {
        setIdMessage("사용 가능한 ID 입니다.");
        setIsIdValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginController();
        }}
        className="w-[550px] mx-auto border border-[#c9c9c9]
        rounded-[20px] p-[30px] box-border relative
      "
      >
        <div className="absolute top-[-30px] left-[10px] w-[530px]">
          <p className="float-left">2/2</p>
          <p className="float-right leading-[30px] text-xs">
            <span className="text-red-600 font-bold mr-[5px]">*</span>
            필수입력사항
          </p>
        </div>

        <div className="text-center text-[25px] mb-[40px]">회원가입</div>

        <div className="leading-[40px] flex mb-[30px]">
          <div className="flex flex-col gap-[30px]">
            {[
              {
                label: "아이디",
                name: "id",
                type: "text",
                placeholder: "6~15자의 영문 혹은 영문+숫자 조합",
                hasButton: true,
                message: idMessage,
                isValid: isIdValid,
              },

              {
                label: "비밀번호",
                name: "pw",
                type: showPassword ? "text" : "password",
                placeholder: "영문과 숫자를 포함하여 8자 이상",
                isPassword: true,
                visible: showPassword,
                toggle: () => setShowPassword(!showPassword),
                message: pwMessage,
                isValid: isPwMatched,
              },

              {
                label: "비밀번호 확인",
                name: "pwConfirm",
                type: showPasswordConfirm ? "text" : "password",
                placeholder: "비밀번호를 한번 더 입력해주세요.",
                isPassword: true,
                visible: showPasswordConfirm,
                toggle: () => setShowPasswordConfirm(!showPasswordConfirm),
                message: pwConfirmMessage,
                isValid: isPwMatched,
              },

              {
                label: "이름",
                name: "userName",
                type: "text",
                placeholder: "이름을 입력해주세요",
              },

              {
                label: "닉네임",
                name: "nickName",
                type: "text",
                placeholder: "닉네임을 입력해주세요",
              },

              {
                label: "이메일",
                name: "email",
                type: "text",
                placeholder: "이메일을 입력해주세요",
                message: emailMessage,
              },
            ].map((field) => (
              <div key={field.name} className="flex items-start">
                <div className="w-[120px] flex">
                  <p className="">{field.label}</p>
                  <p className="text-red-600">*</p>
                </div>

                <div className="relative h-[60px]">
                  <div className="flex gap-[15px]">
                    <input
                      ref={(el) => (inputRefs.current[field.name] = el)}
                      name={field.name}
                      className="w-[260px] h-10 border border-[#797979] 
                    float-right pl-[10px] box-border outline-none text-xs"
                      type={field.type}
                      placeholder={field.placeholder}
                      maxLength={field.name === "email" ? 100 : 15}
                      value={userInfo[field.name as keyof typeof userInfo]}
                      onChange={handleChange}
                    />
                    {field.hasButton && (
                      <button
                        type="button"
                        className="h-10 px-3 border border-[#c9c9c9] bg-gray-50 whitespace-nowrap
                        hover:border-[#248f8f] 
                          hover:shadow-[0_8px_20px_rgba(36,143,143,0.15)]
                        "
                        onClick={handleIdCheck}
                      >
                        중복확인
                      </button>
                    )}
                  </div>
                  {field.isPassword && (
                    <div className="absolute right-[10px] top-[-4px] cursor-pointer">
                      {field.visible ? (
                        <VisibilityIcon onClick={field.toggle} />
                      ) : (
                        <VisibilityOffIcon onClick={field.toggle} />
                      )}
                    </div>
                  )}
                  {(errors[field.name as keyof typeof errors] ||
                    field.message) && (
                    <p
                      className={`w-[260px] text-xs mt-[5px] ${errors[field.name as keyof typeof errors] || !field.isValid ? "text-red-600" : "text-green-600"}`}
                    >
                      {errors[field.name as keyof typeof errors] ||
                        field.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-[30px] justify-center">
          <button
            type="button"
            className="w-[70px] h-[40px] border border-[#c9c9c9] bg-gray-50  
          hover:border-[#248f8f] 
            hover:shadow-[0_8px_20px_rgba(36,143,143,0.15)]
            "
            onClick={() => navigate("/member")}
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[100px] h-[40px] border border-[#c9c9c9] bg-gray-50 
          hover:border-[#248f8f] 
            hover:shadow-[0_8px_20px_rgba(36,143,143,0.15)]"
          >
            회원가입
          </button>
        </div>
      </form>
    </>
  );
};
export default MemberLogin;
