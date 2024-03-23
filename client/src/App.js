import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
