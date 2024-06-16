import { useState } from "react";
import PropTypes from "prop-types";

CoursePage.propTypes = {
  course: PropTypes.string.isRequired,
};

export default function CoursePage(props) {
  const [nameModule, setNameModule] = useState("");
  const [arrayModules, setArrayModules] = useState([]);
  
  const addModule = async (e) => {
    e.preventDefault();

    const HOST = "localhost:8000";
    const END_POINT = "/api/create-module";
    const END_POINT_GET_MODULES = "/api/get-modules";

    let nameCourse = props.course;

    const postResponse = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            nameModule,
            nameCourse,
        }),
    });

    if (postResponse.ok) {
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
            console.log(modules)
            setArrayModules(modules);
        }
      }
    };


  return (
    <>
      <main>
        <div className="container">
          <div className="course-page">
            <div className="course-page-content">
              <h2>Курс: {props.course.toUpperCase()}</h2>
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
              <ul className="course-modules">
                {arrayModules.map((module, index) => (
                  <li key={index} className="course-modules-item">
                    <p>{module}</p>
                    <div className="module-btns">
                      <button>
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
