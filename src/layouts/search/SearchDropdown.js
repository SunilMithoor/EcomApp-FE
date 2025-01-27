import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip from "@mui/material/Tooltip";
import { blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import message from "../../constants/message.js";
import Divider from "../../components/common/divider/Divider.js";
import { CloseOutlined } from "@mui/icons-material";
import { useFetchSearch } from "../../hooks/home.js";
import { fetchSearch } from "../../services/localService/LocalService.js";
import SearchPopUpCard from "./SearchPopUpCard.js";
import { IconDropDownUseStyles } from "../../styles/DropdownStyles.js";

function SearchDropdown() {
  const classes = IconDropDownUseStyles();
  const [open, setOpen] = React.useState(false);

  // Use `useFloating` for positioning and `useHover` for hover interaction.
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start", // Dropdown opens below the trigger
    middleware: [
      offset(8), // Space between trigger and dropdown
      flip({
        fallbackPlacements: ["top-start"], // Flip to top if necessary
        padding: 5,
      }),
      shift({ padding: 5 }), // Prevent overflow
    ],
  });

  const hover = useHover(context, { delay: { open: 100, close: 100 } });
  const interactions = useInteractions([hover]);
  const triggerRef = useMergeRefs([refs.setReference]);
  const contentRef = useMergeRefs([refs.setFloating]);

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const { data, isLoading, error } = useFetchSearch(); // Fetch data
  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    if (data?.success === true) {
      setDataItems(data.data || []);
    }
  }, [data]);

  // Filter items based on search query
  const filteredItems = dataItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

  return (
    <div>
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        sx={{
          backgroundColor: open ? red[50] : "transparent", // Background color when open
          borderRadius: "4px", // Ensures square shape
          "&:hover": {
            backgroundColor: red[50], // Same hover color
            borderRadius: "4px", // Ensure consistent border-radius on hover
          },
        }}
        className="PopoverTrigger"
      >
        <SearchOutlinedIcon
          sx={{
            color: open ? red[500] : blueGrey[900], // Icon color changes when open
            transition: "filter 0.3s ease, color 0.3s ease", // Smooth transitions
            "&:hover": {
              filter: "brightness(1.5)", // Brightness effect on hover
            },
          }}
        />
      </IconButton>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
            }}
            className={classes.popover}
            {...interactions.getFloatingProps()}
          >
            <Box>
              <Box
                sx={{
                  mt: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold", // Make the text bold
                    display: "flex",
                    flex: 1,
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {message.search}
                </Typography>

                <Tooltip title={message.close}>
                  <IconButton
                    onClick={closeDropdown}
                    aria-label="Close"
                    size="small"
                    sx={{ color: blueGrey[900] }}
                  >
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box
                sx={{
                  padding: 0.5,
                  maxHeight: "400px", // Limit overall height
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                {/* Search TextField - Fixed at the top */}
                <Box
                  sx={{
                    mb: 2,
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Box>

                {/* Scrollable Data Section */}
                <Box
                  sx={{
                    maxHeight: "400px", // Limit height for scrollable content
                    overflowY: "auto", // Enable vertical scrolling
                    display: "flex",
                    flexDirection: "column", // Ensure content is stacked vertically
                  }}
                >
                  {/* Display loading state */}
                  {isLoading && (
                    <Box display="flex" justifyContent="center" my={2}>
                      <CircularProgress size={30} />
                    </Box>
                  )}

                  {/* Display error state */}
                  {!isLoading && error && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {data?.message ||
                        "Something went wrong. Please try again."}
                    </Typography>
                  )}

                  {/* Display filtered data */}
                  {!isLoading && !error && filteredItems.length > 0 ? (
                    <Box>
                      {filteredItems.map((item) => (
                        <SearchPopUpCard
                          data={item}
                          closeDropdown={closeDropdown}
                        />
                      ))}
                    </Box>
                  ) : (
                    // No results found
                    !isLoading &&
                    !error && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                      >
                        No results found.
                      </Typography>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default SearchDropdown;
