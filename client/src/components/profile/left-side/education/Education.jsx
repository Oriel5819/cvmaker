import React, { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import "./education.css";
import EditEducModal from "../../../modals/editModal/editEducModal/EditEducModal";
import { useParams } from "react-router";

export default function Education(props) {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="educ-detail-wrap" style={props.css}>
      <EditEducModal
        id={props.id}
        title="education"
        degree="Degree"
        schoolName="School name"
        major="Major"
        schoolLocation="School location"
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeButton={() => setOpenModal(false)}
      />
      <div className="educ-detail-contents" style={props.css}>
        <div className="educ-logo">
          <img
            id="logo"
            src={props.logo}
            alt="company"
            height={48}
            width={48}
          />
        </div>
        <div className="educ-info">
          <div id="educ-name">{props.name}</div>
          <div id="educ-major">
            {props.degree}, {props.major}
          </div>
          <div id="educ-duration">
            {props.durationFrom} - {props.durationTo}
          </div>
          <div className="educ-description-wrap">
            <div className="educ-description">{props.description}</div>
          </div>
        </div>
      </div>
      <div className="educ-options">
        {!id && <VscEdit onClick={() => setOpenModal(true)} />}
      </div>
    </div>
  );
}
