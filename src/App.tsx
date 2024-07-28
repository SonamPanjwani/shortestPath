import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Infobox from "./Components/Infobox";
import Grid from "./Components/Grid";
//import GridOne from "./Components/GridOne";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <div className="flex gap-10">
          <Sidebar />
          <span className="mt-10">
            <Infobox />
            <Grid />
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
