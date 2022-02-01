import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import NormalButton from "../../buttons/normalButton/NormalButton";
import "../modal.css";
import { Modal } from "react-bootstrap";

export default function PhotoModal(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      show={props.openModal}
      onHide={props.closeButton}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title>{"Edit " + props.title + " photo"}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body className="modal-body modal-body-photo">
          <div className="modal-body-contents">
            {props.photo && (
              <img
                src={props.photo}
                alt={props.title}
                height={props.title === "cover" ? 200 : 400}
                width={400}
              />
            )}
          </div>
          <div className="button-wrap">
            <label htmlFor="input-file">
              <BiImageAdd />
            </label>
            <input
              className="input-file"
              id="input-file"
              type="file"
              accept="image/*"
            />
            <button id="image-del">
              <AiOutlineDelete />
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <NormalButton
            className="modal-button"
            id="exp-edit-button"
            title="Save"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
