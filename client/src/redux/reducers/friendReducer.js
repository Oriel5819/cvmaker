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

const initialState = {
  friendsId: [],
};

export const fetchFriendReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_FRIENDS_REQUEST:
      return { loading: true };
    case FETCHING_FRIENDS_SUCCESS:
      return { loading: false, friends: payload };
    case FETCHING_FRIENDS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const makeFriendReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case MAKE_FRIEND_REQUEST:
      return { loading: true };
    case MAKE_FRIEND_SUCCESS:
      return { loading: false, success: true };
    case MAKE_FRIEND_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const unmakeFriendReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UNFRIEND_REQUEST:
      return { loading: true };
    case UNFRIEND_SUCCESS:
      return { loading: false, success: true };
    case UNFRIEND_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};
