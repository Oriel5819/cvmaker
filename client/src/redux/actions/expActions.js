import api from "../../api";
import {
  EXPERIENCES_REQUEST,
  EXPERIENCES_SUCCESS,
  EXPERIENCES_FAIL,
  EXPERIENCES_CREATE_REQUEST,
  EXPERIENCES_CREATE_SUCCESS,
  EXPERIENCES_CREATE_FAIL,
  EXPERIENCES_UPDATE_REQUEST,
  EXPERIENCES_UPDATE_SUCCESS,
  EXPERIENCES_UPDATE_FAIL,
  EXPERIENCES_DELETE_REQUEST,
  EXPERIENCES_DELETE_SUCCESS,
  EXPERIENCES_DELETE_FAIL,
} from "../contants/expConstants";

export const fetchExperiences = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPERIENCES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    // console.log(userInfo._id);

    const { data } = await api.get(`/exps/user/${id}`, config);

    // console.log("FETCHING EXPS", data);

    dispatch({ type: EXPERIENCES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EXPERIENCES_FAIL,
      payload: message,
    });
  }
};

export const createExperience =
  (
    userId,
    jobPosition,
    companyLogo,
    companyName,
    contractTitle,
    durationFrom,
    durationTo,
    city,
    country,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPERIENCES_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.post(
        "/exps/create",
        {
          userId,
          jobPosition,
          companyLogo,
          companyName,
          contractTitle,
          durationFrom,
          durationTo,
          address: { city, country },
          description,
        },
        config
      );

      dispatch({ type: EXPERIENCES_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EXPERIENCES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateExperience =
  (
    id,
    jobPosition,
    companyName,
    contractTitle,
    durationFrom,
    durationTo,
    city,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPERIENCES_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.put(
        `/exps/${id}`,
        {
          jobPosition,
          companyName,
          contractTitle,
          durationFrom,
          durationTo,
          address: { city, country: "Madagascar" },
          description,
        },
        config
      );

      dispatch({ type: EXPERIENCES_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EXPERIENCES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.delete(`/exps/${id}`, config);

    dispatch({ type: EXPERIENCES_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EXPERIENCES_DELETE_FAIL,
      payload: message,
    });
  }
};
