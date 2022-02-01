import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import "./home.css";
import api from "../../api/index";
import default_avatar from "../../assests/img/temp_profile_photo.jpg";
import default_cover from "../../assests/img/temp_cover_photo.jpg";
import { useSelector } from "react-redux";

export default function Index(history) {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  // const [items, setItems] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [history, userInfo]);

  useEffect(() => {
    async function fetchExperiences() {
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const exps = await api.get(`/exps`, config);
      setExperiences(exps.data);
    }
    fetchExperiences();
  }, []);

  useEffect(() => {
    async function fetchEducations() {
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const educs = await api.get(`/educs`, config);
      setEducations(educs.data);
    }
    fetchEducations();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const allUsers = await api.get(`/users`, config);
      setUsers(allUsers.data);
    }
    fetchUsers();
  }, []);

  // console.log("ITEM ", searchItem);
  // console.log("USERS ", users);
  // console.log("EXPS ", experiences);
  // console.log("EDUCS ", educations);
  // console.log("ITEMS ", items);

  // console.log(userInfo);

  return (
    <Layout
      showSearchBar={true}
      showProfileIcon={true}
      eventForOnChanged={(event) => {
        setSearchItem(event.target.value);
      }}
    >
      {/* <Link to={"/sign-up"}><Button className='create-user-button'>+</Button></Link> */}

      <div className="users-collections">
        {users.map((user, key) => {
          if (
            userInfo?._id !== user?._id &&
            (searchItem === "" ||
              user?.firstName
                ?.toLowerCase()
                .includes(searchItem.toLowerCase()) ||
              user?.lastName
                ?.toLowerCase()
                .includes(searchItem.toLowerCase()) ||
              user?.email?.toLowerCase().includes(searchItem.toLowerCase()) ||
              user?.profile?.company?.jobPosition
                .toLowerCase()
                .includes(searchItem.toLowerCase()))
          ) {
            return (
              <div key={key} className="home-personal-card">
                <Link to={"/users/" + user._id} className="link">
                  <div className="left">
                    <img
                      src={
                        user?.profile?.avatar
                          ? user?.profile?.avatar
                          : default_avatar
                      }
                      alt="avatar"
                      height={40}
                      width={40}
                      style={{
                        borderRadius: "50%",
                        marginTop: "10px",
                        marginBottom: "10px",
                        border: "1px solid grey",
                      }}
                    />
                  </div>
                  <div className="middle">
                    <div className="name">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="contact">{user.contact}</div>
                    <div className="email">{user.email}</div>
                  </div>
                  {/* <div className='right'>
                                    <div className='company-name'>{user.profile.company.companyName}</div>
                                    <div className='job-position'>{user.profile.company.jobPosition}</div>
                                </div> */}
                </Link>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Layout>
  );
}
