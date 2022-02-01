import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Loading from "../../components/laoding/laoding";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/actions/userActions";

export default function Login({ history }) {
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(true);
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
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const { loading: logLoading, error: logError, userInfo } = userLogin;
  const { loading: regLoading, error: regError } = userRegister;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setSomeoneHasLogged(true);
      navigate("/");
    }
    // handleIsRegister();
    // handleIsForgotPassword();
  }, [history, userInfo]);

  const handleIsRegister = async (e) => {
    setIsRegistered(!isRegistered);
    console.log("isR ", isRegistered);
  };

  const handleIsForgotPassword = async (e) => {
    setIsForgotPassword(!isForgotPassword);
    console.log("isFor ", isForgotPassword);
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();

    if (isForgotPassword) {
      // recovering email
    } else {
      if (newUser.password.length < 8) {
        setMessage(`Password less than 8 characters`);
      } else {
        if (isRegistered) {
          dispatch(login(newUser.email, newUser.password));
        } else {
          if (newUser.password === newUser.confirmpassword) {
            dispatch(register(newUser.email, newUser.password));
          } else {
            setMessage(`Passwords do not match`);
          }
        }
      }
    }
  };

  return (
    <Layout showSearchBar={someoneHasLogged} showProfileIcon={someoneHasLogged}>
      {logError && <ErrorMessage variant="danger">{logError}</ErrorMessage>}
      {regError && <ErrorMessage variant="danger">{regError}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {logLoading && <Loading />}
      {regLoading && <Loading />}
      <div className="sign-up">
        <div className="title">
          {isRegistered
            ? isForgotPassword
              ? "Enter your email"
              : "LOGIN"
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
              {(!isForgotPassword || !isRegistered) && (
                <input
                  id="password"
                  required
                  minLength={8}
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
                  minLength={8}
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
