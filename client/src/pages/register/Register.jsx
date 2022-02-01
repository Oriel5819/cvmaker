import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import Loading from "../../components/laoding/laoding";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/actions/userActions";

export default function Register({ history }) {
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [someoneHasLogged, setSomeoneHasLogged] = useState(false);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setSomeoneHasLogged(true);
      console.log("user");
      navigate("/");
    }
    handleIsRegister();
  }, [history, userInfo]);

  const handleIsRegister = async (e) => {
    setIsRegistered(!isRegistered);
    console.log("isReg ", isRegistered);
  };

  const handleIsForgotPassword = async (e) => {
    setIsForgotPassword(!isForgotPassword);
    console.log("isFor ", isForgotPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUser.password.length < 8) {
      setMessage(`Password less than 8 characters`);
    } else {
      if (newUser.password === newUser.confirmpassword) {
        dispatch(register(newUser.email, newUser.password));
      } else {
        setMessage(`Passwords do not match`);
      }
    }
  };

  return (
    <Layout showSearchBar={someoneHasLogged} showProfileIcon={someoneHasLogged}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <div className="sign-up">
        <div className="title">
          {isRegistered
            ? !isForgotPassword
              ? "LOGIN"
              : "Enter your email"
            : "REGISTER"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-field">
            <div>
              <input
                id="email"
                required
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              {!isForgotPassword && (
                <input
                  id="password"
                  required
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              )}
            </div>
            {!isRegistered && (
              <div>
                <input
                  id="confirm-password"
                  required
                  type="password"
                  placeholder="Confirm your password"
                  value={newUser.confirmpassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmpassword: e.target.value })
                  }
                />
              </div>
            )}
          </div>
          <input id="submit-button" type="submit" value={"OK"} />
        </form>
        <div className="register-login-button-wrap">
          <button id="register-login-button" onClick={handleIsRegister}>
            {isRegistered ? "New user?" : "Already have an account?"}
          </button>
          {isRegistered && (
            <button
              onClick={handleIsForgotPassword}
              id="forgot-password-button"
            >
              {isForgotPassword ? "Remembered password?" : "Forgot password?"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
