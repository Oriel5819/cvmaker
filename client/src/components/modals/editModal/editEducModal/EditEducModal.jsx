import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import NormalButton from "../../../buttons/normalButton/NormalButton";
import defaultSchoolLogo from "../../../../assests/img/temp_company.jfif";
import "../../../modals/modal.css";
import { useParams } from "react-router";
import api from "../../../../api/index";
import { useDispatch, useSelector } from "react-redux";
import {
  createEducation,
  deleteEducation,
} from "../../../../redux/actions/educActions";

export default function EditEducModal(props) {
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
  const educUpdate = useSelector((state) => state.educUpdate);
  const { loading: updateLoading, error: updateError } = educUpdate;
  const educDelete = useSelector((state) => state.educDelete);
  const { loading: deleteLoading, error: deleteError } = educDelete;

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await api.get(`/educs/${props.id}`, config);

      setEducation({
        ...education,
        degree: data.degree,
        schoolName: data.schoolName,
        major: data.major,
        durationFrom: data.durationFrom,
        durationTo: data.durationTo,
        schoolLocation: data.address.city,
        description: data.description,
      });
    };
    fetching();
  }, [props.id]);

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

    !updateLoading && (await props.setOpenModal(false));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteEducation(props.id));
      !deleteLoading && (await props.setOpenModal(false));
    }
  };

  return (
    <Modal
      className={"modal educ-modal"}
      id={"educ-modal-add"}
      show={props.openModal}
      onHide={props.closeButton}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title>{"Editing " + props.title}</Modal.Title>
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
                  value={education.degree}
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
                  value={education.schoolName}
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
                  value={education.major}
                />
              </div>
              <div className="duration-class">
                <div>
                  <label htmlFor="">From</label>
                  <input
                    required
                    className="duration"
                    type="date"
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        durationFrom: e.target.value,
                      })
                    }
                    value={education.durationFrom}
                  />
                </div>
                {!education.present && (
                  <div>
                    <label htmlFor="">To</label>
                    <input
                      className="duration"
                      required
                      type="date"
                      onChange={(e) =>
                        setEducation({
                          ...education,
                          durationTo: e.target.value,
                        })
                      }
                      value={education.durationTo}
                    />
                  </div>
                )}
                {!education.durationTo && (
                  <div>
                    <label htmlFor="">Present</label>
                    <input
                      required
                      className="duration checkbox"
                      type="checkbox"
                      onChange={(e) =>
                        setEducation({
                          ...education,
                          present: e.target.checked,
                          durationTo: "present",
                        })
                      }
                      value={education.present}
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
                value={education.schoolLocation}
              />
              <label htmlFor="">Description</label>
              <br></br>
              <textarea
                id="educ-text"
                name="educ-text"
                rows="4"
                cols="50"
                onChange={(e) =>
                  setEducation({
                    ...education,
                    description: e.target.value,
                  })
                }
                value={education.description}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <NormalButton
            whenClicked={handleDelete}
            id="educ-delete-button"
            title="Delete"
          />
          <NormalButton
            whenClicked={handleSubmit}
            id="educ-add-button"
            title="Update"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
