import React from "react";
import { useParams } from "react-router";
import Navbar from "../components/header/navbar/Navbar";
import Message from "../components/message/message/Message";
import "./index.css";

export default function Index(props) {
  const { id } = useParams();

  return (
    <div>
      <Navbar
        showSearchBar={props.showSearchBar}
        eventOnChanged={props.eventForOnChanged}
      />
      <div className="main">
        <div className="main-wrap">{props.children}</div>
        {id && (
          <div className="message-card">
            <Message />
          </div>
        )}
      </div>
    </div>
  );
}
