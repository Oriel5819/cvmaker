import React, { useState, useEffect } from "react";
import Layout from "../../layout/index";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import Navbar from "../../components/header/navbar/Navbar";
import { FaBullseye } from "react-icons/fa";
import Loading from "../../components/laoding/laoding";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

export default function SignUp({ history }) {
  const navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      // console.log(userInfo);
      navigate("/");
    }
    handleIsRegister();
  }, [history]);

  const handleIsRegister = async (e) => {
    setIsRegistered(!isRegistered);
    console.log(isRegistered);
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      setLoading(true);

      if (isRegistered) {
        const { data } = await axios.post(
          "http://localhost:3005/users/login",
          user,
          config
        );
        console.log("LOGIN ", data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          navigate("/");
        }
      } else {
        if (newUser.password === newUser.confirmpassword) {
          const { data } = await axios.post(
            "http://localhost:3005/users/register",
            user,
            config
          );
          console.log("REGISTER ", data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            navigate("/");
          }
        } else {
          setMessage(`Passwords do not match`);
        }
      }

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }

    //   const createdUser = await livedb.post("/users", UserToSave);

    // console.log(createdUser);

    //   navigate("/users/" + createdUser.data);
  };

  return (
    <Layout showSearchBar={false}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="sign-up">
        {/* <div className="title">{isRegistered ? "LOGIN" : "REGISTER"}</div> */}
        <form onSubmit={handleSubmit}>
          <div className="text-field">
            <div>
              {/* <label htmlFor="email">Email</label> */}
              <input
                id="email"
                required
                type="text"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
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
            </div>
            {!isRegistered && (
              <div>
                {/* <label htmlFor="confirm-password">Confirm your password</label> */}
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
          <input
            id="submit-button"
            type="submit"
            value={isRegistered ? "LOGIN" : "REGISTER"}
          />
        </form>
        <div className="register-login-button-wrap">
          <button id="register-login-button" onClick={handleIsRegister}>
            {isRegistered ? "New user?" : "Already have an account?"}
          </button>
          {isRegistered && (
            <button id="forgot-password-button">Forgot password?</button>
          )}
        </div>
      </div>
    </Layout>
  );
}
