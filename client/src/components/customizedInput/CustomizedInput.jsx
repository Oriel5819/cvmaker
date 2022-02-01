import React from "react";
import { FormControl } from "react-bootstrap";
import "./customizedinput.css";
import { HiSearch } from "react-icons/hi";

export default function CustomizedInput(props) {
  return (
    <div>
      <div className="input-container" style={{ display: props.css }}>
        <HiSearch />
        <FormControl
          type="search"
          placeholder={props.placeholder}
          className="me-2"
          aria-label="Search"
          onChange={props.whenChanged}
        />
      </div>
    </div>
  );
}
