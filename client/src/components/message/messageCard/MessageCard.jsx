import React from "react";
import "./messagecard.css";
import CardHeadButton from "../../buttons/cardHeadButton/CardHeadButton";
import fake from "faker";

export default function MessageCard(props) {
  return (
    <div className="message-card">
      <CardHeadButton
        whenClicked={props.click}
        logo={props.logo}
        title="Message"
      />
      {props.children}
    </div>
  );
}
