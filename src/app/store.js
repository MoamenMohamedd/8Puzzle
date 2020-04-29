import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import inputReducer from "../features/input/inputSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    board: boardReducer,
    input: inputReducer,
  },
  enhancers: [applyMiddleware(logger)],
});
