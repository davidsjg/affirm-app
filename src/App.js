import React from "react";
import HomePage from "./components/HomePage";
import NotePage from "./components/NotePage";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Header from './components/Header';

function App() {
return (
  <div className="container-fluid">
    <Header/>
    <Routes>
      <Route path="/" exact Component={HomePage}/>
      <Route path="/note/:noteId" Component={NotePage}/>
    </Routes>
  </div>
)
}

export default App;