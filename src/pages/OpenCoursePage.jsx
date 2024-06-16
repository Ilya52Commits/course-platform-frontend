import { useEffect, useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CoursePage.propTypes = {
  course: PropTypes.string.isRequired,
  setCourse: PropTypes.func.isRequired,
};

export default function OpenCoursePage() {
  const navigate = useNavigate();
  const [arrayCourses, setArrayCourses] = useState([]);
  const [course, setCourse] = useState("");

  const HOST = "localhost:8000";
  const END_POINT = "/api/get-courses";

  let nameCourse = props.course;

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        const courses = data.map((course) => course.name);
        setArrayCourses(courses);
      }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

  const clickShow = () => {
    setCourse()
          navigate("/");
    
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="open-courses">
            <div className="open-courses-content">
              <h2>Список доступных курсов</h2>
              <ul className="list-courses">
                {arrayCourses.map((course, index) => (
                  <li key={index} className="courses-item">
                    <h3>{course.toUpperCase()}</h3>
                    <button onClick={clickShow}>Смотреть</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
