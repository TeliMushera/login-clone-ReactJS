import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, appleProvider } from "./firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState(""); // added for email/password login

  // Auto-redirect if user already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Google login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google User:", result.user);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Google Sign-in Error:", error));
  };

  // Apple login
  const handleAppleLogin = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        console.log("Apple User:", result.user);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Apple Sign-in Error:", error));
  };

  // Email login
  const handleEmailLogin = (e) => {
    e.preventDefault();

    if (!input.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, input, password)
      .then((result) => {
        console.log("Email User:", result.user);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          alert("Email not registered. Please sign up first.");
          navigate("/signup");
        } else if (err.code === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
        } else {
          alert(err.message);
        }
      });
  };

  return (
    <div className="App">
      <div className="logo-box">
        <p
          style={{
            margin: "10px 0",
            color: "black",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Log in securely with Firebase Authentication. You can use
          Email/Password, Google, or Apple login.
        </p>
        <img src="./twitter-logo.png" alt="Twitter Logo" className="logo" />
        <h2>Sign In to Twitter</h2>

        {/* Google login */}
        <button onClick={handleGoogleLogin}>
          <img
            src="./google-logo.png"
            alt="Google Logo"
            className="sign-option"
          />
          Sign in with Google
        </button>

        {/* Apple login */}
        <button onClick={handleAppleLogin}>
          <img
            src="./apple-logo.png"
            alt="Apple Logo"
            className="sign-option"
          />
          Sign in with Apple
        </button>

        <hr />
        <span>Or</span>

        {/* Email login */}
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <button>Forget Password?</button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
