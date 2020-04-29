import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  algorithm: "", // [bfs,dfs,ast]
  boardSize: 3,
  arrangement: [],
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    runStarted: (state, action) => {
      state.algorithm = action.payload.algorithm;
      state.boardSize = action.payload.boardSize;
      state.arrangement = action.payload.input;
    },
  },
});

export const selectInput = (state) => state.input.arrangement;

export const selectBoardSize = (state) => state.input.boardSize;

export const selectAlgorithm = (state) => state.input.algorithm;

export const { runStarted } = inputSlice.actions;

export default inputSlice.reducer;
