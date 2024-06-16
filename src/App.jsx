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
import CreateModulePage from "./pages/CreateModulePage.jsx";

export default function App() {
  const HOST = "localhost:8000";
  const END_POINT = "/api/user";

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "GET",
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
            <Route
              path="/create-course"
              element={<CreateCoursePage setCourse={setCourse} />}
            />
            <Route path="/open-courses" element={<OpenCoursePage />} />
            <Route
              path="/create-module"
              element={<CreateModulePage course={course} />}
            />
            <Route 
              path="/course-page" 
              element={<OpenCoursePage course={course}/>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
