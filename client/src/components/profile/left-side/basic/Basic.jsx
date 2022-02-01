import React from "react";
import "./basic.css";
import Position from "./position/Position";
import { useState, useEffect } from "react";
import { VscEdit } from "react-icons/vsc";
import PhotoModal from "../../../modals/photoModal/PhotoModal";
import EditModal from "../../../modals/editModal/editBasicModal/EditModal";
import { useParams } from "react-router-dom";
import default_profile_photo from "../../../../assests/img/temp_profile_photo.jpg";
import default_cover_photo from "../../../../assests/img/temp_cover_photo.jpg";
import default_company_photo from "../../../../assests/img/temp_company.jfif";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../../../redux/actions/userActions";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Laoding from "../../../laoding/laoding";

export default function Basic() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openAvatarPhotoModal, setAvatarPhotoModal] = useState(false);
  const [openCoverPhotoModal, setCoverPhotoModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentUser = useSelector((state) => state.userInfo);
  const { loading, error, user } = currentUser;

  const updatedUser = useSelector((state) => state.userUpdate);
  const {
    loading: userUpdateLoading,
    error: userUpdateError,
    success: userUpdateSuccess,
  } = updatedUser;

  useEffect(() => {
    if (!id) {
      dispatch(fetchUser(userInfo._id));
    } else {
      dispatch(fetchUser(id));
    }
  }, [dispatch, userInfo._id, userUpdateSuccess, id]);

  return (
    <div>
      <div style={{ width: "200px" }}></div>
      {!userUpdateLoading && loading && (
        <Laoding className="basic-loading" size={30} />
      )}
      {userUpdateLoading && <Laoding className="basic-loading" size={30} />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {userUpdateError && (
        <ErrorMessage variant="danger">{userUpdateError}</ErrorMessage>
      )}
      {user && (
        <div className="basic-wrap">
          <PhotoModal
            title="avatar"
            openModal={openAvatarPhotoModal}
            onRequestClose={() => {
              setAvatarPhotoModal(false);
            }}
            closeButton={() => setAvatarPhotoModal(false)}
            photo={user?.avatar ? user?.avatar : default_profile_photo}
          />

          <PhotoModal
            title="cover"
            openModal={openCoverPhotoModal}
            onRequestClose={() => {
              setCoverPhotoModal(false);
            }}
            closeButton={() => setCoverPhotoModal(false)}
            photo={user?.cover ? user?.cover : default_cover_photo}
          />

          <EditModal
            user={user}
            userInfo={userInfo}
            title="personal information"
            firstName={"First Name"}
            lastName={"Last Name"}
            gender={"Gender"}
            companyName={"Comapany Name"}
            jobPosition={"Position"}
            location={"City"}
            country={"Country"}
            openModal={openModal}
            closeButton={() => setOpenModal(false)}
            setOpenModal={setOpenModal}
          />

          <div className="profile-photos">
            <div className="profile-cover-photo">
              <img
                onClick={() => {
                  setCoverPhotoModal(true);
                }}
                src={user?.cover ? user?.cover : default_cover_photo}
                height={196}
                width={780}
                alt="cover-pht"
              />
            </div>
            <div className="profile-profile-photo">
              <img
                onClick={() => {
                  setAvatarPhotoModal(true);
                }}
                src={user?.avatar ? user?.avatar : default_profile_photo}
                alt="profile-pht"
                height={150}
                width={150}
              />
            </div>
            <div
              className="profile-edit-button"
              id="edit-button"
              style={{ height: "20px" }}
            >
              {!id && (
                <VscEdit
                  onClick={() => {
                    setOpenModal(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name-and-about">
              <div className="profile-about-left-side">
                {user?.firstName && user?.lastName ? (
                  <div id="name">{user?.firstName + " " + user?.lastName}</div>
                ) : (
                  <div id="name">{userInfo.email}</div>
                )}
                {user?.position && <div id="title">{user?.position}</div>}
                {user?.location && user?.country && (
                  <div id="location">
                    {user?.location + ", " + user?.country}
                  </div>
                )}
              </div>
              <div className="profile-all-position">
                {user?.company && (
                  <Position
                    logo={user?.companyLogo || default_company_photo}
                    currentCompany={user?.company}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
