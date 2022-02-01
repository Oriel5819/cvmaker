import React from "react";
import "./position.css";

export default function Position(props) {
  return (
    props.currentCompany && (
      <div className="profile-about-right-side">
        <div className="profile-about-current-position-logo">
          {props.logo && (
            <img
              id="current-company-logo"
              src={props.logo}
              alt="company"
              height={34}
              width={34}
            />
          )}
        </div>
        <div className="profile-about-current-position-name">
          <div id="currentpositionname">{props.currentCompany}</div>
        </div>
      </div>
    )
  );
}
