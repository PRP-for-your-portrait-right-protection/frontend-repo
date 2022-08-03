import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "../api/axios";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const PHNUM_REGEX = /^[0-9\b -]{11,13}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function InfoCheck() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [phonenum, setPhonenum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, phonenum]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

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

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // 비밀번호 찾기 전 정보 검증 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    sessionStorage.setItem("Email", email);
    sessionStorage.setItem("Phone", phonenum);

    formData.append("email", email);
    formData.append("phone", phonenum);

    const response = await axios
      .post(`/users/password/validation`, formData)
      .then(function (response) {
        setEmail("");
        setPhonenum("");
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
          setErrMsg("Information is not collected");
        }
        errRef.current.focus();
      });
  };

  // 비밀번호 변경 api 함수
  const resetHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", sessionStorage.getItem("Email"));
    formData.append("phone", sessionStorage.getItem("Phone"));
    formData.append("password", pwd);

    const response = await axios
      .patch(`/users/password`, formData)
      .then(function (response) {
        setPwd("");
        setMatchPwd("");
        sessionStorage.clear();
        alert("Successed reset Password!!");
        navigate("/signin");
      })
      .catch(function (error) {
        console.log(error);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing Password");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Failed to reset password");
        }
        errRef.current.focus();
      });
  };

  return (
    <>
      {success ? (
        <section className="signupSection">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="mt-12 text-3xl font-Ubuntu text-blue-900">
            Reset Password
          </h1>
          <form className="signupForm" onSubmit={resetHandle}>
            <label
              htmlFor="password"
              className="text-xl font-Ubuntu text-blue-900 signupLabel"
            >
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signupInput"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label
              htmlFor="confirm_pwd"
              className="text-xl font-Ubuntu text-blue-900 signupLabel"
            >
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signupInput"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validPwd || !validMatch ? true : false}
              className="border-2 border-sky-400 
              text-2xl font-Ubuntu text-white 
              hover:text-blue-900 bg-sky-400 signupButton"
            >
              Reset Password
            </button>
          </form>
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
            Forget Password?
            <div className="text-2xl">check your Information</div>
          </h1>
          <form className="signupForm" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="mt-16 text-xl font-Ubuntu text-blue-900 signupLabel"
            >
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              className="signupInput"
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uemailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uemailnote"
              className={
                EmailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must input your Email
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
              disabled={!validEmail || !validPhoneNum ? true : false}
              className="border-2 border-sky-400 
              text-2xl font-Ubuntu text-white 
              hover:text-blue-900 bg-sky-400 signupButton"
            >
              Information check
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default InfoCheck;
