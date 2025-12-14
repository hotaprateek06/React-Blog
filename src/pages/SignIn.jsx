import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found. Please Sign Up.");
      return;
    }

    if (email === user.email && password === user.password) {
      onLogin();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa')",
      }}
    >
      {/* Glass Card */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
          Sign In
        </h2>

        <input
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-4 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-5 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
