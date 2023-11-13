import "./App.css";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LoginPage.jsx";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import CurrentUserProfile from "./pages/UserProfile/CurrentUserProfile";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./components/EditProfile";
import FeedPage from "./pages/HomePage/HomePage.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="user/:username" element={<UserProfile />} />
          <Route path="/profile" element={<CurrentUserProfile />} />
          <Route path="/edit_profile" element={<EditProfile />} />
          <Route path="/feed" element={<FeedPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
