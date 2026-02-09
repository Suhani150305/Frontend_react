/*import axios from "axios";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
        role
      });
      alert(res.data.message);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input placeholder="Username"
        onChange={e => setUsername(e.target.value)} /><br /><br />

      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} /><br /><br />

      <select onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
      </select><br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;*/

import axios from "axios";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const login = async () => {
    // Basic validation
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
        role
      });

      // Save role (same logic as your HTML version)
      localStorage.setItem("userRole", res.data.role);

      alert("Login successful");

      // Redirect based on role
      if (res.data.role === "admin") {
        window.location.href = "/admin_dashboard.html";
      } else if (res.data.role === "faculty") {
        window.location.href = "/faculty_dashboard.html";
      } else {
        window.location.href = "/studentdashboard.html";
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px" }}>
      <h2>EduAchieve Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
      </select><br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
