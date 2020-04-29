import React from "react";
import { Board } from "./features/board/Board";
import { Controls } from "./features/controls/Controls";
import { Input } from "./features/input/Input";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
        <Controls />
        <Input />
      </header>
    </div>
  );
}

export default App;
