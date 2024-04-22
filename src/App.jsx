import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";

export default function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const connect = await response.json();

      setName(connect.name);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header name={name} setName={setName} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage name={name} />} />
            <Route path="/login" element={<LoginPage setName={setName} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirm" element={<ConfirmationPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
