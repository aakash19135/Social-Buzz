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
  const [posts, setPosts] = useState([
  {
    id: 1,
    user: "Aakash",
    text: "Hello Social Feed 🚀 #react #frontend",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Rahul",
    text: "Learning React today! #react #javascript",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "3 hours ago",
  },
  {
    id: 3,
    user: "Priya",
    text: "Building a social media app. #react #mongodb",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "5 hours ago",
  },
  {
    id: 4,
    user: "Ananya",
    text: "Just posted my first blog! #javascript",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "1 day ago",
  },
  {
    id: 5,
    user: "Rohit",
    text: "Exploring new features. #nodejs #mongodb",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "2 days ago",
  },
  {
    id: 6,
    user: "Neha",
    text: "Working with #tailwind today.",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=6",
    time: "3 days ago",
  },
  {
    id: 7,
    user: "Arjun",
    text: "Learning #nodejs and #express.",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=7",
    time: "4 days ago",
  },
  {
    id: 8,
    user: "Sneha",
    text: "Started my #frontend journey.",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=8",
    time: "5 days ago",
  },
  {
    id: 9,
    user: "Karan",
    text: "Exploring #mongodb database.",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=9",
    time: "6 days ago",
  },
  {
    id: 10,
    user: "Meera",
    text: "Building with #react every day.",
    image: null,
    avatar: "https://i.pravatar.cc/150?img=10",
    time: "1 week ago",
  },
]);
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
      console.log(data);
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchNotifications();
}, []);
const handleLogin = (userData) => {
  console.log("USER FROM LOGIN", userData);
  const updatedProfile = {
    ...profile,
    _id: userData._id,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    profilePic: userData.profilePic,
  };
  console.log("UPDATED PROFILE:", updatedProfile);
  console.log("Logged in user:",
    userData);
  socket.emit("registerUser", userData._id);
  setProfile(updatedProfile);

  localStorage.setItem(
    "profile",
    JSON.stringify(updatedProfile)
  );

  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn", "true");
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