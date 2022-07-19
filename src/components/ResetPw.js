import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ResetPw() {
  const [inputpw, setInputPw] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputPw = (e) => {
    setInputPw(e.currentTarget.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  // Reset Password 버튼 클릭 이벤트
  const onClickReset = () => {
    if (inputpw === ConfirmPassword) {
      goToMain();
    } else {
      alert("비밀번호를 다시 확인해주세요.");
    }
  };
  // 입력하는 패스워드 길이가 5 이상이 아닐 경우 버튼이 활성화 되지 않는 함수
  function changeButton() {
    inputpw.length >= 5 ? setButton(false) : setButton(true);
  }

  const goToMain = () => {
    navigate("/signin");
  };

  return (
    <div>
      <h2 className="pt-20 pl-16 text-3xl font-Stardos text-black">
        Reset Password
      </h2>
      <div className="mt-12 ml-16 text-xl font-Stardos text-black">
        <div>Password</div>
        <input
          placeholder="Password"
          className="w-5/6 h-16 rounded-xl"
          value={inputpw}
          onChange={handleInputPw}
          onKeyUp={changeButton}
        />
      </div>
      <div className="mt-12 ml-16 text-xl font-Stardos text-black">
        <div>Confirm Password</div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-5/6 h-16 rounded-xl"
          value={ConfirmPassword}
          onChange={handleConfirmPassword}
          onKeyUp={changeButton}
        />
      </div>
      <div>
        <button
          type="button"
          className="mt-20 ml-16 w-2/3 h-16 border-2 border-amber-900
           text-3xl font-Stardos text-black hover:text-white rounded-xl 
           bg-amber-900"
          disabled={button}
          onClick={onClickReset}
        >
          Reset Password
        </button>
      </div>
      <div className="my-16 h-12"></div>
    </div>
  );
}

export default ResetPw;
