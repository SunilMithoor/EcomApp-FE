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
import Orders from "./layouts/orders/Orders.js";
import { Box } from "@mui/material";
import BouncingDotsLoader from "./components/common/loaders/BouncingDotsLoader.js";
import PropagateLoaders from "./components/common/loaders/PropagateLoader.js";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    setTimeout(() => setLoading(false), 0);
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <PropagateLoaders loading={loading} />
        ) : (
          <>
            <Box display="flex" flexDirection="column">
              <header className="App-header">
                <NavBar />
              </header>

              {/* Main content area */}
              <main className="App-main">
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
                  <Route
                    path="/notifications/:id"
                    element={<Notifications />}
                  />
                  <Route path="/search/:id" element={<Search />} />
                  <Route path="/wishlist/:id" element={<Wishlist />} />
                  <Route path="/cart/:id" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/phones/:id" element={<Phones />} />
                  <Route path="/tablets/:id" element={<Tablets />} />
                  <Route path="/wearables/:id" element={<Wearables />} />
                  <Route path="/audio/:id" element={<Audio />} />
                  <Route path="/accessories/:id" element={<Accessories />} />

                  {/* Define other routes that you need*/}
                </Routes>
              </main>
              {/* Footer */}
              <footer className="App-footer">
                <Footer />
              </footer>
            </Box>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
