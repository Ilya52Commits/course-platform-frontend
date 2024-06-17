import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ModulePage.propTypes = {
  module: PropTypes.string.isRequired,
  setLesson: PropTypes.func.isRequired,
};

export default function ModulePage(props) {
  const navigate = useNavigate();

  const [arrayLesson, setArrayLesson] = useState([]);

  const HOST = "localhost:8000";
  const END_POINT_GET_MODULES = "/api/get-lessons";

  let nameModule = props.module

  useEffect(() => {
    (async () => {
        const getResponse = await fetch(`http://${HOST}${END_POINT_GET_MODULES}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            nameModule,
          }),
        });

      if (getResponse.ok) {
        const data = await getResponse.json();
        const lessons = data.map((lesson) => lesson["name"]);
        setArrayLesson(lessons);
      }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

  const openLesson = (lesson) => {
    props.setLesson(lesson)
    navigate("/lesson-page")
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="course-page">
            <div className="course-page-content">
              <h2>Модуль: {props.module.toUpperCase()}</h2>
              <ul className="course-modules">
                {arrayLesson.map((lesson, index) => (
                  <li key={index} className="course-modules-item">
                    <p>{lesson}</p>
                    <div className="module-btns">
                      <button onClick={() => openLesson(lesson)}>
                        смотреть
                      </button>
                    </div>
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
