import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  previous,
  next,
  reset,
  selectHaveNext,
  selectHavePrevious,
  selectCanReset,
} from "../board/boardSlice";
import styles from "./Controls.module.css";

export function Controls() {
  const haveNext = useSelector(selectHaveNext);
  const havePrevious = useSelector(selectHavePrevious);
  const canReset = useSelector(selectCanReset);
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      <button
        className={styles.button}
        aria-label="Previous"
        onClick={() => dispatch(previous())}
        disabled={!havePrevious}
      >
        Previous
      </button>
      <button
        className={styles.button}
        aria-label="Next"
        onClick={() => dispatch(next())}
        disabled={!haveNext}
      >
        Next
      </button>
      <button
        className={`${styles.button} ${styles.reset}`}
        aria-label="Reset"
        onClick={() => dispatch(reset())}
        disabled={!canReset}
      >
        Reset
      </button>
    </div>
  );
}
