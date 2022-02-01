import api from "../../api";
import {
  FETCHING_OTHERS_REQUEST,
  FETCHING_OTHERS_SUCCESS,
  FETCHING_OTHERS_FAIL,
} from "../contants/otherConstants";

export const fetchOthers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCHING_OTHERS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const friendsId = await (
      await api.get(`/friendship/` + userInfo._id, config)
    ).data;

    let _DATA = { id: userInfo._id, friendsId };

    const { data } = await api.post(`/users/others`, { _DATA }, config);

    dispatch({ type: FETCHING_OTHERS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: FETCHING_OTHERS_FAIL,
      payload: message,
    });
  }
};
