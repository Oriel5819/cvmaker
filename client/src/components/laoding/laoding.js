import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

export default function Laoding({ size = 50 }) {
  return (
    <div
      className="spinner-wrap"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        color: "blueviolet",
      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
        role="status"
      ></Spinner>
    </div>
  );
}
