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

const useStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    width: "max-content",
    maxWidth: "calc(100vw - 10px)",
  },
  closeButton: {
    marginTop: "8px",
  },
});

function SearchDropdown() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // Use `useFloating` for positioning and `useHover` for hover interaction.
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "end", // Ensure the dropdown flips when necessary
        padding: 5,
      }),
      shift({ padding: 5 }), // Helps in shifting the dropdown to fit in the viewable area
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
    <div className="App">
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
        sx={{
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: red[50],
            borderRadius: "4px",
          },
        }}
      >
        <SearchOutlinedIcon
          sx={{
            color: blueGrey[900],
            transition: "filter 0.3s ease",
            "&:hover": {
              filter: "brightness(1.5)",
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
              border: "40px",
              marginTop: "18px",
              maxHeight: "500px",
              minHeight: "400px",
              minWidth: "400px",
              maxWidth: "500px",
              background: "#F8F8F8",
            }}
            {...interactions.getFloatingProps()}
            className={classes.popover}
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
