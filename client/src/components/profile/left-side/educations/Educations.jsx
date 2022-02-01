import React, { useState, useEffect } from "react";
import "./educations.css";
import { IoAdd } from "react-icons/io5";
import Education from "../education/Education";
import TitleCard from "../../../cards/titledCard/TitleCard";
import AddEducModal from "../../../modals/addModal/addEducModal/AddEducModal";
import { fetchEducations } from "../../../../redux/actions/educActions";
import default_company_photo from "../../../../assests/img/temp_company.jfif";
import { useParams } from "react-router-dom";
import api from "../../../../api/index";
import { useDispatch, useSelector } from "react-redux";
import Laoding from "../../../laoding/laoding";
import ErrorMessage from "../../../errorMessage/ErrorMessage";

export default function Educations() {
  const dispatch = useDispatch();

  const educList = useSelector((state) => state.educList);
  const { loading, educations, error } = educList;

  const educCreate = useSelector((state) => state.educCreate);
  const { success: succcessCreate } = educCreate;

  const educUpdate = useSelector((state) => state.educUpdate);
  const { success: succcessUpdate } = educUpdate;

  const educDelete = useSelector((state) => state.educDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: succcessDelete,
  } = educDelete;

  const MINIMIZE = 3;
  const MAXIMIZE = 5;

  const { id } = useParams();
  const [visibleMoreItems, setVisibleMoreItems] = useState(false);
  const [lastId, setLastId] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  /* Modal */
  const [openModal, setOpenModal] = useState(false);
  /* Modal */

  const showMore = async () => {
    setVisibleMoreItems(!visibleMoreItems);

    // visibleMoreItems
    //   ? setLastId(
    //       educations.length -
    //         (educations.length < MINIMIZE ? educations.length : MINIMIZE)
    //     )
    //   : setLastId(
    //       educations.length -
    //         (educations.length <= MINIMIZE ? educations.length : MAXIMIZE)
    //     );
  };

  useEffect(() => {
    if (!id) {
      dispatch(fetchEducations(userInfo._id));
    } else {
      dispatch(fetchEducations(id));
    }
  }, [dispatch, succcessCreate, succcessUpdate, succcessDelete, id]);

  //   console.log(educations);

  return (
    <div className="educ-wrap">
      <AddEducModal
        title="education"
        degree="Degree"
        schoolName="School name"
        schoolLocation="School location"
        description="Description"
        major="Major"
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeButton={() => setOpenModal(false)}
      />

      <TitleCard
        title="Educations"
        bottomButtonTitle={visibleMoreItems ? "Load less..." : "Load more..."}
        icon={!id && <IoAdd onClick={() => setOpenModal(true)} />}
        whenClicked={showMore}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Laoding size={30} />}
        {educations !== null &&
          educations
            ?.slice(
              visibleMoreItems
                ? educations.length -
                    (educations.length <= MINIMIZE
                      ? educations.length
                      : MAXIMIZE)
                : educations.length -
                    (educations.length <= MINIMIZE
                      ? educations.length
                      : MINIMIZE),
              educations.length
            )
            ?.reverse()
            ?.map((value, key) => {
              // console.log("EDUC "+ value.id, lastId, visibleMoreItems);

              // console.log("INITIAL WHEN MIN >>>>>>", user?.educations?.length - (user?.educations?.length <= MINIMIZE?
              //     user?.educations?.length :
              //     MINIMIZE))
              // console.log("INITIAL WHEN MAX >>>>>>>", (user?.educations?.length) - (user?.educations?.length <= MINIMIZE?
              //     user?.educations?.length :
              //     MINIMIZE))

              return (
                <Education
                  css={
                    key.toString() === lastId.toString()
                      ? { borderBottom: "none" }
                      : { borderBottom: "1px solid #EBEBEB" }
                  }
                  id={value._id}
                  key={key}
                  logo={value.schoolLogo || default_company_photo}
                  name={value.schoolName}
                  degree={value.degree}
                  major={value.major}
                  durationFrom={value.durationFrom}
                  durationTo={value.durationTo}
                />
              );
            })}
      </TitleCard>
    </div>
  );
}
