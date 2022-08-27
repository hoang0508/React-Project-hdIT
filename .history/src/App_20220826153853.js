import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <div>Test links</div>
      <div>
        <button>
          <Link to="/users">User Link</Link>
        </button>
        <button>
          <Link to="/admin">Admin Link</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
