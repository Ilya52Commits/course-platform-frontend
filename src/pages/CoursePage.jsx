import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CoursePage.propTypes = {
  course: PropTypes.string.isRequired,
};

export default function CoursePage(props) {
  const listModules = [];

  const [nameModule, setNameModule] = useState("");

  const addModule = async (e) => {
    e.preventDefault();

    const HOST = "http://127.0.0.1:8000";
    const END_POINT = "/api/create-module";

    let nameCourse = props.course;

    const response = await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Опция credentials указывает, должен ли fetch
      // отправлять куки и авторизационные заголовки HTTP вместе с запросом. "include" – отправлять всегда,
      body: JSON.stringify({
        nameModule,
        nameCourse,
      }),
    });

    const data = await response.json();

    listModules.push(data.Name);
    // РЕАЛИЗОВАТЬ СЧИТЫВАНИЕ МОДУЛЕЙ С МАССИВА, НО ПЕРЕД ЭТИМ ПРОВЕРИТЬ, РАБОТАЕТ ЛИ
    // вызов функции создания кода для заметки
    //listModules.insertAdjacentHTML("beforeend", createNotes(notesArray[i], i));
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
                <li className="course-modules-item">
                  <p>Названи: saldjf</p>
                  <div className="module-btns">
                    <button>
                      <img src="/src/assets/images/edit-text.svg" />
                    </button>
                    <button>
                      <img src="/src/assets/images/trash.svg" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
