import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, appleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./login.css"; // reuse same styles

function Signup() {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  // Email/password signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !username || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("username", username); // store username locally

        alert("Signup successful! Please login.");
        // Sign out immediately to prevent auto-login
        signOut(auth).then(() => navigate("/"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already registered. Please login.");
          navigate("/");
        } else {
          alert(error.message);
        }
      });
  };

  // Google signup/login
  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Signed in with Google successfully!");
        signOut(auth).then(() => navigate("/")); // force manual login
      })
      .catch((error) => console.error("Google Sign-in Error:", error));
  };

  // Apple signup/login
  const handleAppleSignup = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        alert("Signed in with Apple successfully!");
        signOut(auth).then(() => navigate("/")); // force manual login
      })
      .catch((error) => console.error("Apple Sign-in Error:", error));
  };

  return (
    <div className="App">
      <div className="logo-box">
        <p
          style={{
            margin: "10px 0",
            color: "black",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Create your account securely using Firebase Authentication. You can
          sign up with Email/Password, Google, or Apple.
        </p>

        <img src="./twitter-logo.png" alt="Twitter Logo" className="logo" />
        <h2>Create your account</h2>

        {/* Google / Apple signup */}
        <button onClick={handleGoogleSignup}>
          <img
            src="./google-logo.png"
            alt="Google Logo"
            className="sign-option"
          />
          Sign up with Google
        </button>

        <button onClick={handleAppleSignup}>
          <img
            src="./apple-logo.png"
            alt="Apple Logo"
            className="sign-option"
          />
          Sign up with Apple
        </button>

        <hr />
        <span>Or</span>

        {/* Email/password signup */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
