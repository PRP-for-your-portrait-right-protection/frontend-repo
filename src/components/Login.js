import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "../api/axios";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  // 로그인 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", pwd);

    const response = await axios
      .post(`/auth`, formData)
      .then(function (response) {
        console.log(response);
        console.log(response?.data);
        const accessToken = response?.data?.token;
        const userName = response?.data?.user_name;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("name", userName);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("name"));
        setEmail("");
        setPwd("");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing ID or Password");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <section className="signupSection">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-3xl font-Ubuntu text-blue-900">Sign In</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label
          htmlFor="useremail"
          className="text-xl font-Ubuntu text-blue-900 signupLabel"
        >
          Email:
        </label>
        <input
          className="signupInput"
          type="text"
          id="useremail"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label
          htmlFor="password"
          className="text-xl font-Ubuntu text-blue-900 signupLabel"
        >
          Password:
        </label>
        <input
          className="signupInput"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <span className="line mt-4 text-xl font-Ubuntu text-sky-400 hover:text-sky-300">
          <Link to="/email">Forgot Email?</Link>
        </span>
        <span className="line text-xl font-Ubuntu text-sky-400 hover:text-sky-300">
          <Link to="/reset">Forgot password?</Link>
        </span>
        <button
          className="border-2 border-sky-400 
            text-2xl font-Ubuntu text-white 
            hover:text-blue-900 bg-sky-400 signupButton"
        >
          Sign In
        </button>
      </form>
      <p className="text-xl font-Ubuntu text-blue-900">
        Need an Account?
        <br />
        <span className="line text-sky-400 hover:text-sky-300">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
