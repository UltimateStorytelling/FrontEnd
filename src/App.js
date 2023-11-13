import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NovelAI from "./pages/NovelAI";
import Produce from "./pages/Produce";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
          <Route path="/produce" element={<Produce />} />
          <Route path="/novelAi" element={<NovelAI />} />
          <Route path="/novelList" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
