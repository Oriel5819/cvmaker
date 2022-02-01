import {
  FETCHING_OTHERS_REQUEST,
  FETCHING_OTHERS_SUCCESS,
  FETCHING_OTHERS_FAIL,
} from "../contants/otherConstants";

const initialState = { others: [] };

export const fetchOthersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_OTHERS_REQUEST:
      return { loading: true };
    case FETCHING_OTHERS_SUCCESS:
      return { loading: false, others: payload };
    case FETCHING_OTHERS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
