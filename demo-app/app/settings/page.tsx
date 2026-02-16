"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState(() => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("displayName") ?? "Demo Name";
});

  const [toast, setToast] = useState("");
  const [validation, setValidation] = useState("");
  const [wasEdited, setWasEdited] = useState(false);


function handleSave() {
  const trimmed = name.trim();

  // If the user edited the field and made it empty -> validation error
  if (wasEdited && trimmed.length === 0) {
    setValidation("Required");
    setToast("");
    return;
  }

  // If not edited, treat as "no change" and keep stored/default value
  const finalName =
    trimmed ||
    (typeof window !== "undefined"
      ? localStorage.getItem("displayName") ?? "Demo Name"
      : "Demo Name");

  setValidation("");
  setToast("Saved");

  if (typeof window !== "undefined") {
    localStorage.setItem("displayName", finalName);
  }
  setName(finalName);
}


  return (
    <main style={{ padding: 40 }}>
      <h1>Settings</h1>

      <input
        data-testid="display-name"
        value={name}
        placeholder="Display name"
        onChange={(e) => {
  setWasEdited(true);
  setName(e.target.value);
}}

      />

      <br /><br />

      <button
        data-testid="save-btn"
        onClick={handleSave}
      >
        Save
      </button>

      {toast && (
        <p data-testid="toast" style={{ color: "green" }}>
          {toast}
        </p>
      )}

      {validation && (
        <p data-testid="validation" style={{ color: "red" }}>
          {validation}
        </p>
      )}
    </main>
  );
}
