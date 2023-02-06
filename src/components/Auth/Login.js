import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authFetchUser } from "../../redux/authSlice";
import { postLogin } from "../../services/apiServices";
import IconEye from "../icons/IconEye";
import { ImSpinner10 } from "react-icons/im";
import "./Login.scss";

const Login = () => {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();

  // state input change
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state toggle
  const [togglePassword, setTogglePassword] = useState(false);

  // state loading
  const [isLoading, setIsLoading] = useState(false);

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

  // submit login
  const handleSubmitLogin = async (e) => {
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
    setIsLoading(true);

    const data = await postLogin(email, password);

    if (data && data?.EC === 0) {
      toast.success(data?.EM);
      dispatch(authFetchUser(data));
      setIsLoading(false);
      navigate("/");
    }

    if (data && data?.EC !== 0) {
      setIsLoading(false);
      toast.error(data?.EM);
    }
  };
  return (
    <div className="login">
      <div className="login-header">
        <span className="login-header--text">Don't have an account yet?</span>
        <button
          className="login-header--btn"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
      <div className="login-content">
        <div className="login-heading">
          <h3>Login</h3>
          <span>Hello, who’s this?</span>
        </div>
        <form action="" className="login-form">
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
          <div className="login-form--btl">
            <button
              disabled={isLoading ? true : false}
              className="login-form--btn"
              onClick={(e) => handleSubmitLogin(e)}
              type="submit"
            >
              {isLoading ? (
                <ImSpinner10 className="loader-icon" />
              ) : (
                "Submit Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
