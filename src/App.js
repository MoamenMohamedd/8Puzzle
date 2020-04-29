import React from "react";
import { Board } from "./features/board/Board";
import { Controls } from "./features/controls/Controls";
import { Input } from "./features/input/Input";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="h1">8Puzzle</h1>
      <header className="App-header">
        <Input />
        <div className="App-left">
          <Board />
          <Controls />
        </div>
      </header>
    </div>
  );
}

export default App;
