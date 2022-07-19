import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [inputid, setInputId] = useState("");
  const [inputpw, setInputPw] = useState("");
  const [button, setButton] = useState(true);

  const realId = "agllwy116";
  const realPw = "12345678";

  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.currentTarget.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.currentTarget.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    if (realId == inputid) {
      if (realPw == inputpw) {
        goToMain();
      } else {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
  };
  // 입력하는 패스워드 길이가 5 이상이 아닐 경우 버튼이 활성화 되지 않는 함수
  function changeButton() {
    inputpw.length >= 5 ? setButton(false) : setButton(true);
  }

  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div>
      <h2 className="pt-20 pl-16 text-3xl font-Stardos text-black">Login</h2>
      <div className="mt-12 ml-16 text-xl font-Stardos text-black">
        <div>ID</div>
        <input
          placeholder="ID"
          className="w-5/6 h-16 rounded-xl"
          inputid="id"
          onChange={handleInputId}
        />
      </div>
      <div className="mt-12 ml-16 text-xl font-Stardos text-black">
        <div>Password</div>
        <input
          type="password"
          placeholder="Password"
          className="w-5/6 h-16 rounded-xl"
          inputpw="password"
          onChange={handleInputPw}
          onKeyUp={changeButton}
        />
      </div>
      <div className="ml-16 text-xl text-black hover:text-white font-Stardos text-amber-900">
        <Link to="/reset">
          <div>Forget password?</div>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="mt-20 ml-16 w-2/3 h-16 border-2 border-amber-900
           text-3xl font-Stardos text-black hover:text-white rounded-xl 
           bg-amber-900"
          disabled={button}
          onClick={onClickLogin}
        >
          Sign in
        </button>
      </div>
      <div className="my-16 ml-24 h-20">
        <span className="text-xl font-Stardos text-black text-center">
          Do not have an account yet?
        </span>
        <Link to="/signup">
          <strong className="ml-4 text-2xl font-Stardos text-center text-amber-900 hover:text-white">
            Sign up
          </strong>
        </Link>
      </div>
    </div>
  );
}

export default Login;
