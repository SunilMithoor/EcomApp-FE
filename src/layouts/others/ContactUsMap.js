import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, useMediaQuery, Fade } from "@mui/material";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -45], // Ensures popup appears above the marker
});

const position = [12.9716, 77.5946]; // Example position

const ScrollWarningHandler = ({ setShowWarning, mapRef }) => {
  useMapEvent("wheel", (e) => {
    if (!e.originalEvent.ctrlKey) {
      e.originalEvent.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  });

  return null;
};

const ContactUsMap = () => {
  const [showWarning, setShowWarning] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mapRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.ctrlKey) {
        e.stopPropagation(); // Prevents the page zoom from triggering
      }
    };

    document.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid grey",
        borderRadius: "5px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setShowWarning(true)}
      onMouseLeave={() => setTimeout(() => setShowWarning(false), 2000)}
    >
      {/* Scroll Warning Box */}
      <Fade in={showWarning}>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          Use <strong>Scroll</strong> to zoom the map
        </Box>
      </Fade>

      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true} // Allow scrolling
        ref={mapRef}
        style={{
          height: isMobile ? "300px" : "600px",
          width: "100%",
        }}
      >
        <ScrollWarningHandler setShowWarning={setShowWarning} mapRef={mapRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-efcf0.appspot.com/o/images%2Fimages%2FBogota.jpg?alt=media&token=8eb98c26-654c-4ee2-a054-c04e891c4b1e"
                alt="Location"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  marginBottom: "8px",
                }}
              />
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                123 Random Street, Bengaluru
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default ContactUsMap;
