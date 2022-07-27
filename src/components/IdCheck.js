import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "../api/axios";

const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
const PHNUM_REGEX = /^[0-9\b -]{11,13}$/;

function IdCheck() {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [phonenum, setPhonenum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState(false);
  const [phoneNumFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState({});

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phonenum);
      // const value = [
      //   {
      //     name: name,
      //     phone: phonenum,
      //   },
      // ];

      // const blob = new Blob([JSON.stringify(value)], {
      //   type: "application/json",
      // });

      // formData.append("data", blob);

      const response = await axios({
        method: "POST",
        url: `/users/email`,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
        data: formData,
      });
      console.log(value);
      console.log(response?.data);
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      setName("");
      setPhonenum("");
      setResult(response?.data);
      console.log(result);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Name or Phonenum");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Don't find your Email");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="signupSection">
          <div className="text-4xl font-Stardos text-black">
            Find Your Email!
          </div>
          <div className="text-4xl font-Stardos text-black">
            Your Email = {result.Email}
          </div>
          <br />
          <p className="mt-16 text-2xl font-Stardos text-black hover:text-amber-300">
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
          <h1 className="mt-12 text-3xl font-Stardos text-black">
            Forget Email?
          </h1>
          <form className="signupForm" onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="mt-16 text-xl font-Stardos text-black signupLabel"
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
              Must input Korean 2 to 4 characters.
              <br />
              or Must input First Name(3~11) and Last Name(3~11)
            </p>

            <label
              htmlFor="phonenum"
              className="mt-16 text-xl font-Stardos text-black signupLabel"
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
              className="border-2 border-amber-900 text-2xl font-Stardos 
              text-black hover:text-white bg-amber-900 signupButton"
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
