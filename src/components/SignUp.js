import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [inputid, setInputId] = useState("");
  const [inputpw, setInputPw] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [button, setButton] = useState(true);

  const onIdHandler = (e) => {
    console.log(e);
    setInputId(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  /**
  - @name : Sung Hyun
  - @function: numberMaxLength - 문자열이 정규 표현식을 만족하는 지 판별하는 함수
  - @param : regex(정규표현식) 
  - @create-date : 2022.07.19
  */
  const numberMaxLength = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.currentTarget.value)) {
      setPhoneNum(e.currentTarget.value);
    }
  };

  const onPasswordHandler = (e) => {
    setInputPw(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const navigate = useNavigate();

  /**
  - @name : Sung Hyun
  - @function: 비밀번호 입력과 재입력이 같을 시 버튼 눌렀을 때 다른 페이지로 이동하는 함수
              아닐 경우 팝업창 뜸
  - @param : inputpw(비밀번호 입력) , ConfirmPassword(비밀번호 재입력)
  - @create-date : 2022.07.15
  */
  const onClickSignup = () => {
    if (inputpw === ConfirmPassword) {
      goToMain();
    } else {
      alert("비밀번호를 다시 확인해주세요.");
    }
  };

  const goToMain = () => {
    navigate("/signin");
  };

  /**
  - @name : Sung Hyun
  - @function: 비밀번호 5글자 이상인 지 검사한 후 버튼 활성화
  - @param : inputpw(비밀번호 입력) 
  - @create-date : 2022.07.15
  */
  function changeButton() {
    inputpw.length >= 5 ? setButton(false) : setButton(true);
  }

  /**
  - @name : Sung Hyun
  - @function: 전화번호 입력 시 자동으로 하이픈을 넣어주는 함수
  - @param : PhoneNum(전화번호 입력) 
  - @create-date : 2022.07.19
  */
  useEffect(() => {
    if (PhoneNum.length === 10) {
      setPhoneNum(PhoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (PhoneNum.length === 13) {
      setPhoneNum(
        PhoneNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [PhoneNum]);

  return (
    <form>
      <h2 className="pt-8 pl-16 text-3xl font-Stardos text-black">
        Create Account
      </h2>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>ID</div>
        <input
          placeholder="ID"
          className="w-5/6 h-12 rounded-xl"
          value={inputid}
          onChange={onIdHandler}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>User Name</div>
        <input
          placeholder="User Name"
          className="w-5/6 h-12 rounded-xl"
          value={Name}
          onChange={onNameHandler}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>Phone number</div>
        <input
          type="text"
          value={PhoneNum}
          placeholder="Phone number"
          className="w-5/6 h-12 rounded-xl"
          onChange={numberMaxLength}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>Password</div>
        <input
          type="password"
          placeholder="Password"
          className="w-5/6 h-12 rounded-xl"
          value={inputpw}
          onChange={onPasswordHandler}
          onKeyUp={changeButton}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>Confirm Password</div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-5/6 h-12 rounded-xl"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
      </div>
      <div>
        <button
          type="button"
          className="mt-10 ml-16 w-2/3 h-12 border-2 border-amber-900
               text-3xl font-Stardos text-black hover:text-white rounded-xl 
               bg-amber-900"
          disabled={button}
          onClick={onClickSignup}
        >
          Sign up
        </button>
      </div>
      <div className="my-8 ml-24 h-20">
        <span className="text-xl font-Stardos text-black text-center">
          Already a member?
        </span>
        <Link to="/signin">
          <strong className="ml-4 text-2xl font-Stardos text-center text-amber-900">
            Sign in
          </strong>
        </Link>
      </div>
    </form>
  );
}

export default SignUp;
