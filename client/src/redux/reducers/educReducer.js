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

const initialState = {
  educations: [],
};

export const educReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDUCATIONS_REQUEST:
      return { loading: true };
    case EDUCATIONS_SUCCESS:
      return { loading: false, educations: payload };
    case EDUCATIONS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const educCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EDUCATIONS_CREATE_REQUEST:
      return { loading: true };
    case EDUCATIONS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case EDUCATIONS_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const educUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EDUCATIONS_UPDATE_REQUEST:
      return { loading: true };
    case EDUCATIONS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EDUCATIONS_UPDATE_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};

export const educDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EDUCATIONS_DELETE_REQUEST:
      return { loading: true };
    case EDUCATIONS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EDUCATIONS_DELETE_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};
