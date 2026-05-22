import classes from "./Auth.module.css";
import Container from "react-bootstrap/Container";
import { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import instance from "../../axiosConfig/axiosConfig";
import { AppState } from "../../App";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  function togglePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }
  async function onSubmit(e) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setLoginError("Please fill all the fields");
      return;
    }
    try {
      const { data } = await instance.post("/users/login", {
        email: email,
        password: password,
      });
      alert("User logged in successfully");
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setUser(data.username);
      navigate("/");
    } catch (error) {
      setLoginError(error?.response?.data?.msg);
      console.log(error.response);
    }
  }
  return (
    <section className={classes.login}>
      <Container fluid="lg" className={classes.container}>
        <div className={classes.form}>
          <h1>Login to your Account</h1>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create a new account</Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {loginError && <small style={{ color: "red" }}>{loginError}</small>}

            <div>
              <input ref={emailRef} type="text" placeholder="Your Email" />
            </div>

            <div className={classes.passwordField}>
              <input
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"}
                placeholder="Your Password"
              />
              <div
                className={classes.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <button type="submit">Login</button>
          </form>

          <Link to="/register">Create an account</Link>
        </div>
        <div className={classes.about}>
          <p>About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            About Evangadi Student Forum is a space where students can ask
            questions, share answers, and support each other throughout their
            learning journey. <br />
            It encourages collaboration and makes it easier to get help from
            peers in the Evangadi community. <br /> The forum also gives
            students hands-on experience building a real-world full-stack app
            using technologies like React, Node.js, and MySQL.
          </p>
          <button type="text">HOW IT WORKS</button>
        </div>
      </Container>
    </section>
  );
}

export default Login;
