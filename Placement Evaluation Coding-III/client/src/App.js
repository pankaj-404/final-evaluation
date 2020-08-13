import React from "react";
import "./App.css";
import Routes from "./components/Routes";

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Routes {...props} />
    </div>
  );
}

export default App;
