import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Signup.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
const PHNUM_REGEX = /^[0-9\b -]{1,13}$/;
//const REGISTER_URL = "/signup";

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("");
  const [validId, setValidId] = useState(false);
  const [idFocus, setIdFocus] = useState(false);

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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidId(USER_REGEX.test(id));
  }, [id]);

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
  }, [id, name, phonenum, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(id);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(name);
    const v4 = PHNUM_REGEX.test(phonenum);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ id, name, phonenum, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setId("");
      setName("");
      setPhoneNum("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/signin">Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-2xl font-Stardos text-black">Create Account</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userid" className="text-xl font-Stardos text-black">
              ID:
              <FontAwesomeIcon
                icon={faCheck}
                className={validId ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validId || !id ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="userid"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              value={id}
              required
              aria-invalid={validId ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setIdFocus(true)}
              onBlur={() => setIdFocus(false)}
            />
            <p
              id="uidnote"
              className={
                idFocus && id && !validId ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label
              htmlFor="username"
              className="text-xl font-Stardos text-black"
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
              Must input Korean 2 to 4 characters.
              <br />
              or Must input First Name(3~11) and Last Name(3~11)
            </p>

            <label htmlFor="phnum" className="text-xl font-Stardos text-black">
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
              className="text-xl font-Stardos text-black"
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
              className="text-xl font-Stardos text-black"
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
              disabled={
                !validId || !validName || !validPwd || !validMatch
                  ? true
                  : false
              }
              className="border-2 border-amber-900 text-2xl font-Stardos text-black hover:text-white bg-amber-900"
            >
              Sign Up
            </button>
          </form>
          <p className="text-xl font-Stardos text-black">
            Already registered?
            <br />
            <span className="line">
              <Link to="/signin">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignUp;
