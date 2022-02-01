import fake from "faker";
import livedb from "../../../api/index";
import React, { useState, useEffect } from "react";
import TitleCard from "../../../cards/titledCard/TitleCard";
import PersonalCard from "../personalCard/PersonalCard";

function Class() {
  let n = Math.floor(Math.random() * 4 + 1);

  switch (n) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    default:
      return 0;
  }
}

export default function Pav() {
  const [visibleMoreItems, setVisibleMoreItems] = useState(false);
  const [lastIndex, setLastIndex] = useState(2);
  const [user, setUser] = useState({});

  const showMore = () => {
    setVisibleMoreItems(!visibleMoreItems);
    visibleMoreItems ? setLastIndex(2) : setLastIndex(4);
  };

  useEffect(async () => {
    const response = await livedb.get(`/users/1`);
    setUser(response.data);
  }, []);

  return (
    <div className="right-side-card pav-card">
      <TitleCard
        title="People also viewed"
        bottomButtonTitle={visibleMoreItems ? "Load more..." : "Load less..."}
        whenClicked={showMore}
      >
        {[..."123456789"].slice(0, visibleMoreItems ? 9 : 5).map((index) => {
          return (
            <PersonalCard
              key={index}
              avatar={fake.random.image()}
              fname={fake.name.firstName()}
              lname={fake.name.lastName()}
              class={Class()}
              jobtitle={fake.name.jobTitle()}
              company={fake.company.companyName()}
            />
          );
        })}
      </TitleCard>
    </div>
  );
}
