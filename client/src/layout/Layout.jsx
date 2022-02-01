import React from "react";
import { useParams } from "react-router";
import Navbar from "../components/header/navbar/Navbar";
import Message from "../components/message/message/Message";
import "./layout.css";

export default function Layout(props) {
  const { id } = useParams();

  return (
    <div className="layout">
      <Navbar
        showSearchBar={props.showSearchBar}
        showProfileIcon={props.showProfileIcon}
        eventOnChanged={props.eventForOnChanged}
      />
      <div className="main">
        <div className="main-wrap">{props.children}</div>
        <div className="message-card">
          <Message />
        </div>
      </div>
    </div>
  );
}
