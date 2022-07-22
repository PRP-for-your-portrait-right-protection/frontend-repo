import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function IdCheck() {
  const [inputid, setInputId] = useState("");
  const [button, setButton] = useState(true);

  const realId = "cola";

  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.currentTarget.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    if (realId == inputid) {
      goToMain();
    } else {
      alert("아이디를 다시 입력해 주세요.");
    }
  };
  // 입력하는 아이디 길이가 4 이상이 아닐 경우 버튼이 활성화 되지 않는 함수
  function changeButton() {
    inputid.length >= 4 ? setButton(false) : setButton(true);
  }

  const goToMain = () => {
    navigate("/reset");
  };

  return (
    <form>
      <h2 className="pt-32 pl-16 text-4xl font-Stardos text-black">
        Forget
        <h3 className="text-3xl font-Stardos text-black">Password?</h3>
      </h2>
      <div className="mt-20 ml-16 text-xl font-Stardos text-black">
        <div>Check ID</div>
        <input
          placeholder="please fill in your Login ID"
          className="w-5/6 h-20 rounded-xl"
          inputid="id"
          onChange={handleInputId}
          onKeyUp={changeButton}
        />
      </div>
      <div className="float-right ">
        <button
          type="button"
          className="mt-24 mr-36 w-2/3 h-16 border-2 border-amber-900
           text-3xl font-Stardos text-black hover:text-white rounded-xl 
           bg-amber-900"
          disabled={button}
          onClick={onClickLogin}
        >
          Countinue
        </button>
      </div>
      <div className="my-24 ml-24 h-20">
        <div className="text-base font-Stardos text-black text-center">
          Remembered your password?
          <div className="ml-16">
            Back to
            <Link to="/signin">
              <strong className="ml-2 text-2xl font-Stardos text-center text-amber-900 hover:text-white">
                Sign in
              </strong>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default IdCheck;
