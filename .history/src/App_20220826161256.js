import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content"></div>
      </div>
    </div>
  );
}

export default App;
