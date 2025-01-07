import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets/images/ecom.svg";
import "./assets/styles/App.css";

import NavbarHook from "./components/navbarhook/NavBarHook.js";
import Home from "./layouts/home/Home.js";
import Phones from "./layouts/phones/Phones.js";
import Audio from "./layouts/audio/Audio.js";
import Wearables from "./layouts/wearables/Wearables.js";
import Accessories from "./layouts/accessories/Accessories.js";
import Tablets from "./layouts/tablets/Tablets.js";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <NavbarHook />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/wearables" element={<Wearables />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/tablets" element={<Tablets />} />
          {/* Define other routes that you need*/}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
