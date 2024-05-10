import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import Bookmarks from "./Pages/Bookmarks";
import Notification from "./Pages/Notification";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
