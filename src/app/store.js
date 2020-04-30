import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import inputReducer from "../features/input/inputSlice";
import outputReducer from "../features/output/outputSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    board: boardReducer,
    input: inputReducer,
    output: outputReducer,
  },
  enhancers: [applyMiddleware(logger)],
});
