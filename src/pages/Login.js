import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleLogin = () => {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('유효한 이메일을 입력해주세요.')
          .required('이메일을 입력해주세요.'),
        password: yup
          .string()
          .required('비밀번호를 입력해주세요.')
          .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.'
          ),
      });
  
      schema
        .validate({ email, password })
        .then(() => {
          // 로그인 성공
          axios.post('http://localhost:8080/api/v1/authentication/login', { memberEmail:email, memberPwd:password })
            .then(response => {
              const accessToken = response.data.accessToken;

              login(accessToken);
                
              alert('로그인 성공');
              // 추가적인 로직 수행

             
              navigate('/');
            })
            .catch(error => {
              // 로그인 실패 시 처리 로직
              alert(error.response.data.message);
            });
        })
        .catch((error) => {
          // 로그인 실패
          alert(error.message);
        });
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
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li id="active">
                  <Link to="/login" id="current">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/">Edit</Link>
                </li>
                <li>
                  <Link to="/novelAI">AI novel</Link>
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
          <h3>로그인</h3>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="이메일"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            로그인
          </Button>
        </div>
        <div id="footer"></div>
      </div>
      <link rel="stylesheet" type="text/css" href="/style.css" />
      <div align="center"></div>
    </>
  );
};

export default Login;
