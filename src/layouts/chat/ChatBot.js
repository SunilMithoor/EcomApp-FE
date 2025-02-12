import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  IconButton,
  CircularProgress,
  Avatar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { grey } from "@mui/material/colors";

function ChatBot({ chatOpen, setChatOpen }) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Want to get in touch? I'm here to help.",
      time: time,
    },
    {
      sender: "bot",
      text: "Ask me a question or select an option below:",
      time: time,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatOpen]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: input.trim(),
          time: time,
        },
      ]);
      setInput("");
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "This is a random bot response.",
            time: time,
          },
        ]);
        setLoading(false);
      }, 3000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "user",
              text: "",
              image: reader.result,
              time: time,
            },
          ]);
          setTimeout(() => {
            scrollToBottom(); // Wait for the state update before scrolling
          }, 100); // Add a slight delay for rendering
          setLoading(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                sender: "bot",
                text: "Thanks for the image! How can I assist you further?",
                time: time,
              },
            ]);
            setLoading(false);
          }, 3000);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Only image files are allowed.");
      }
    }
  };

  return (
    <>
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "400px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingY: "15px",
              backgroundColor: "#2e475d",
              borderBottom: "1px solid #e0e0e0",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            <IconButton onClick={() => setChatOpen(true)} color="primary">
              <Avatar
                alt="Icon"
                src={require("../../assets/icons/avatar.png")}
                sx={{ backgroundColor: "#2e475d" }}
              />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexGrow: 1,
                paddingX: "10px",
                color: "white",
                textAlign: "left",
              }}
            >
              ChatBot
            </Typography>
            <IconButton onClick={() => setChatOpen(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </div>

          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                {message.text && (
                  <div
                    style={{
                      backgroundColor:
                        message.sender === "user" ? "#2e475d" : "#eaf0f6",
                      color: message.sender === "user" ? "white" : "black",
                      padding: "12px",
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px",
                      borderTopLeftRadius: "0px",
                      borderTopRightRadius: "5px",
                      maxWidth: "70%",
                    }}
                  >
                    {message.text}
                  </div>
                )}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded"
                    style={{ maxWidth: "100px", borderRadius: "10px" }}
                  />
                )}
                <Typography
                  variant="caption"
                  style={{ marginTop: "5px", color: "gray" }}
                >
                  {message.time}
                </Typography>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <CircularProgress size={20} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              sx={{
                backgroundColor: "#eaf0f6",
              }}
              placeholder="Write a message..."
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <IconButton
              component="label"
              sx={{
                color: "#2e475d",
                "&:hover": {
                  backgroundColor: grey[300], // Same hover color
                },
              }}
            >
              <AttachFileIcon
                sx={{
                  color: "#2e475d",
                }}
              />
              <input type="file" hidden onChange={handleFileUpload} />
            </IconButton>
            <IconButton
              color="#2e475d"
              onClick={handleSend}
              disabled={!input.trim()}
              sx={{
                color: "#2e475d",
                "&:hover": {
                  backgroundColor: grey[300], // Same hover color
                },
              }}
            >
              <SendIcon sx={{ color: !input.trim() ? "grey" : "#2e475d" }} />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
