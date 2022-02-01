import React, { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import "./experience.css";
import EditExpModal from "../../../modals/editModal/editExpModal/EditExpModal";
import { useParams } from "react-router";

export default function Experience(props) {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="exp-detail-wrap" style={props.css}>
      <EditExpModal
        id={props.id}
        title="experience"
        position="Title"
        companyName="Company name"
        companyLocation="Company location"
        contract="Contract"
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeButton={() => setOpenModal(false)}
      />
      <div className="exp-detail-contents">
        <div className="exp-logo">
          <img
            id="logo"
            src={props.logo}
            alt="company"
            height={48}
            width={48}
          />
        </div>
        <div className="exp-info">
          {props.jobPosition && <div id="exp-title">{props.jobPosition}</div>}
          {props.companyName && (
            <div id="exp-name-and-position">
              {props.companyName}{" "}
              {props.contratTitle ? " - " + props.contratTitle : null}
            </div>
          )}
          {props.durationFrom && (
            <div id="exp-duration">
              {props.durationFrom}{" "}
              {props.durationTo ? " - " + props.durationTo : null}
            </div>
          )}
          {props.location && (
            <div id="exp-location">
              {props.location} {props.country ? " - " + props.country : null}
            </div>
          )}
          {props.description && (
            <div id="exp-description">{props.description}</div>
          )}
        </div>
      </div>
      <div className="exp-options">
        {!id && <VscEdit onClick={() => setOpenModal(true)} />}
      </div>
    </div>
  );
}
