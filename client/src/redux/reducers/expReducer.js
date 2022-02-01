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

const initialState = {
  experiences: [],
};

export const expReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EXPERIENCES_REQUEST:
      return { loading: true };
    case EXPERIENCES_SUCCESS:
      return { loading: false, experiences: payload };
    case EXPERIENCES_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const expCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPERIENCES_CREATE_REQUEST:
      return { loading: true };
    case EXPERIENCES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCES_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const expUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPERIENCES_UPDATE_REQUEST:
      return { loading: true };
    case EXPERIENCES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCES_UPDATE_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};

export const expDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EXPERIENCES_DELETE_REQUEST:
      return { loading: true };
    case EXPERIENCES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCES_DELETE_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};
