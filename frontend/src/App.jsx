import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import BookmarksPage from "./pages/BookmarksPage";
import TrendingPage from "./pages/TrendingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useState, useEffect } from "react";
import socket from "./socket/socket";
function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const[ totalLikes, setTotalLikes] = useState(0);
  const[totalComments, setTotalComments]= useState(0);
  const[totalBookmarks, setTotalBookmarks]=useState(0);
 const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("darkMode");
  return savedTheme ? JSON.parse(savedTheme) : false;
});
const toggleDarkMode = () => {
  setDarkMode((prev) => !prev);
};
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
});
  const[notifications , setNotifications] = useState([]);
  const [profile, setProfile] = useState(() => {
    const saved = 
localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
  name: "Aakash",
  bio: "Frontend Developer | React Developer | Open Source Learner",
  avatar: "https://i.pravatar.cc/200?img=12",
      };
});
 const [posts, setPosts]=
 useState([]);
useEffect(() => {
  localStorage.setItem("profile", JSON.stringify(profile));
}, [profile]);
useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
    console.log("Registering:", profile);
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile?.id) {
      socket.emit("registerUser", profile._id);
    }
  });

  socket.on("newNotification", (notification) => {
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  if (
    notification.receiver &&
    notification.receiver.toString() === currentUser._id
  ) {
    setNotifications((prev) => [notification, ...prev]);
  }
});

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  return () => {
    socket.off("connect");
    socket.off("newNotification");
    socket.off("disconnect");
  };
}, []);
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchNotifications();
}, []);
const handleLogin = (userData) => {
  const updatedProfile = {
    _id: userData._id,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    bio:
      userData.bio ||
      "Frontend Developer | React Developer | Open Source Learner",
    profilePic: userData.profilePic,
  };

  setProfile(updatedProfile);
  setPosts([]);

  localStorage.setItem(
    "profile",
    JSON.stringify(updatedProfile)
  );

  localStorage.setItem("isLoggedIn", "true");
  setIsLoggedIn(true);

  socket.emit("registerUser", userData._id);
};
  return (
          <Routes>
  <Route path="/login" element={<Login darkMode={darkMode} onLogin={handleLogin} />} />

  <Route
    path="/"
    element={
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <MainLayout
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          profile={profile}
          posts={posts}
          onLogout={() => {
            localStorage.removeItem("isLoggedIn");
            socket.disconnect();
            setIsLoggedIn(false);
          }}
        />
      </ProtectedRoute>
    }
  >
    <Route
      index
      element={
        <Home
          darkMode={darkMode}
          posts={posts}
          setPosts={setPosts}
          profile={profile}
          onBookmark={(post) =>
            setBookmarks((prev) => [...prev, post])
          }
          addNotification={(notification) =>
            setNotifications((prev) => [notification, ...prev])
          }
          totalLikes={totalLikes}
          setTotalLikes={setTotalLikes}
          totalComments={totalComments}
          setTotalComments={setTotalComments}
          totalBookmarks={totalBookmarks}
          setTotalBookmarks={setTotalBookmarks}
        />
      }
    />

    <Route
      path="profile"
      element={
        <ProfilePage
          darkMode={darkMode}
          profile={profile}
          setProfile={setProfile}
        />
      }
    />

    <Route
      path="dashboard"
      element={
        <DashboardPage
          darkMode={darkMode}
          posts={posts}
          totalLikes={totalLikes}
          totalComments={totalComments}
          totalBookmarks={totalBookmarks}
        />
      }
    />

    <Route
      path="notifications"
      element={
        <NotificationsPage
          darkMode={darkMode}
          notifications={notifications}
        />
      }
    />

    <Route
      path="bookmarks"
      element={
        <BookmarksPage
          darkMode={darkMode}
          bookmarks={bookmarks}
        />
      }
    />

    <Route
      path="trending"
      element={
        <TrendingPage
          darkMode={darkMode}
          posts={posts}
        />
      }
    />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
  
  );
}

export default App;