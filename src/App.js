import React from "react";
import HomePage from "./components/HomePage";
import NotePage from "./components/NotePage";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

function App() {
return (
  <div className="container-fluid">
    <Routes>
      <Route path="/" exact Component={HomePage}/>
      <Route path="/note/:noteId" Component={NotePage}/>
    </Routes>
  </div>
)
}

export default App;