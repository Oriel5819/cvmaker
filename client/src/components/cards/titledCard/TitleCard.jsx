import React from "react";
import Cardfooterbutton from "../../buttons/cardFooterButton/Cardfooterbutton";
import "./titledcard.css";

export default function TitleCard(props) {
  return (
    <div className="">
      <div className="titled-card">
        <div className="title-card-contents">
          <div className="titled-card-head">
            {props.title && <div className="title-itself">{props.title}</div>}
            {props.icon && (
              <div className="titled-card-add-button add-button">
                {props.icon}
              </div>
            )}
          </div>
          {props.children}
        </div>
      </div>
      {
        <Cardfooterbutton
          title={props.bottomButtonTitle}
          whenClicked={props.whenClicked}
        ></Cardfooterbutton>
      }
    </div>
  );
}
