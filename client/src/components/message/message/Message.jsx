import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./message.css";
import fake from "faker";
import MessageCard from "../messageCard/MessageCard";
import { HiSearch } from "react-icons/hi";
import SingleMessage from "../singlemessage/SingleMessage";
import { fetchFriends } from "../../../redux/actions/friendActions";
import default_profile_photo from "../../../assests/img/temp_profile_photo.jpg";

export default function Message() {
  const dispatch = useDispatch();
  const [visibleMoreItems, setVisibleMoreItems] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const showHideMessage = () => setVisibleMoreItems(!visibleMoreItems);

  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;

  const friendList = useSelector((state) => state.friendList);
  const { loading, error, friends } = friendList;

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  console.log(friends);

  return (
    <div>
      {friends && (
        <MessageCard
          logo={
            user?.profile?.avatar
              ? user?.profile?.avatar
              : default_profile_photo
          }
          title="Message"
          click={showHideMessage}
          display={visibleMoreItems ? "block" : "none"}
        >
          <div
            className="message-body"
            style={
              visibleMoreItems
                ? { height: "778px", position: "relative" }
                : { height: "0", position: "relative", top: "50px" }
            }
          >
            <div className="search-input">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Search messages"
                  onChange={(event) => {
                    setSearchItem(event.target.value);
                  }}
                />
                <HiSearch />
              </div>
            </div>
            <ul className="messages">
              {friends
                .filter((val) => {
                  if (searchItem === "") {
                    return val;
                  } else if (
                    val.firstName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase()) ||
                    val.lastName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return val;
                  } else {
                    return null;
                  }
                })
                ?.map((value, key) => {
                  return (
                    <li className="single-message" key={key}>
                      <SingleMessage
                        avatar={value.profile.avatar}
                        fname={value.firstName}
                        lname={value.lastName}
                        date={
                          fake.date.month().substring(0, 3) +
                          " " +
                          (2021 - Math.floor(Math.random() * 10))
                        }
                        text={fake.lorem.paragraph()}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </MessageCard>
      )}
    </div>
  );
}
