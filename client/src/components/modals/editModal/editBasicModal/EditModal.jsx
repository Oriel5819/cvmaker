import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import NormalButton from "../../../buttons/normalButton/NormalButton";
import "../../modal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../redux/actions/userActions";

export default function EditModal(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    jobPosition: "",
    companyName: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    setUser({
      firstName: props?.user?.firstName,
      lastName: props?.user?.lastName,
      gender: props?.user?.gender,
      companyName: props?.user?.company,
      jobPosition: props?.user?.position,
      city: props?.user?.location,
      country: props?.user?.country,
    });
  }, [props.userInfo._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        props.userInfo._id,
        user.firstName,
        user.lastName,
        user.gender,
        user.companyName,
        user.jobPosition,
        user.city,
        user.country
      )
    );

    await props.setOpenModal(false);
  };

  return (
    props.user && (
      <Modal
        show={props.openModal}
        onHide={props.closeButton}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>{"Edit " + props.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="modal-body">
            <div className="modal-body-contents">
              <div className="modal-body-name-wrap">
                <div>
                  <label htmlFor="">{props.firstName}</label>{" "}
                  <input
                    required
                    id="modal-edit-first-name"
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    value={user.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="">{props.lastName}</label>
                  <input
                    required
                    id="modal-edit-last-name"
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    value={user.lastName}
                  />{" "}
                </div>
                <div>
                  <label htmlFor="">{props.gender}</label>
                  <select
                    className="gender-select"
                    required
                    name="gender"
                    id="gender"
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                    value={user.gender}
                  >
                    <option value="undefined">Choose a gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="">{props.companyName}</label>{" "}
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, companyName: e.target.value })
                  }
                  value={user.companyName}
                />{" "}
              </div>
              <div>
                <label htmlFor="">{props.jobPosition}</label>{" "}
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, jobPosition: e.target.value })
                  }
                  value={user.jobPosition}
                />{" "}
              </div>
              <div>
                <label htmlFor="">{props.location}</label>{" "}
                <input
                  required
                  type="text"
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  value={user.city}
                />{" "}
              </div>
              <div>
                <label htmlFor="">{props.country}</label>{" "}
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, country: e.target.value })
                  }
                  value={user.country}
                />{" "}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <NormalButton
              className="modal-button"
              id="basic-edit-button"
              title="Save"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    )
  );
}
