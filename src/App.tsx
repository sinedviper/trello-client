import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Board, Home } from "./pages";

function App() {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          padding: "50px 0 0",
          fontSize: "50px",
          fontWeight: "300",
          color: "var(--green)",
        }}
      >
        Trello
      </h1>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/board/:boardId' element={<Board />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
