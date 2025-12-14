import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Toast from "./components/Toast";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [toast, setToast] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("posts")) || [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const addPost = (post) => {
    setPosts((p) => [...p, post]);
    showToast("Post created");
  };

  const deletePost = (id) => {
    setPosts((p) => p.filter((x) => x.id !== id));
    showToast("Post deleted");
  };

  const updatePost = (post) => {
    setPosts((p) => p.map((x) => (x.id === post.id ? post : x)));
    showToast("Post updated");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <SignIn
              onLogin={() => {
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
              }}
            />
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onLogout={logout} />
      <Toast message={toast} show={!!toast} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home
                  posts={posts}
                  deletePost={deletePost}
                  loading={loading}
                  showToast={showToast}
                />
              </PageWrapper>
            }
          />

          <Route
            path="/create"
            element={<CreatePost addPost={addPost} />}
          />

          <Route
            path="/edit/:id"
            element={<EditPost posts={posts} updatePost={updatePost} />}
          />

          <Route
            path="/post/:id"
            element={<PostDetail posts={posts} />}
          />

          <Route
            path="/profile"
            element={<Profile posts={posts} />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
