import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

// 스마트 에디터와 챗봇을 나타내는 플레이스홀더 컴포넌트
const SmartEditor = ({ handleSave }) => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <Paper elevation={6} square style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
      <CssBaseline />
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          소설 작성
        </Typography>
      </Box>
      <ReactQuill
        value={content}
        onChange={handleChange}
        placeholder="Write something..."
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image'
        ]}
        style={{ flex: 1 }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 1, fontSize: '18px', alignSelf: 'flex-end', marginBottom: '16px' }}
        color="primary"
        onClick={() => handleSave(content)}
      >
        Save
      </Button>
    </Paper>
  );
};

const Chatbot = ({ handleSendMessage, messages }) => {
  return (
    <Paper elevation={6} square style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          소설 생성 AI
        </Typography>
      </Box>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "8px", textAlign: msg.sender === "user" ? "right" : "left" }}>
            <strong>{msg.sender === "user" ? "You: " : "Chatbot: "}</strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "8px" }}>
        <TextField
          margin="normal"
          fullWidth
          id="chatInput"
          label="메시지를 입력하세요"
          name="chatInput"
          autoComplete="off"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1, fontSize: '28px' }}
          color="secondary"
          onClick={() => {
            const inputValue = document.getElementById("chatInput").value;
            if (inputValue) {
              handleSendMessage(inputValue);
              document.getElementById("chatInput").value = "";
            }
          }}
        >
          전송
        </Button>
      </div>
    </Paper>
  );
};

export default function NovelAI() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/novels/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log(data);

      if (data && data.message) {
        setMessages(prevMessages => [...prevMessages, { text: data.message, sender: "chatbot" }]);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleSave = (content) => {
    console.log("Saving content:", content);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={6} component={SmartEditor} handleSave={handleSave} />
      <Grid item xs={12} sm={6} md={6} component={() => <Chatbot handleSendMessage={handleSendMessage} messages={messages} />} />
    </Grid>
  );
}
