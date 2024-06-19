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
import CoursePage from "./pages/CoursePage.jsx";
import CreateLessonPage from "./pages/CreateLessonPage.jsx"
import LessonPage from "./pages/LessonPage.jsx"
import ModulePage from "./pages/ModulePage.jsx"

export default function App() {
  const HOST = "localhost:8000";
  const END_POINT = "/api/user";

  const [name, setName] = useState("");

  const [courseId, setCourse] = useState("");
  const [nameCourse, setNameCourse] = useState("");

  const [moduleId, setModule] = useState("");
  const [nameModule, setNameModule] = useState("");

  const [lessonId, setLesson] = useState("");

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
              element={<CreateCoursePage 
              setCourse={setCourse}
              setNameCourse={setNameCourse}/>}
            />
            <Route 
              path="/open-courses" 
              element={<OpenCoursePage 
              name={name} 
              setNameCourse={setNameCourse}
              setCourse={setCourse}/>} 
            />
            <Route
              path="/create-module"
              element={<CreateModulePage 
              courseId={courseId} 
              nameCourse={nameCourse}
              setNameModule={setNameModule}
              setModule={setModule}/>}
            />
            <Route 
              path="/course-page" 
              element={<CoursePage 
              courseId={courseId}
              nameCourse={nameCourse}
              setNameModule={setNameModule}
              setModule={setModule}/>}
            />
            <Route 
              path="/create-lesson" 
              element={<CreateLessonPage 
              moduleId={moduleId}
              nameModule={nameModule}
              setLesson={setLesson}/>}
            />
            <Route path="/module-page"
              element={<ModulePage 
              moduleId={moduleId}
              nameModule={nameModule}
              setLesson={setLesson}/>} />
            <Route 
              path="/lesson-page"
              element={<LessonPage 
              module={moduleId}
              nameModule={nameModule}
              lessonId={lessonId}/>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
