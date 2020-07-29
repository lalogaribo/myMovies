import React from "react";
import "./App.css";

import Movies from "./components/movies/movies";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Movies />
      </main>
    </>
  );
}

export default App;
