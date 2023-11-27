import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NovelAI from "./pages/NovelAI";
import Main from "./pages/Main";
import Sginup from "./pages/Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme({
  typography: {
    fontFamily: 'MyFont, sans-serif',
  },
});
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Main/> }/>
          <Route path="/novelAi" element={<NovelAI />} />
          <Route path="/novelList" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;