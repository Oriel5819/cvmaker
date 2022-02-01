import { combineReducers } from "redux";
import {
  userFetchReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducer";
import {
  expReducer,
  expCreateReducer,
  expUpdateReducer,
  expDeleteReducer,
} from "./expReducer";
import {
  educCreateReducer,
  educDeleteReducer,
  educReducer,
  educUpdateReducer,
} from "./educReducer";
import {
  fetchFriendReducer,
  makeFriendReducer,
  unmakeFriendReducer,
} from "./friendReducer";
import { fetchOthersReducer } from "./otherReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userInfo: userFetchReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  expList: expReducer,
  expCreate: expCreateReducer,
  expUpdate: expUpdateReducer,
  expDelete: expDeleteReducer,
  educList: educReducer,
  educCreate: educCreateReducer,
  educUpdate: educUpdateReducer,
  educDelete: educDeleteReducer,
  friendList: fetchFriendReducer,
  addFriend: makeFriendReducer,
  unfriend: unmakeFriendReducer,
  otherList: fetchOthersReducer,
});

export default reducers;
