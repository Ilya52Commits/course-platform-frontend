import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

OpenCoursePage.propTypes = {
  course: PropTypes.string.isRequired,
  setNameCourse: PropTypes.func.isRequired,
  setCourse: PropTypes.func.isRequired,
};

export default function OpenCoursePage(proprs) {
  const navigate = useNavigate();

  const [arrayCourses, setArrayCourses] = useState({});

  const HOST = "localhost:8000";
  const END_POINT = "/api/get-courses";

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        const courses = {}
        data.forEach((course) => {
          courses[course.id] = course.name
        });
        setArrayCourses(courses);
      }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

   
  const clickShow = async (courseId, courseName) => {   
    proprs.setCourse(courseId);
    proprs.setNameCourse(courseName)
    navigate("/course-page");
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="open-courses">
            <div className="open-courses-content">
              <h2>Список доступных курсов</h2>
              <ul className="list-courses">
              {Object.keys(arrayCourses).map((courseId) => (
                  <li key={courseId} className="courses-item">
                    <h3>{arrayCourses[courseId]}</h3>
                    <button onClick={() => clickShow(courseId, arrayCourses[courseId])}>Смотреть</button>
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
