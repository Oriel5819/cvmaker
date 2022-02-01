import api from "../../api";
import {
  FETCHING_FRIENDS_REQUEST,
  FETCHING_FRIENDS_SUCCESS,
  FETCHING_FRIENDS_FAIL,
  MAKE_FRIEND_REQUEST,
  MAKE_FRIEND_SUCCESS,
  MAKE_FRIEND_FAIL,
  UNFRIEND_REQUEST,
  UNFRIEND_SUCCESS,
  UNFRIEND_FAIL,
} from "../contants/friendConstants";

export const fetchFriends = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCHING_FRIENDS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const friendsId = await (
      await api.get(`/friendship/` + userInfo._id, config)
    ).data;

    const { data } = await api.post(`/users/friends`, { friendsId }, config);

    dispatch({ type: FETCHING_FRIENDS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: FETCHING_FRIENDS_FAIL,
      payload: message,
    });
  }
};

export const makeFriend = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MAKE_FRIEND_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await api.post(`/friendship/${id}`, {
      firstUserId: userInfo._id,
      secondUserId: id,
      requested: true,
      confirmed: false,
    });

    dispatch({ type: MAKE_FRIEND_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: MAKE_FRIEND_FAIL,
      payload: message,
    });
  }
};

export const unmakeFriend = (id) => async (dispatch, getState) => {};
