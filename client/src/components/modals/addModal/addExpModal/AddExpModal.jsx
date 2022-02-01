import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import NormalButton from "../../../buttons/normalButton/NormalButton";
import "../../../modals/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { createExperience } from "../../../../redux/actions/expActions";
import defaultCompanyLogo from "../../../../assests/img/temp_company.jfif";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Laoding from "../../../laoding/laoding";

export default function AddExpModal(props) {
  const [experience, setExperience] = useState({
    jobPosition: "",
    companyLogo: defaultCompanyLogo,
    companyName: "",
    contractTitle: "",
    durationFrom: "",
    durationTo: "",
    companyLocation: "",
    country: "Madagascar",
    description: "",
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const expCreate = useSelector((state) => state.expCreate);
  const { loading, error } = expCreate;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createExperience(
        userInfo._id,
        experience.jobPosition,
        experience.companyLogo,
        experience.companyName,
        experience.contractTitle,
        experience.durationFrom,
        experience.durationTo,
        experience.companyLocation,
        experience.country,
        experience.description
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
        {loading && <Laoding size={30} />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                />
              </div>
              <div className="duration-class">
                <div>
                  <label htmlFor="">From</label>
                  <input
                    required
                    type="date"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        durationFrom: e.target.value,
                      })
                    }
                    className="duration"
                  />
                </div>
                {!experience.present && (
                  <div>
                    <label htmlFor="">To</label>
                    <input
                      required
                      type="date"
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          durationTo: e.target.value,
                        })
                      }
                      className="duration"
                    />
                  </div>
                )}
                {/* {console.log(experience.durationTo)} */}
                {(!experience.durationTo ||
                  experience.durationTo === "present") && (
                  <div>
                    <label htmlFor="">Present</label>
                    <input
                      type="checkbox"
                      required
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          present: e.target.checked,
                          durationTo: "present",
                        })
                      }
                      className="duration checkbox"
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
              />
              <label htmlFor="">Description</label>
              <br></br>
              <textarea
                onChange={(e) =>
                  setExperience({
                    ...experience,
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
