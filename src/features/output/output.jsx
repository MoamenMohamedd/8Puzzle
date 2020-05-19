import React from "react";
import { useSelector } from "react-redux";
import {
  selectNumExpanded,
  selectSearchCost,
  selectSearchDepth,
  selectRunningTime,
} from "./outputSlice";
import styles from "./Output.module.css";

export function Output() {
  const numExpanded = useSelector(selectNumExpanded);
  const searchCost = useSelector(selectSearchCost);
  const searchDepth = useSelector(selectSearchDepth);
  const runnningTime = useSelector(selectRunningTime);

  return (
    <div className={styles.output}>
      <div>
        <label className={styles.label}>Number of expanded</label>
        <h3 className={styles.h3}>{numExpanded}</h3>
      </div>
      <div>
        <label className={styles.label}>Search cost</label>
        <h3 className={styles.h3}>{searchCost}</h3>
      </div>
      <div>
        <label className={styles.label}>Search depth</label>
        <h3 className={styles.h3}>{searchDepth}</h3>
      </div>
      <div>
        <label className={styles.label}>Running time</label>
        <h3 className={styles.h3}>{runnningTime} ms</h3>
      </div>
    </div>
  );
}
