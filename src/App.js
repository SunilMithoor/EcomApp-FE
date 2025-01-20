import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "./layouts/home/Home.js";
import Phones from "./layouts/phones/Phones.js";
import Audio from "./layouts/audio/Audio.js";
import Wearables from "./layouts/wearables/Wearables.js";
import Accessories from "./layouts/accessories/Accessories.js";
import Tablets from "./layouts/tablets/Tablets.js";
import Search from "./layouts/search/Search.js";
import Cart from "./layouts/cart/Cart.js";
import Profile from "./layouts/profile/Profile.js";
import Notifications from "./layouts/notifications/Notifications.js";
import Wishlist from "./layouts/wishlist/Wishlist.js";
import Footer from "./components/common/footer/Footer.js";
import NavBar from "./components/common/navbar/NavBar.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <NavBar />
        </header>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/wearables" element={<Wearables />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications/:id" element={<Notifications />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/wishlist/:id" element={<Wishlist />} />
          <Route path="/cart/:id" element={<Cart />} />

          {/* Define other routes that you need*/}
        </Routes>

        {/* Footer is common across all routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
