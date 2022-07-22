import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [inputid, setInputId] = useState("");
  const [inputpw, setInputPw] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [button, setButton] = useState(true);

  const onIdHandler = (e) => {
    setInputId(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPhoneNumHandler = (e) => {
    setPhoneNum(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setInputPw(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const navigate = useNavigate();

  const onClickSignup = () => {
    if (inputpw == ConfirmPassword) {
      goToMain();
    } else {
      alert("비밀번호를 다시 확인해주세요.");
    }
  };

  const goToMain = () => {
    navigate("/signin");
  };

  function changeButton() {
    inputpw.length >= 5 ? setButton(false) : setButton(true);
  }

  return (
    <div>
      <h2 className="pt-8 pl-16 text-3xl font-Stardos text-black">
        Create Account
      </h2>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>ID</div>
        <input
          placeholder="ID"
          className="w-5/6 h-12 rounded-xl"
          inputid="id"
          onChange={onIdHandler}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>User Name</div>
        <input
          placeholder="User Name"
          className="w-5/6 h-12 rounded-xl"
          Name="User Name"
          onChange={onNameHandler}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>Phone number</div>
        <input
          placeholder="Phone number"
          className="w-5/6 h-12 rounded-xl"
          PhoneNum="Phone number"
          onChange={onPhoneNumHandler}
        />
      </div>
      <div className="mt-6 ml-16 text-xl font-Stardos text-black">
        <div>Password</div>
        <input
          type="password"
          placeholder="Password"
          className="w-5/6 h-12 rounded-xl"
          inputpw="password"
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
          ConfirmPassword="password"
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
    </div>
  );
}

export default SignUp;

/*
agllwy116
12345678

*/
