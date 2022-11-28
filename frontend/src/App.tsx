import "./App.css";
import Camara from "./components/Camara";
import Home from "./components/Home";
import Spotify from "./components/Spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  const [emotions, setEmotions] = React.useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camara setEmotion={setEmotions} />} />
        <Route path="/spotify" element={<Spotify emotion={emotions} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
