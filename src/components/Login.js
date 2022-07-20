import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//import AuthContext from "./context/AuthProvider";

import axios from "../api/axios";
//const LOGIN_URL = '/auth'

const Login = () => {
  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [id, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ id, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ id, pwd, roles, accessToken });
      setId("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/main">Go to Home</Link>
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
          <h1 className="text-3xl font-Stardos text-black">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="userid"
              className="mt-16 text-xl font-Stardos text-black"
            >
              ID:
            </label>
            <input
              type="text"
              id="userid"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              value={id}
              required
            />

            <label
              htmlFor="password"
              className="mt-16 text-xl font-Stardos text-black"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="mt-20 border-2 border-amber-900 text-2xl font-Stardos text-black hover:text-white bg-amber-900">
              Sign In
            </button>
          </form>
          <p className="text-xl font-Stardos text-black">
            Need an Account?
            <br />
            <span className="line">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
