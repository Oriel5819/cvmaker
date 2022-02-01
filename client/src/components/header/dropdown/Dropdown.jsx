import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import "./dropdown.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dropdown(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentUser = useSelector((state) => state.userInfo);
  const { user: currUser } = currentUser;

  const updatedUser = useSelector((state) => state.userUpdate);
  const {
    loading: userUpdateLoading,
    error: userUpdateError,
    success: userUpdateSuccess,
  } = updatedUser;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const profileHandler = (e) => {
    e.preventDefault();
    navigate("/me");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userUpdateSuccess]);

  return (
    <NavDropdown
      title={
        userInfo && (
          <div className="pull-left">
            <div id="identification">
              {currUser?.firstName ? currUser?.firstName : userInfo.email}
            </div>
            <img
              className="thumbnail-image"
              src={props.image}
              alt={props.title}
              width={35}
              height={35}
            />
          </div>
        )
      }
      id="basic-nav-dropdown"
    >
      <NavDropdown.Item onClick={profileHandler}>Me</NavDropdown.Item>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
}
