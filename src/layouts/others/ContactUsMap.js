import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { Box, useMediaQuery, Fade } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { blue } from "@mui/material/colors";

// Convert MUI icon to an SVG string
const getFmdIconUrl = () => {
  const svgString = renderToString(
    <FmdGoodIcon style={{ color: blue[500], fontSize: 40 }} />
  );

  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  return URL.createObjectURL(svgBlob);
};

// Function to create custom marker icons
const getCustomIcon = (url) =>
  new L.Icon({
    // iconUrl: url || "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    // iconUrl: getFmdIconUrl(),
    iconUrl: require("../../assets/icons/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -45],
  });

const ScrollWarningHandler = ({ setShowWarning }) => {
  const map = useMap();
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        map.scrollWheelZoom.enable();
      } else {
        map.scrollWheelZoom.disable();
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 2000);
        e.preventDefault();
      }
    };
    map
      .getContainer()
      .addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      map.getContainer().removeEventListener("wheel", handleWheel);
    };
  }, [map, setShowWarning]);
  return null;
};

const FitBoundsHandler = ({ items }) => {
  const map = useMap();
  useEffect(() => {
    if (items.length === 1) {
      map.setView([items[0].latitude, items[0].longitude], 13);
    } else if (items.length > 1) {
      const bounds = L.latLngBounds(
        items.map((item) => [item.latitude, item.longitude])
      );
      map.fitBounds(bounds);
    }
  }, [items, map]);
  return null;
};

function ContactUsMap({ data }) {
  const [items, setDataItems] = useState(Array.isArray(data) ? data : []);
  const [showWarning, setShowWarning] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mapRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDataItems(data);
    }
  }, [data]);

  const handleWarning = (visible) => {
    setShowWarning(visible);
    if (visible) {
      clearTimeout(window.warningTimeout);
      window.warningTimeout = setTimeout(() => setShowWarning(false), 2000);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid grey",
        borderRadius: "5px",
        overflow: "hidden",
      }}
      onMouseEnter={() => handleWarning(true)}
      onMouseLeave={() => handleWarning(false)}
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
            fontSize: "16px",
            zIndex: 1000,
          }}
        >
          Use <strong>Ctrl + Scroll</strong> to zoom the map
        </Box>
      </Fade>

      {/* Map Container */}
      <MapContainer
        center={
          items.length > 0
            ? [items[0].latitude, items[0].longitude]
            : [12.9716, 77.5946]
        }
        zoom={13}
        scrollWheelZoom={false}
        ref={mapRef}
        style={{
          height: isMobile ? "300px" : "600px",
          width: "100%",
        }}
      >
        <ScrollWarningHandler setShowWarning={setShowWarning} />
        <FitBoundsHandler items={items} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          // <Marker
          //   key={item.id}
          //   position={[item.latitude, item.longitude]}
          //   icon={getCustomIcon(item.iconUrl)}
          // >
          //   <Popup>
          //     <div style={{ textAlign: "center", maxWidth: "400px" }}>
          //       {item.imgUrl && (
          //         <img
          //           src={item.imgUrl}
          //           alt={item.name}
          //           style={{
          //             width: "100%",
          //             borderRadius: "5px",
          //             marginBottom: "8px",
          //           }}
          //         />
          //       )}
          //       <p
          //         style={{
          //           fontWeight: "normal",
          //           marginBottom: "1px",
          //           whiteSpace: "normal",
          //         }}
          //       >
          //         {item.Address}
          //       </p>
          //     </div>
          //   </Popup>
          // </Marker>
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
            icon={getCustomIcon("")}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginBottom: "8px",
                  }}
                />
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {item.Address}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

export default ContactUsMap;
