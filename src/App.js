import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/App.css";

import NavbarHook from "./components/navbarhook/NavBarHook.js";
import Home from "./layouts/home/Home.js";
import Phones from "./layouts/phones/Phones.js";
import Audio from "./layouts/audio/Audio.js";
import Wearables from "./layouts/wearables/Wearables.js";
import Accessories from "./layouts/accessories/Accessories.js";
import Tablets from "./layouts/tablets/Tablets.js";
import Search from "./layouts/search/Search.js";
import Cart from "./layouts/cart/Cart.js";
import Profile from "./layouts/profile/Profile.js";

import Footer from "./components/common/footer/Footer.js";
import Footers from "./components/common/footer/Footers.js";
import NavBar from "./components/common/navbar/NavBar.js";
import Login from "./layouts/signinsignup/Login.js";

// const App = () => {
//   return (
//     <Router>
//       {/* <Navbar /> */}
//       <NavbarHook />
//       <main className="main-content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/phones" element={<Phones />} />
//           <Route path="/wearables" element={<Wearables />} />
//           <Route path="/audio" element={<Audio />} />
//           <Route path="/accessories" element={<Accessories />} />
//           <Route path="/tablets" element={<Tablets />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/profile" element={<Profile />} />
//           {/* Define other routes that you need*/}
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;

function App() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  // Detect scroll direction and hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Router>
      <div className="App">
        <header className={`header ${visible ? "visible" : "hidden"}`}>
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
          {/* Define other routes that you need*/}
        </Routes>

        {/* Footer is common across all routes */}
        <Footers />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
