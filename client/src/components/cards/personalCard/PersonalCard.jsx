import React from "react";
import NormalButton from "../../buttons/normalButton/NormalButton";
import "./personalcard.css";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import default_profile_photo from "../../../assests/img/temp_profile_photo.jpg";
import { makeFriend } from "../../../redux/actions/friendActions";

export default function PersonalCard(props) {
  const dispatch = useDispatch();

  const makeFriendship = async (e) => {
    e.preventDefault();
    dispatch(makeFriend(props.id));
  };

  return (
    <div className="personal-card">
      <div className="personal-card-avatar">
        <img
          id="avatar"
          src={props.avatar ? props.avatar : default_profile_photo}
          alt="avatar"
          height={48}
          width={48}
        />
      </div>
      <div className="personal-card-info">
        <div className="personal-card-name-class">
          <div id="name" className="personal-card-name">
            {/* <a href={props.linkToUserProfile}>{props.fname} {props.lname}</a> {props.class ? <BsDot/> : null} */}
            <Link to={props.linkToUserProfile}>
              {props.firstName} {props.lastName}
            </Link>{" "}
            {props.class && <BsDot />}
          </div>
          {props.class && (
            <div id="class" className="personal-card-class">
              {props.class}
            </div>
          )}
        </div>
        {(props.jobTitle || props.company) && (
          <div className="personal-card-jobtitle">
            {props.jobTitle} {props.company ? " - " + props.company : ""}
          </div>
        )}
        <div className="personal-card-connect-button">
          {(!props.friend || props.friend === "0") && (
            <NormalButton
              whenClicked={makeFriendship}
              title="Connect"
              id="connect-btn"
            />
          )}
          {props.friend}
        </div>
      </div>
    </div>
  );
}
