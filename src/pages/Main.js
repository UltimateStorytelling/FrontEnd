import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('jwtToken');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }, []);
  

  const handleEditorChange = (value) => {
    setEditorHtml(value);
  };

  const handleNovelSubmit = () => {

    // 소설 등록 API 호출
    alert('소설이 작성되었습니다.');

    navigate('/novelAi');
    
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
          <h3>소설 작성</h3>
          <TextField fullWidth margin="normal" id="novelName" label="제목" name="novelName" autoComplete="off" onChange={(e) => setTitle(e.target.value)} />
          <ReactQuill theme="snow" value={editorHtml} onChange={handleEditorChange} />
          <Button variant="contained" color="primary" onClick={handleNovelSubmit}>
           소설 등록
          </Button>
            </div>
            <div id="footer"></div>
            </div>
            <link rel="stylesheet" type="text/css" href="/style.css" />
            <div align="center">
            </div>
            </>
            );
    };

export default Main;