import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // We'll create a separate CSS file for styling

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>TwitterClone</h2>
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Notifications</li>
          <li>Messages</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </aside>

      {/* Main feed */}
      <main className="feed">
        <header className="feed-header">
          <h1>Welcome, {username}!</h1>
          <p>This is your dashboard. Explore posts and enjoy your secure login experience.</p>
        </header>

        {/* Sample post cards */}
        <div className="tweet-card">
          <div className="tweet-user">{username}</div>
          <div className="tweet-content">
            Successfully logged in with Firebase Authentication! 🎉
          </div>
        </div>

        <div className="tweet-card">
          <div className="tweet-user">Admin</div>
          <div className="tweet-content">
            Welcome to the platform! Check out new features in your dashboard.
          </div>
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="right-sidebar">
        <h3>Trends</h3>
        <ul>
          <li>#ReactJS</li>
          <li>#Firebase</li>
          <li>#OpenAI</li>
        </ul>
      </aside>
    </div>
  );
}

export default Dashboard;
