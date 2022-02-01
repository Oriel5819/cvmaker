import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import NormalButton from "../../../buttons/normalButton/NormalButton";
import "../../../modals/modal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExperience,
  updateExperience,
} from "../../../../redux/actions/expActions";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Laoding from "../../../laoding/laoding";
import api from "../../../../api";

export default function EditExpModal(props) {
  const [experience, setExperience] = useState({
    jobPosition: "",
    companyName: "",
    contractTitle: "",
    durationFrom: "",
    durationTo: "",
    companyLocation: "",
    description: "",
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const expUpdate = useSelector((state) => state.expUpdate);
  const { loading: updateLoading, error: updateError } = expUpdate;
  const expDelete = useSelector((state) => state.expDelete);
  const { loading: deleteLoading, error: deleteError } = expDelete;

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await api.get(`/exps/${props.id}`, config);

      setExperience({
        ...experience,
        jobPosition: data.jobPosition,
        companyName: data.companyName,
        contractTitle: data.contractTitle,
        durationFrom: data.durationFrom,
        durationTo: data.durationTo,
        companyLocation: data.address.city,
        description: data.description,
      });
    };
    fetching();
  }, [props.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateExperience(
        props.id,
        experience.jobPosition,
        experience.companyName,
        experience.contractTitle,
        experience.durationFrom,
        experience.durationTo,
        experience.companyLocation,
        experience.description
      )
    );

    !updateLoading && (await props.setOpenModal(false));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteExperience(props.id));
      !deleteLoading && (await props.setOpenModal(false));
    }
  };

  // console.log(loading);

  return (
    <Modal
      className={"modal exp-modal"}
      id={"exp-modal-add"}
      show={props.openModal}
      onHide={props.closeButton}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title>{"Editing " + props.title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        {updateLoading && <Laoding size={30} />}
        {deleteLoading && <Laoding size={30} />}
        {updateError && (
          <ErrorMessage variant="danger">{updateError}</ErrorMessage>
        )}
        {deleteError && (
          <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
        )}
        <Modal.Body>
          <div className="modal-body">
            <div className="modal-body-contents">
              <div>
                <label htmlFor="">{props.position}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setExperience({
                      ...experience,
                      jobPosition: e.target.value,
                    })
                  }
                  value={experience.jobPosition}
                />
              </div>
              <div>
                <label htmlFor="">{props.companyName}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setExperience({
                      ...experience,
                      companyName: e.target.value,
                    })
                  }
                  value={experience.companyName}
                />
              </div>
              <div>
                <label htmlFor="">{props.contract}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setExperience({
                      ...experience,
                      contractTitle: e.target.value,
                    })
                  }
                  value={experience.contractTitle}
                />
              </div>
              <div className="duration-class">
                <div>
                  <label htmlFor="">From</label>
                  <input
                    className="duration"
                    required
                    type="date"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        durationFrom: e.target.value,
                      })
                    }
                    value={experience.durationFrom}
                  />
                </div>
                {!experience.present && (
                  <div>
                    <label htmlFor="">To</label>
                    <input
                      className="duration"
                      required
                      type="date"
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          durationTo: e.target.value,
                        })
                      }
                      value={experience.durationTo}
                    />
                  </div>
                )}
                {/* {console.log(experience.durationTo)} */}
                {(!experience.durationTo ||
                  experience.durationTo === "present") && (
                  <div>
                    <label htmlFor="">Present</label>
                    <input
                      className="duration checkbox"
                      type="checkbox"
                      required
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          present: e.target.checked,
                          durationTo: "present",
                        })
                      }
                      value={experience.present}
                    />
                  </div>
                )}
              </div>
              <label htmlFor="">{props.companyLocation}</label>
              <input
                required
                type="text"
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    companyLocation: e.target.value,
                  })
                }
                value={experience.companyLocation}
              />
              <label htmlFor="">Description</label>
              <br></br>
              <textarea
                id="exp-text"
                name="exp-text"
                rows="4"
                cols="50"
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    description: e.target.value,
                  })
                }
                value={experience.description}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <NormalButton
            whenClicked={handleDelete}
            id="exp-delete-button"
            title="Delete"
          />
          <NormalButton
            whenClicked={handleSubmit}
            id="exp-add-button"
            title="Update"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
