import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CoursePage.propTypes = {
  course: PropTypes.string.isRequired,
  setModule: PropTypes.func.isRequired,
};

export default function CoursePage(props) {
  const navigate = useNavigate();

  const [arrayModules, setArrayModules] = useState([]);

  const HOST = "localhost:8000";
  const END_POINT_GET_MODULES = "/api/get-modules";

  let nameCourse = props.course

  useEffect(() => {
    (async () => {
        const getResponse = await fetch(`http://${HOST}${END_POINT_GET_MODULES}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            nameCourse,
          }),
        });

      if (getResponse.ok) {
        const data = await getResponse.json();
        const modules = data.map((module) => module["name"]);
        setArrayModules(modules);
      }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

  const openModule = (module) => {
    props.setLesson(module)
    navigate("/module-page")
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="course-page">
            <div className="course-page-content">
              <h2>Курс: {props.course.toUpperCase()}</h2>
              <ul className="course-modules">
                {arrayModules.map((module, index) => (
                  <li key={index} className="course-modules-item">
                    <p>{module}</p>
                    <div className="module-btns">
                      <button onClick={() => openModule(module)}>
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
