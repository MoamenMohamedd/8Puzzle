import React from "react";
import { Board } from "./features/board/Board";
import { Controls } from "./features/controls/Controls";
import { Input } from "./features/input/Input";
import { Output } from "./features/output/output";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input />
        <div className="App-left">
          <h1 className="h1">8Puzzle</h1>
          <Board />
          <Controls />
        </div>
        <Output />
      </header>
    </div>
  );
}

export default App;
