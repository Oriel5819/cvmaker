import React from "react";
import logo from "../../../assests/img/LinkedIn_logo_initials.png";
import Links from "../links/Links";
import { FaGlobe } from "react-icons/fa";
import { HiHome, HiUsers } from "react-icons/hi";
import {
  BsFillBriefcaseFill,
  BsFillChatLeftDotsFill,
  BsCaretDownFill,
} from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import "./navbar.css";
import Dropdown from "../dropdown/Dropdown";
import Menu from "../menu/Menu";
import Verticalbar from "../verticalbar/Verticalbar";
import CustomizedInput from "../../customizedInput/CustomizedInput";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-wrap">
          <div className="logo-container">
            <Link to={"/"}>
              {/* <img src={logo} height={34} width={34} alt="fakeprofile_logo" /> */}
              <p id="logo-name">fakeProfile</p>
            </Link>
          </div>
          <div className="search-bar-me-container">
            <div className="navbar-middle-side">
              {props.showSearchBar && (
                <CustomizedInput
                  whenChanged={props.eventOnChanged}
                  placeholder="Search for jobs, companies..."
                />
              )}
            </div>
            <div className="navbar-right-side">
              {props.showProfileIcon && (
                <Dropdown
                  image="https://i.pravatar.cc/100"
                  alt="Me"
                  icon={<BsCaretDownFill />}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
