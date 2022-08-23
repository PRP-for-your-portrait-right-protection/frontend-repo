import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "../../api/axios";

const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,30}$/;
const PHNUM_REGEX = /^[0-9\b -]{11,13}$/;

function IdCheck() {
  const userRef: any = useRef();
  const errRef: any = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [phonenum, setPhonenum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, phonenum]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPhoneNum(PHNUM_REGEX.test(phonenum));
  }, [phonenum]);

  /** 
   - @name : Sung Hyun
  - @function: 전화번호 입력 시 자동으로 하이픈을 넣어주는 함수
   - @param : PhoneNum(전화번호 입력)
   - @create-date : 2022.07.19
   */
  useEffect(() => {
    if (phonenum.length === 10) {
      setPhonenum(phonenum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phonenum.length === 13) {
      setPhonenum(
        phonenum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phonenum]);

  // 아이디 찾기 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phonenum);

    const response = await axios
      .post(`/users/email`, formData)
      .then(function (response) {
        setName("");

        setPhonenum("");

        setResult(response?.data.email);

        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing Name or Phonenum");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Don't find your Email");
        }
      });
  };

  return (
    <>
      {success ? (
        <section className="signupSection">
          <div className="text-4xl font-Ubuntu text-blue-900 mt-16">
            Find Your Email!
          </div>
          <div className="text-4xl font-Ubuntu text-sky-400">{result}</div>
          <br />
          <p className="mt-16 text-2xl font-Ubuntu text-blue-900 hover:text-sky-400">
            <Link to="/signin">Sign in</Link>
          </p>
        </section>
      ) : (
        <section className="signupSection">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="mt-12 text-3xl font-Ubuntu text-blue-900">
            Forget Email?
          </h1>
          <form className="signupForm" onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="mt-16 text-xl font-Ubuntu text-blue-900 signupLabel"
            >
              User Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !name ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signupInput"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="unamenote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <p
              id="unamenote"
              className={
                nameFocus && name && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must input your Name
            </p>

            <label
              htmlFor="phonenum"
              className="mt-16 text-xl font-Ubuntu text-blue-900 signupLabel"
            >
              Phone Number:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPhoneNum ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPhoneNum || !phonenum ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signupInput"
              type="text"
              id="phonenum"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setPhonenum(e.target.value)}
              value={phonenum}
              required
              aria-invalid={validPhoneNum ? "false" : "true"}
              aria-describedby="phnumnote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p
              id="phnumnote"
              className={
                phoneNumFocus && phonenum && !validPhoneNum
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must input 10 or 11 characters
            </p>

            <button
              disabled={!validName || !validPhoneNum ? true : false}
              className="border-2 border-sky-400 text-2xl font-Ubuntu 
              text-white hover:text-blue-900 bg-sky-400 signupButton"
            >
              Find Email
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default IdCheck;
