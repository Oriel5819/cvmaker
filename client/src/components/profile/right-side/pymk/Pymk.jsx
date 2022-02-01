import React, { useState, useEffect } from "react";
import TitleCard from "../../../cards/titledCard/TitleCard";
import PersonalCard from "../../../cards//personalCard/PersonalCard";
import "./pymk.css";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import Laoding from "../../../laoding/laoding";
import { fetchOthers } from "../../../../redux/actions/otherActions";

export default function Pymk() {
  const dispatch = useDispatch();
  const [visibleMoreItems, setVisibleMoreItems] = useState(false);
  const otherList = useSelector((state) => state.otherList);
  const {
    loading: otherListLoading,
    error: otherListError,
    others,
  } = otherList;
  const request = useSelector((state) => state.addFriend);
  const {
    loading: requestLoading,
    success: requestSuccess,
    error: requestError,
  } = request;
  const showMore = () => setVisibleMoreItems(!visibleMoreItems);
  var initial = 0;

  useEffect(() => {
    dispatch(fetchOthers());
  }, [requestSuccess]);

  return (
    <div className="right-side-card pymk-card">
      <div className="pymk-wrap">
        {requestError && (
          <ErrorMessage variant="danger">{requestError}</ErrorMessage>
        )}

        {requestLoading && <Laoding size={30} />}

        <TitleCard
          title="People you may know"
          bottomButtonTitle={visibleMoreItems ? "Load less..." : "Load more..."}
          whenClicked={showMore}
        >
          {otherListError && (
            <ErrorMessage variant="danger">{otherListError}</ErrorMessage>
          )}
          {otherListLoading && <Laoding size={30} />}
          {others
            ?.slice(initial, !visibleMoreItems ? initial + 5 : initial + 9)
            ?.map((value, key) => {
              return (
                <div key={key}>
                  <PersonalCard
                    linkToUserProfile={"/users/" + value._id}
                    id={value._id}
                    avatar={value?.profile?.avatar}
                    firstName={value?.firstName}
                    lastName={value?.lastName}
                    company={value?.profile?.company?.companyName}
                    jobTitle={value?.profile?.company?.jobPosition}
                  />
                </div>
              );
            })}
        </TitleCard>
      </div>
    </div>
  );
}
