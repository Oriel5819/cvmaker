import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import "./home.css";
import api from "../../api/index";

export default function Index(history) {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  // const [items, setItems] = useState([]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [history]);

  useEffect(() => {
    async function fetchExperiences() {
      const exps = await api.get(`/exps`);
      setExperiences(exps.data);
    }
    fetchExperiences();
  }, []);

  useEffect(() => {
    async function fetchEducations() {
      const educs = await api.get(`/educs`);
      setEducations(educs.data);
    }
    fetchEducations();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const allUsers = await api.get(`/users`);
      setUsers(allUsers.data);
    }
    fetchUsers();
  }, []);

  // console.log('ITEM ', searchItem);
  // console.log('USERS ', users);
  // console.log('EXPS ', experiences);
  // console.log('EDUCS ', educations);
  // console.log('ITEMS ', items);

  return (
    <Layout
      eventForOnChanged={(event) => {
        setSearchItem(event.target.value);
      }}
    >
      {/* <Link to={"/sign-up"}><Button className='create-user-button'>+</Button></Link> */}

      <div className="users-collections">
        {users.slice(0, 10).map((user, key) => {
          if (
            searchItem === "" ||
            user.firstName.toLowerCase().includes(searchItem.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchItem.toLowerCase()) ||
            user.profile.company.jobPosition
              .toLowerCase()
              .includes(searchItem.toLowerCase())
          ) {
            return (
              <div key={key} className="home-personal-card">
                <Link to={"/users/" + user._id} className="link">
                  <div className="left">
                    <img
                      src={user.profile.avatar}
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
