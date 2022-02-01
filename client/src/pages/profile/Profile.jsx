import React, { useEffect } from "react";
import "./profile.css";
import Layout from "../../layout/Layout";
import Basic from "../../components/profile/left-side/basic/Basic";
import Educations from "../../components/profile/left-side/educations/Educations";
import Experiences from "../../components/profile/left-side/experiences/Experiences";
// import Language from '../../components/profile/right-side/language/Language'
// import Adsimg from '../../components/profile/right-side/adsimg/Adsimg'
// import Pav from '../../components/profile/right-side/pav/Pav'
import Pymk from "../../components/profile/right-side/pymk/Pymk";
import { Navigate } from "react-router";
// import Adsvideo from '../../components/profile/right-side/adsvideo/Adsvideo'
import { useSelector } from "react-redux";

export default function Profile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      Navigate("/login");
    }
  }, [userInfo]);

  return (
    <Layout showProfileIcon={true}>
      <div className="profile-page-cards">
        <div className="card-left-side">
          <div className="profile-basic-card">
            <Basic />
          </div>
          <div className="profile-experience-card">
            <Experiences title="Experience" />
          </div>
          <div className="profile-education-card">
            <Educations title="Education" />
          </div>
        </div>
        <div className="card-right-side">
          <div className="profile-pymk-card">
            <Pymk />
          </div>
          {/* <div className="profile-language-card">
                        <Language />
                    </div>
                    <div className="profile-ads-img-card">
                        <Adsimg />
                    </div>
                    <div className="profile-pav-card">
                        <Pav />
                    </div>
                    <div className="profile-ads-video-card">
                        <Adsvideo />
                    </div> */}
        </div>
      </div>
    </Layout>
  );
}
