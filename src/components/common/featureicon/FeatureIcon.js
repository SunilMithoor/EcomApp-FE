import { IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BrightnessLowOutlinedIcon from "@mui/icons-material/BrightnessLowOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";

function FeatureIcon({ type }) {
  const iconStyles = {
    color: orange[500],
    fontSize: 32,
    transition: "filter 0.3s ease, color 0.3s ease",
    "&:hover": {
      // filter: "brightness(1.5)",
    },
  };

  const icons = {
    1: <ShoppingCartOutlinedIcon sx={iconStyles} />,
    2: <BrightnessLowOutlinedIcon sx={iconStyles} />,
    3: <SellOutlinedIcon sx={iconStyles} />,
    4: <HealthAndSafetyOutlinedIcon sx={iconStyles} />,
  };

  return (
    <IconButton>
      {icons[type] || <BrightnessLowOutlinedIcon sx={iconStyles} />}
    </IconButton>
  );
}

export default FeatureIcon;
