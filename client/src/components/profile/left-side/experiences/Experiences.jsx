import React, { useState, useEffect } from "react";
import "./experiences.css";
import Experience from "../experience/Experience";
import { IoAdd } from "react-icons/io5";
import TitleCard from "../../../cards/titledCard/TitleCard";
import AddExpModal from "../../../modals/addModal/addExpModal/AddExpModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences } from "../../../../redux/actions/expActions";
import Laoding from "../../../laoding/laoding";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import { useParams } from "react-router";

export default function Experiences() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expList = useSelector((state) => state.expList);
  const { loading, experiences, error } = expList;

  const expCreate = useSelector((state) => state.expCreate);
  const { success: succcessCreate } = expCreate;

  const expUpdate = useSelector((state) => state.expUpdate);
  const { success: succcessUpdate } = expUpdate;

  const expDelete = useSelector((state) => state.expDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: succcessDelete,
  } = expDelete;

  const MINIMIZE = 3;
  const MAXIMIZE = 5;

  const [visibleMoreItems, setVisibleMoreItems] = useState(false);
  const [lastId, setLastId] = useState(0);

  /* Modal */
  const [openModal, setOpenModal] = useState(false);
  /* Modal */

  const showMore = async () => {
    setVisibleMoreItems(!visibleMoreItems);

    // visibleMoreItems
    //   ? setLastId(
    //       experiences.length -
    //         (experiences.length < MINIMIZE ? experiences.length : MINIMIZE)
    //     )
    //   : setLastId(
    //       experiences.length -
    //         (experiences.length <= MINIMIZE ? experiences.length : MAXIMIZE)
    //     );
  };

  useEffect(() => {
    if (!id) {
      dispatch(fetchExperiences(userInfo._id));
    } else {
      dispatch(fetchExperiences(id));
    }

    // after loading or reloading
    // return setLastId(
    //   !visibleMoreItems
    //     ? experiences.length -
    //         (experiences.length < MINIMIZE ? experiences.length : MINIMIZE)
    //     : experiences.length -
    //         (experiences.length < MINIMIZE
    //           ? experiences.length
    //           : experiences.length <= MINIMIZE
    //           ? MINIMIZE
    //           : MAXIMIZE)
    // );
  }, [dispatch, succcessCreate, succcessUpdate, succcessDelete, id]);

  return (
    <div className="exp-wrap">
      <AddExpModal
        title="experience"
        position="Title"
        companyName="Company name"
        companyLocation="Company location"
        contract="Contract"
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeButton={() => setOpenModal(false)}
      />

      <TitleCard
        title="Experiences"
        bottomButtonTitle={visibleMoreItems ? "Load less..." : "Load more..."}
        icon={!id && <IoAdd onClick={() => setOpenModal(true)} />}
        whenClicked={showMore}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Laoding size={30} />}
        {experiences !== null &&
          experiences
            ?.slice(
              visibleMoreItems
                ? // How many do we want to show

                  experiences.length -
                    (experiences.length <= MINIMIZE
                      ? experiences.length
                      : MAXIMIZE)
                : experiences.length -
                    (experiences.length <= MINIMIZE
                      ? experiences.length
                      : MINIMIZE),
              experiences.length
            )
            ?.reverse()
            ?.map((value, key) => {
              return (
                <Experience
                  css={
                    key.toString() === lastId.toString()
                      ? { borderBottom: "none" }
                      : { borderBottom: "1px solid #EBEBEB" }
                  }
                  id={value._id}
                  key={key}
                  logo={value.companyLogo}
                  jobPosition={value.jobPosition}
                  companyName={value.companyName}
                  contratTitle={value.contractTitle}
                  durationFrom={value.durationFrom}
                  durationTo={value.durationTo}
                  location={value.address.city}
                  country={value.address.country}
                  description={value.description}
                />
              );
            })}
      </TitleCard>
    </div>
  );
}
