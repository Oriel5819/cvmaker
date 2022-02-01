import api from "../../api";
import {
  EDUCATIONS_REQUEST,
  EDUCATIONS_SUCCESS,
  EDUCATIONS_FAIL,
  EDUCATIONS_CREATE_REQUEST,
  EDUCATIONS_CREATE_SUCCESS,
  EDUCATIONS_CREATE_FAIL,
  EDUCATIONS_UPDATE_REQUEST,
  EDUCATIONS_UPDATE_SUCCESS,
  EDUCATIONS_UPDATE_FAIL,
  EDUCATIONS_DELETE_REQUEST,
  EDUCATIONS_DELETE_SUCCESS,
  EDUCATIONS_DELETE_FAIL,
} from "../contants/educConstants";

export const fetchEducations = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDUCATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    // console.log(userInfo._id);

    const { data } = await api.get(`/educs/user/${id}`, config);

    // console.log("FETCHING EDUCS", data);

    dispatch({ type: EDUCATIONS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EDUCATIONS_FAIL,
      payload: message,
    });
  }
};

export const createEducation =
  (
    userId,
    degree,
    schoolLogo,
    schoolName,
    major,
    durationFrom,
    durationTo,
    city,
    country,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDUCATIONS_CREATE_REQUEST });

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
        "/educs/create",
        {
          userId,
          degree,
          schoolLogo,
          schoolName,
          major,
          durationFrom,
          durationTo,
          address: { city, country },
          description,
        },
        config
      );

      dispatch({ type: EDUCATIONS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EDUCATIONS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateExperience =
  (
    id,
    degree,
    schoolName,
    major,
    durationFrom,
    durationTo,
    city,
    country,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDUCATIONS_UPDATE_REQUEST });

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
        `/educs/${id}`,
        {
          degree,
          schoolName,
          major,
          durationFrom,
          durationTo,
          address: { city, country },
          description,
        },
        config
      );

      dispatch({ type: EDUCATIONS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EDUCATIONS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDUCATIONS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.delete(`/educs/${id}`, config);

    dispatch({ type: EDUCATIONS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EDUCATIONS_DELETE_FAIL,
      payload: message,
    });
  }
};
