import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "../api/axios";
import GoogleButton from "./GoogleButton";

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
        localStorage.setItem("token", accessToken);
        console.log(localStorage.getItem("token"));
        console.log(accessToken);
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
      <h1 className="text-3xl font-Stardos text-black">Sign In</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label
          htmlFor="useremail"
          className="text-xl font-Stardos text-black signupLabel"
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
          className="text-xl font-Stardos text-black signupLabel"
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
        <span className="line mt-4 text-xl font-Stardos text-black hover:text-white">
          <Link to="/email">Forget Email?</Link>
        </span>
        <span className="line text-xl font-Stardos text-black hover:text-white">
          <Link to="/reset">Forget password?</Link>
        </span>
        <button
          className="border-2 border-amber-900 
            text-2xl font-Stardos text-black hover:text-white bg-amber-900 signupButton"
        >
          Sign In
        </button>
        <GoogleButton />
      </form>
      <p className="text-xl font-Stardos text-black">
        Need an Account?
        <br />
        <span className="line hover:text-white">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
