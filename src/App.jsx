import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import CreateCoursePage from "./pages/CreateCoursePage.jsx";
import OpenCoursePage from "./pages/OpenCoursePage.jsx";
import CoursePage from "./pages/CoursePage.jsx";

export default function App() {
  const HOST = "localhost:8000";
  const END_POINT = "/api/user";

  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
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
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/open-courses" element={<OpenCoursePage />} />
            <Route path="/course-page" element={<CoursePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
