import React from "react";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Pinterest,
  YouTube,
  Email,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// function Footers() {
//   return (
//     <Box sx={{ backgroundColor: "#f5f5f5", py: 4, px: 2 }}>
//       <Grid container spacing={4}>
//         {/* About Us Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             SAQI DESIGN STUDIO
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
//             quas error, doloribus laborum officiis iste doloremque soluta
//             deserunt omnis aliquid!
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <IconButton>
//               <Facebook />
//             </IconButton>
//             <IconButton>
//               <Twitter />
//             </IconButton>
//             <IconButton>
//               <Pinterest />
//             </IconButton>
//             <IconButton>
//               <YouTube />
//             </IconButton>
//           </Box>
//         </Grid>

//         {/* Useful Links Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Useful Links
//           </Typography>
//           <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
//             {["Home", "About", "Services", "Projects", "Contact Us"].map(
//               (link, index) => (
//                 <Typography
//                   key={index}
//                   variant="body2"
//                   sx={{ cursor: "pointer", color: "gray" }}
//                 >
//                   {link}
//                 </Typography>
//               )
//             )}
//           </Box>
//         </Grid>

//         {/* Address Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Address
//           </Typography>
//           <Box sx={{ mt: 1 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Email />
//               <Typography variant="body2">admin@onlinetutts.com</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//               <LocationOn />
//               <Typography variant="body2">
//                 A108 Adam Street, New York, NY
//               </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//               <Phone />
//               <Typography variant="body2">+1 558 955 48855</Typography>
//             </Box>
//           </Box>
//         </Grid>

//         {/* Contact Us Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Contact Us
//           </Typography>
//           <Box component="form" sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               placeholder="Enter an Email"
//               variant="outlined"
//               size="small"
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               fullWidth
//               placeholder="Write a Message..."
//               variant="outlined"
//               size="small"
//               multiline
//               rows={3}
//               sx={{ mb: 2 }}
//             />
//             <Button variant="contained" color="error" fullWidth>
//               Send
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//       <Typography
//         variant="body2"
//         sx={{ textAlign: "center", mt: 4, color: "gray" }}
//       >
//         All rights reserved by OnlineTutts © 2023.
//       </Typography>
//     </Box>
//   );
// }

function Footers() {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
        <Grid2 container spacing={2} wrap="nowrap">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            SAQI DESIGN STUDIO
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            quas error, doloribus laborum officiis iste doloremque soluta
            deserunt omnis aliquid!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton>
              <Facebook />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <Pinterest />
            </IconButton>
            <IconButton>
              <YouTube />
            </IconButton>
          </Box>
        </Grid2>
      </StyledPaper>
      <StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
        <Grid2 container spacing={2} wrap="nowrap">
          <Grid2 item>
            <Facebook>W</Facebook>
          </Grid2>
          <Grid2 item xs>
            <Typography noWrap>{"asdasfawvfasvcas"}</Typography>
          </Grid2>
        </Grid2>
      </StyledPaper>
      <StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
        <Grid2 container spacing={2} wrap="nowrap">
          <Grid2 item>
            <Facebook>W</Facebook>
          </Grid2>
          <Grid2 item xs>
            <Typography>{"message"}</Typography>
          </Grid2>
        </Grid2>
      </StyledPaper>
    </Box>
  );
}
export default Footers;
