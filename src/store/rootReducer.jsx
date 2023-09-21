import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import authSlice from "./slices/auth.slice"
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  //   mail: mailReducer,
  auth: authSlice
});

export default rootReducer;
