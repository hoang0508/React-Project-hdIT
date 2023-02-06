import React from "react";
import "./Login.scss";
import { useState } from "react";
import IconEye from "../icons/IconEye";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  // toggle Passowrd
  const handleTogglePassWord = () => {
    setTogglePassword(!togglePassword);
  };

  // fucn validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    // validate;
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }
    // console.log(email, password, userName);
    const data = await postRegister(email, password, userName);
    if (data && data?.EC === 0) {
      toast.success(data?.EM);
      setEmail("");
      setUserName("");
      setPassword("");
      navigate("/login");
    }

    if (data && data?.EC !== 0) {
      toast.error(data?.EM);
    }
  };
  return (
    <>
      <div className="login-content">
        <div className="login-heading">
          <h3>Sign Up</h3>
          <span>Hello, who’s this?</span>
        </div>
        <form action="" className="login-form">
          <div className="login-form--group">
            <label htmlFor="" className="label d-block">
              Username
            </label>
            <input
              placeholder="Enter your username..."
              type={"text"}
              className="input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="login-form--group">
            <label htmlFor="" className="label d-block">
              Email
            </label>
            <input
              placeholder="Enter your email..."
              type={"email"}
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form--group">
            <label htmlFor="" className="label d-block">
              Password
            </label>
            <div className="position-relative">
              <input
                placeholder="Enter your password..."
                type={togglePassword ? "text" : "password"}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon" onClick={() => handleTogglePassWord()}>
                <IconEye open={togglePassword} />
              </span>
            </div>
          </div>
          <button
            className="login-form--btn"
            onClick={(e) => handleSubmitSignUp(e)}
            type="submit"
          >
            Submit SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
