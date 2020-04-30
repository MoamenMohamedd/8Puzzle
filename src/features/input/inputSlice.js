import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  algorithm: "", // [bfs,dfs,ast]
  boardSize: 3,
  arrangement: [],
  goal: [],
  heuristic: null,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    runStarted: (state, action) => {
      state.algorithm = action.payload.algorithm;
      state.boardSize = action.payload.boardSize;
      state.arrangement = action.payload.input;
      state.goal = action.payload.goal;
      state.heuristic = action.payload.heuristic;
    },
  },
});

export const selectInput = (state) => state.input.arrangement;

export const selectBoardSize = (state) => state.input.boardSize;

export const selectAlgorithm = (state) => state.input.algorithm;

export const selectGoal = (state) => state.input.goal;

export const selectHeuristic = (state) => state.input.heuristic;

export const { runStarted } = inputSlice.actions;

export default inputSlice.reducer;
