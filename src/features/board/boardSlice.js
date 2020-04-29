import { createSlice } from "@reduxjs/toolkit";
import { runStarted } from "../input/inputSlice";

const initialState = {
  present: {
    arrangement: [],
    spaceRow: -1,
    spaceCol: -1,
  },
  past: [],
  future: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    next: (state) => {
      state.past.push(state.present);
      state.present = state.future.pop();
    },
    previous: (state) => {
      state.future.push(state.present);
      state.present = state.past.pop();
    },
    reset: (state) => {
      let top = state.past.pop();
      while (top) {
        state.future.push(state.present);
        state.present = top;
        top = state.past.pop();
      }
    },

    runFinished: (state, action) => {
      state.future = action.payload.steps;
    },
  },
  extraReducers: {
    [runStarted]: (state, action) => {
      state.past = [];
      state.future = [];

      state.present.arrangement = action.payload.input;
      const n = Number(action.payload.boardSize);
      const indexOfZero = action.payload.input.indexOf("0");

      state.present.spaceRow = indexOfZero / n;
      state.present.spaceCol = indexOfZero % n;
    },
  },
});

export const selectArrangement = (state) => state.board.present.arrangement;

export const selectHaveNext = (state) => state.board.future.length > 0;

export const selectHavePrevious = (state) => state.board.past.length > 0;

export const selectCanReset = (state) => state.board.past.length !== 0;

export const { next, previous, reset, runFinished } = boardSlice.actions;

export default boardSlice.reducer;
