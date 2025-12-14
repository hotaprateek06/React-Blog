import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password })
    );

    alert("Account created successfully. Please Sign In.");
    window.location.href = "/";
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
          Sign Up
        </h2>

        <input
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-3 rounded"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-3 rounded"
          placeholder="Password (min 6 chars)"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full border dark:border-gray-700 
                     bg-white/90 dark:bg-gray-800/90 
                     text-gray-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     p-2 mb-5 rounded"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 dark:text-blue-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
