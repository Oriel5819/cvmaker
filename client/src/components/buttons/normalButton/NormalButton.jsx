import React from "react";
import "./normalbutton.css";

export default function NormalButton(props) {
  return (
    <div className="button">
      <button
        onClick={props.whenClicked}
        id={props.id ? props.id : null}
        className="customized-button"
      >
        {props.title ? props.title : null}
      </button>
      {/* <button id='customized-button'>{props.title === "Connect" ? props.title : props.title.substring(0, 4) + '...'}</button> */}
    </div>
  );
}
