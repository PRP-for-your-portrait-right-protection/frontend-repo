import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./Signup.css";

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,30}$/;
const PHNUM_REGEX = /^[0-9\b -]{11,13}$/;
//const REGISTER_URL = "/signup";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [phonenum, setPhoneNum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [checkErrMsg, setCheckErrMsg] = useState("");
  const [usableId, setUsableID] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setUsableID(false);
    setCheckErrMsg("");
  }, [email]);

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
      setPhoneNum(phonenum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phonenum.length === 13) {
      setPhoneNum(
        phonenum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phonenum]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, name, phonenum, pwd, matchPwd]);

  // 회원가입 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(name);
    const v4 = PHNUM_REGEX.test(phonenum);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    if (usableId === false) {
      setErrMsg("Please Check Your Email");
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", pwd);
    formData.append("name", name);
    formData.append("phone", phonenum);

    const response = await axios
      .post(`/users`, formData)
      .then(function (response) {
        //   //clear state and controlled inputs
        //   //need value attrib on inputs for this
        setEmail("");
        setName("");
        setPhoneNum("");
        setPwd("");
        setMatchPwd("");
        navigate("/signin");
      })
      .catch(function (error) {
        console.log(error);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 409) {
          setErrMsg("ID Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      });
  };

  // 아이디 체크 함수
  const Clicksubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    const formData = new FormData();

    formData.append("email", email);

    const response = await axios
      .post(`/users/email/validation`, formData)
      .then(function (response) {
        setUsableID(true);
        setCheckErrMsg("사용 가능한 Email 입니다.");
      })
      .catch(function (error) {
        console.log("error");
        if (!error?.response) {
          setCheckErrMsg("No Server Response");
        } else if (error.response?.status === 409) {
          setCheckErrMsg("이미 사용 중인 Email 입니다.");
        } else {
          setCheckErrMsg("사용 불가한 Email 입니다.");
        }
        errRef.current.focus();
      });
  };

  return (
    <section className="signupSection2">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl font-Ubuntu text-blue-900">Create Account</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="text-base font-Ubuntu text-blue-900 signupLabel"
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
          aria-describedby="uidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <button
          className="border-2 border-sky-400 font-Ubuntu
            text-white hover:text-blue-900 bg-sky-400 checkButton"
          onClick={Clicksubmit}
        >
          Check ID
        </button>
        <p
          ref={errRef}
          className={checkErrMsg ? "checkmsg" : "hide"}
          aria-live="assertive"
        >
          {checkErrMsg}
        </p>
        <p
          id="uidnote"
          className={
            EmailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must input your Email
        </p>

        <label
          htmlFor="username"
          className="text-base font-Ubuntu text-blue-900 signupLabel"
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
          htmlFor="phnum"
          className="text-base font-Ubuntu text-blue-900 signupLabel"
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
          id="phnum"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setPhoneNum(e.target.value)}
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

        <label
          htmlFor="password"
          className="text-base font-Ubuntu text-blue-900 signupLabel"
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
          Must include uppercase and lowercase letters, a number and a special
          character.
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
          className="text-base font-Ubuntu text-blue-900 signupLabel"
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
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          disabled={
            !validEmail || !validName || !validPwd || !validMatch ? true : false
          }
          className="border-2 border-sky-400 text-2xl 
              font-Ubuntu text-white hover:text-blue-900 bg-sky-400 signupButton"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      <p className="text-base font-Ubuntu text-blue-900">
        Already registered?
        <br />
        <span className="line">
          <Link to="/signin" className="signupA">
            Sign In
          </Link>
        </span>
      </p>
    </section>
  );
};

export default SignUp;
