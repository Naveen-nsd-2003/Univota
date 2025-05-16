import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // If you're using lucide icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
        background:
          theme === "dark"
            ? "linear-gradient(145deg, #1f1f2e, #2e2e3e)"
            : "linear-gradient(145deg, #ffffff, #e6e6e6)",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow:
          theme === "dark"
            ? "0 4px 10px rgba(0, 0, 0, 0.4)"
            : "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <Sun size={20} color="#fcd34d" />
      ) : (
        <Moon size={20} color="#4b5563" />
      )}
    </button>
  );
};

export default ThemeToggle;