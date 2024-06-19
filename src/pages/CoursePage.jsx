import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CoursePage.propTypes = {
  courseId: PropTypes.string.isRequired,
  nameCourse: PropTypes.string.isRequired,
  setNameModule: PropTypes.func.isRequired,
  setModule: PropTypes.func.isRequired,
};

export default function CoursePage(props) {
  const navigate = useNavigate();

  const [arrayModules, setArrayModules] = useState({});

  const HOST = "localhost:8000";
  const END_POINT_GET_MODULES = "/api/get-modules";

  let idCourse = props.courseId

  console.log(idCourse);

  useEffect(() => {
    (async () => { 
      // const getCourse = await fetch(`http://${HOST}${END_POINT_GET_COURSE}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     idCourse,
      //   }),
      // });

      // if (getCourse.ok) {
      //   const data = await getCourse.json();
      //   setNameCourse(data["name"])
      // }

      const getResponse = await fetch(`http://${HOST}${END_POINT_GET_MODULES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          idCourse,
        }),
    });

    if (getResponse.ok) {
        const data = await getResponse.json();
        const modules = {};
        data.forEach((module) => {
          modules[module.id] = module.name
        });
        setArrayModules(modules);
    }
    })();
  }, []); // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

  const openModule = (module, nameModule) => {
    props.setModule(module)
    props.setNameModule(nameModule)
    navigate("/module-page")
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="course-page">
            <div className="course-page-content">
              <h2>Курс: {props.nameCourse}</h2>
              <ul className="course-modules">
              {Object.keys(arrayModules).map((moduleId) => (
                  <li key={moduleId} className="course-modules-item">
                    <p>{arrayModules[moduleId]}</p>
                    <div className="module-btns">
                      <button onClick={() => openModule(moduleId, arrayModules[moduleId])}>
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
