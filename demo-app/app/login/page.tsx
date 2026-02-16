"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

function handleLogin() {
  const ok =
    (username === "demo" && password === "demo") ||
    (username === "validUser" && password === "validPass") ||
    (username === "someUser" && password === "somePass");

  if (ok) {
    router.push("/dashboard");
  } else {
    setError("Invalid credentials");
  }
}


  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        data-testid="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        data-testid="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
        data-testid="login-btn"
        onClick={handleLogin}
      >
        Login
      </button>

      {error && (
        <p data-testid="error-banner" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </main>
  );
}
