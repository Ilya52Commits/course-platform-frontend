import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ModulePage.propTypes = {
  moduleId: PropTypes.string.isRequired,
  nameModule: PropTypes.string.isRequired,
  setLesson: PropTypes.func.isRequired,
};

export default function ModulePage(props) {
  const navigate = useNavigate();

  const [arrayLessons, setArrayLessons] = useState({});

  const HOST = "localhost:8000";
  const END_POINT_GET_MODULES = "/api/get-lessons";

  let idModule = props.moduleId

  useEffect(() => {
    (async () => {
        const getResponse = await fetch(`http://${HOST}${END_POINT_GET_MODULES}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            idModule,
          }),
        });

      if (getResponse.ok) {
        const data = await getResponse.json();
          const lessons = {};
          data.forEach((lesson) => {
                lessons[lesson.id] = lesson.name;
              });
          setArrayLessons(lessons);
      }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

  const openLesson = (idLesson) => {
    console.log(idLesson)
    props.setLesson(idLesson)
    navigate("/lesson-page")
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="course-page">
            <div className="course-page-content">
              <h2>Модуль: {props.nameModule.toUpperCase()}</h2>
              <ul className="course-modules">
                {Object.keys(arrayLessons).map((lessonId) => (
                  <li key={lessonId} className="course-modules-item">
                    <p>{arrayLessons[lessonId]}</p>
                    <div className="module-btns">
                      <button onClick={() => openLesson(lessonId)}>
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
