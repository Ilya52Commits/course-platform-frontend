import { useState } from "react";
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

  const [nameModule, setNameModule] = useState("");
  const [arrayModules, setArrayModules] = useState({});
  
  const addModule = async (e) => {
    e.preventDefault();

    const HOST = "localhost:8000";
    const END_POINT = "/api/create-module";
    const END_POINT_GET_MODULES = "/api/get-modules";

    let idCourse = props.courseId;

    const postResponse = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            nameModule,
            idCourse,
        }),
    });

    if (postResponse.ok) {
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
      }
    };

    const editModule = async (idModule, nameModule) => {
      props.setModule(idModule);
      console.log(nameModule)
      props.setNameModule(nameModule)
      navigate("/create-lesson");
    }

    return (
    <>
      <main>
        <div className="container">
          <div className="create-module-page">
            <div className="create-module-page-content">
              <h2>Курс: {props.nameCourse}</h2>
              <h3>Добавление модуля курса</h3>
              <form>
                <div>
                  <label>Название модуля*</label>
                  <input
                    type="text"
                    onChange={(e) => setNameModule(e.target.value)}
                  />
                </div>
                <button type="submit" className="add-btn" onClick={addModule}>
                  <img src="/src/assets/images/plus.svg" alt="logo" />
                </button>
              </form>
              <ul className="created-modules">
                {Object.keys(arrayModules).map((moduleId) => (
                  <li key={moduleId} className="created-modules-item">
                    <p>{arrayModules[moduleId]}</p>
                    <div className="module-btns">
                      <button onClick={() => editModule(moduleId, arrayModules[moduleId])}>
                        <img src="/src/assets/images/edit-text.svg" />
                      </button>
                      <button>
                        <img src="/src/assets/images/trash.svg"/>
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
