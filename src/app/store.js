import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
//import createFilter from "redux-persist-transform-filter";

//slices
import questionSlice from "../features/questionSlice";
import resultSlice from "../features/resultSlice";

//saveUserOnlyFilter
//const saveUserOnlyFilter = createFilter("user", ["user"]);

//persist config
const persistConfig = {
  key: "quiz",
  storage,
};

const rootReducer = combineReducers({
  questionsData: questionSlice,
  results: resultSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
