import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CreateLessonPage.propTypes = {
  module: PropTypes.string.isRequired,
  setLesson: PropTypes.func.isRequired,
};

export default function CreateLessonPage(props) {
  const navigate = useNavigate();

  const [nameLesson, setNameLesson] = useState("");
  const [taskLesson, setTaskLesson] = useState("");
  const [urlVideoLesson, setUrlVideoLesson] = useState("");
  const [arrayLessons, setArrayLessons] = useState([]);
  
  const addLesson = async (e) => {
    e.preventDefault();

    const HOST = "localhost:8000";
    const END_POINT = "/api/create-lesson";
    const END_POINT_GET_MODULES = "/api/get-lessons";

    let nameModule = props.module;

    const postResponse = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            nameModule,
            nameLesson,
            taskLesson,
            urlVideoLesson,
        }), 
    });

    if (postResponse.ok) {
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
            setArrayLessons(lessons);
        }
      }
    };

  const openLesson = (lesson) => {
    props.setLesson(lesson)
    navigate("/lesson-page")
  }

    return (
    <>
      <main>
        <div className="container">
          <div className="create-lesson-page">
            <div className="create-lesson-page-content">
              <h2>Модуль: {props.module}</h2>
              <form>
                <div className="input-lesson">
                    <div>
                        <label>Добавление названия урока: </label>
                        <input
                            type="text"
                            onChange={(e) => setNameLesson(e.target.value)}
                        />
                    </div>
                    <div id="input-tast">
                        <label>Добавление задание: </label>
                        <input
                            type="text"
                            onChange={(e) => setTaskLesson(e.target.value)}
                        />
                    </div>
                    <div id="input-url-video">
                        <label>Добавление видео урока: </label>
                        <input
                            type="text"
                            onChange={(e) => setUrlVideoLesson(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn" onClick={addLesson}>
                  <img src="/src/assets/images/plus.svg" alt="logo" />
                </button>
              </form>
              <ul className="created-lessons">
                {arrayLessons.map((lesson, index) => (
                  <li key={index} className="created-lessons-item">
                    <p>{lesson}</p>
                    <div className="lesson-btns">
                      <button id="open-lesson" onClick={() => openLesson(lesson)}>
                        Открыть
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
