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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);
    try {
      const formData = new FormData();

      const value = [
        {
          email: email,
          password: pwd,
        },
      ];

      const blob = new Blob([JSON.stringify(value)], {
        type: "application/json",
      });

      formData.append("data", blob);

      const response = await axios({
        method: "POST",
        url: `/mock_api/user/signin`,
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
      const accessToken = response?.data?.token;
      //const roles = response?.data?.roles;
      localStorage.setItem("token", accessToken);
      console.log(localStorage.getItem("token"));
      console.log(accessToken);
      //console.log(roles);
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing ID or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
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
      <h1 className="mt-12 text-3xl font-Stardos text-black">Sign In</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label
          htmlFor="useremail"
          className="mt-16 text-xl font-Stardos text-black signupLabel"
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
          className="mt-16 text-xl font-Stardos text-black signupLabel"
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
        <span className="line mt-4 text-xl font-Stardos text-black hover:text-amber-900">
          <Link to="/email">Forget Email?</Link>
        </span>
        <span className="line text-xl font-Stardos text-black hover:text-amber-900">
          <Link to="/reset">Forget password?</Link>
        </span>
        <button
          className="mt-20 border-2 border-amber-900 
            text-2xl font-Stardos text-black hover:text-white bg-amber-900 signupButton"
        >
          Sign In
        </button>
      </form>
      <p className="text-xl font-Stardos text-black">
        Need an Account?
        <br />
        <span className="line hover:text-amber-900">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
