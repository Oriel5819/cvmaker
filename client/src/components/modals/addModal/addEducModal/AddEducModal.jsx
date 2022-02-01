import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import NormalButton from "../../../buttons/normalButton/NormalButton";
import defaultSchoolLogo from "../../../../assests/img/temp_company.jfif";
import "../../../modals/modal.css";
import { useParams } from "react-router";
import api from "../../../../api/index";
import { useDispatch, useSelector } from "react-redux";
import { createEducation } from "../../../../redux/actions/educActions";

export default function AddEducModal(props) {
  const { id } = useParams();
  const [education, setEducation] = useState({
    degree: "",
    schoolLogo: defaultSchoolLogo,
    schoolName: "",
    major: "",
    durationFrom: "",
    durationTo: "",
    schoolLocation: "",
    country: "Madagascar",
    description: "",
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const educCreate = useSelector((state) => state.educCreate);
  const { loading, error } = educCreate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createEducation(
        userInfo._id,
        education.degree,
        education.schoolLogo,
        education.schoolName,
        education.major,
        education.durationFrom,
        education.durationTo,
        education.schoolLocation,
        education.country,
        education.description
      )
    );

    !loading && (await props.setOpenModal(false));
  };

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
        <Modal.Title>{"Adding " + props.title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="modal-body">
            <div className="modal-body-contents">
              <div>
                <label htmlFor="">{props.degree}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setEducation({ ...education, degree: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">{props.schoolName}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      schoolName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">{props.major}</label>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setEducation({ ...education, major: e.target.value })
                  }
                />
              </div>
              <div className="duration-class">
                <div>
                  <label htmlFor="">From</label>
                  <input
                    required
                    type="date"
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        durationFrom: e.target.value,
                      })
                    }
                    className="duration"
                  />
                </div>
                {!education.present && (
                  <div>
                    <label htmlFor="">To</label>
                    <input
                      required
                      type="date"
                      onChange={(e) =>
                        setEducation({
                          ...education,
                          durationTo: e.target.value,
                        })
                      }
                      className="duration"
                    />
                  </div>
                )}
                {!education.durationTo && (
                  <div>
                    <label htmlFor="">Present</label>
                    <input
                      required
                      onChange={(e) =>
                        setEducation({
                          ...education,
                          present: e.target.checked,
                        })
                      }
                      className="duration checkbox"
                      type="checkbox"
                    />
                  </div>
                )}
              </div>
              <label htmlFor="">{props.schoolLocation}</label>
              <input
                required
                type="text"
                onChange={(e) =>
                  setEducation({
                    ...education,
                    schoolLocation: e.target.value,
                  })
                }
              />
              <label htmlFor="">Description</label>
              <br></br>
              <textarea
                onChange={(e) =>
                  setEducation({
                    ...education,
                    description: e.target.value,
                  })
                }
                id="exp-text"
                name="exp-tex"
                rows="4"
                cols="50"
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <NormalButton
            className="modal-button"
            id="exp-add-button"
            title="Save"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
