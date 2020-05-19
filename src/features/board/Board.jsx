import React from "react";
import { useSelector } from "react-redux";
import { selectArrangement } from "./boardSlice";
import { selectBoardSize } from "../input/inputSlice";
import styles from "./Board.module.css";

export function Board() {
  const arrangement = useSelector(selectArrangement);
  const boardSize = useSelector(selectBoardSize);
  const itemSize = 100;

  return (
    <div
      className={styles["board"]}
      style={{
        width: boardSize * itemSize,
        height: boardSize * itemSize,
        gridTemplateColumns: "auto ".repeat(boardSize),
      }}
    >
      {boardItems(arrangement, itemSize, boardSize)}
    </div>
  );
}

function boardItems(arrangement, itemSize, boardSize) {
  if (arrangement.length !== 0)
    return arrangement.map((item, i) => (
      <div
        className={styles["board-item"]}
        style={{ width: itemSize, height: itemSize }}
        key={i}
      >
        {item === "0" ? "" : item}
      </div>
    ));

  let items = [];
  for (let i = 0; i < Math.pow(boardSize, 2); i++) {
    items.push(
      <div
        className={styles["board-item"]}
        style={{ width: itemSize, height: itemSize }}
        key={i}
      >
        {" "}
      </div>
    );
  }

  return items;
}
