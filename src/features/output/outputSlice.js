import { createSlice } from "@reduxjs/toolkit";
import { runFinished } from "../board/boardSlice";

const initialState = {
  numExpanded: 0,
  runningTime: 0,
  searchDepth: 0,
  searchCost: 0,
};

export const outputSlice = createSlice({
  name: "output",
  initialState,
  reducers: {},
  extraReducers: {
    [runFinished]: (state, action) => {
      state.numExpanded = action.payload.numExpanded;
      state.runningTime = action.payload.runningTime;
      state.searchDepth = action.payload.searchDepth;
      state.searchCost = action.payload.searchCost;
    },
  },
});

export const selectNumExpanded = (state) => state.output.numExpanded;

export const selectRunningTime = (state) => state.output.runningTime;

export const selectSearchDepth = (state) => state.output.searchDepth;

export const selectSearchCost = (state) => state.output.searchCost;

export default outputSlice.reducer;
