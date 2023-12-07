import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import "react-quill/dist/quill.snow.css";



const Chatbot = ({ handleSendMessage, messages }) => {
  const clearInput = () => {
    document.getElementById("chatInput").value = ""; // 입력창 비우기
  };

  return (
    <>
      <div id="container">
        <div id="header">
          <h1>마야의 책장</h1>
        </div>
        <div id="sideheader"></div>
        <div id="left_column">
          <div className="left_column_boxes">
          <h4>Navigation</h4>
            <div id="navcontainer">
              <ul id="navlist">
                <li id="active">
                  <Link to="/" id="current">
                    Edit
                  </Link>
                </li>
                <li>
                  <Link to="/novelAI">AI novel</Link>
                </li>
                <li>
                  <Link to="/novelList">Novel List</Link>
                </li>
                <li>
                <a href="https://0239-221-163-19-218.ngrok-free.app/create-illustration" target="_blank" rel="noopener noreferrer">
                  AI illustration
                </a>
              </li>
              </ul>
            </div>
          </div>
          <div className="left_column_boxes">
            <h4>News</h4>
            <dl>
              <dt className="news">This is a definition list</dt>
              <dd>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed quam. Nullam gravida aliquet odio.
                Phasellus ullamcorper tincidunt orci. Praesent vel purus. Sed porttitor. Proin porttitor suscipit urna.
                Morbi rhoncus posuere orci.
              </dd>
              <dt className="news">Lists are cool</dt>
              <dd>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed quam. Nullam gravida aliquet odio.
                Phasellus ullamcorper tincidunt orci. Praesent vel purus. Sed porttitor. Proin porttitor suscipit urna.
                Morbi rhoncus posuere orci.
              </dd>
            </dl>
          </div>
          <div className="left_column_boxes">
            <h4>Contact us</h4>
            <form
              id="form1"
              method="post"
              className="contact_us"
              action="http://all-free-download.com/free-website-templates/"
            >
              <p>
                <label>
                  Name
                  <input type="text" className="fields_contact_us" name="textfield" />
                </label>
                <label>
                  E-mail
                  <input type="text" className="fields_contact_us" name="textfield1" />
                </label>
                <label>
                  Your question:
                  <textarea name="textarea" cols="" rows=""></textarea>
                </label>
                <label>
                  <input type="submit" className="submit_button_contact" name="Submit1" value="Submit" />
                </label>
              </p>
            </form>
          </div>
          <p className="center">
            Created by Dieter Schneider 2007{' '}
            <a href="http://www.csstemplateheaven.com">www.csstemplateheaven.com</a>
          </p>
        </div>
        <div id="content">
          <h3>AI 소설생성</h3>
          {/* 메시지 목록 */}
        <div style={{ height:'600px', overflow: 'auto'}}>
          {messages.map((message, index) => (
            <div key={index}>
              <b>{message.sender === "user" ? "나: " : "AI: "}</b> {message.text}
            </div>
          ))}
        </div>

        {/* 텍스트 필드 추가 */}
        <TextField
          id='chatInput'
          label='Message'
          variant='outlined'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value);
              clearInput();
            }
          }}
        />
        </div>
        <div id="footer"></div>
      </div>
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <div align="center">
      </div>
      </>
  );
};

export default function NovelAI() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    const requestData = {
      story: message,
    };

    setMessages([...messages, { text: message, sender: "user" }]);

    try {
      const response = await fetch('http://localhost:8080/api/v1/novels/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data);

      if (data && data.result && data.result.story) {

        const innerJson = JSON.parse(data.result.story);
        if (innerJson && innerJson.story) {
          setMessages(prevMessages => [...prevMessages, { text: innerJson.story, sender: "NovelAI" }]);

        }
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={6} component={() => <Chatbot handleSendMessage={handleSendMessage} messages={messages} />} />
    </Grid>
  );
}
