import classes from "./Auth.module.css";
import Container from "react-bootstrap/Container";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig/axiosConfig";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  function togglePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  async function onSubmit(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const firstname = firstNameRef.current.value;
    const lastname = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !firstname || !lastname || !email || !password) {
      setLoginError("Please fill all the fields");
      return;
    }
    try {
      await instance.post("/users/register", {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      setLoginError(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  return (
    <section className={classes.login}>
      <Container fluid="lg" className={classes.container}>
        <div className={`${classes.form} ${classes.register}`}>
          <h1>Join The Network</h1>
          <div>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {loginError && <small style={{ color: "red" }}>{loginError}</small>}
            <div>
              <input ref={usernameRef} type="text" placeholder="username" />
            </div>

            <div className={classes.name}>
              <input ref={firstNameRef} type="text" placeholder="first name" />{" "}
              <input ref={lastNameRef} type="text" placeholder="last name" />
            </div>
            <div>
              <input ref={emailRef} type="email" placeholder="email" />
            </div>

            <div className={classes.passwordField}>
              <input
                ref={passwordRef}
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
              />
              <div
                className={classes.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <div className={classes.register_button}>
              <button type="submit">Agree and Join</button>
            </div>
          </form>
          <p>
            I agree to <Link>privacy policy</Link> and{" "}
            <Link>terms of service</Link>
          </p>
          <Link to="/login">Already have an account?</Link>
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

export default Register;
