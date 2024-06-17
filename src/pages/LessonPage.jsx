import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';

LessonPage.propTypes = {
    module: PropTypes.string.isRequired,
    lesson: PropTypes.string.isRequired,
};

export default function LessonPage(props) {
    const [urlLesson, setUrlLesson] = useState("");
    const [taskLesson, setTaskLesson] = useState("");

    const HOST = "localhost:8000" 
    const END_POINT = "/api/get-lesson"

    let nameModule = props.module;

    useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            nameModule,
          }),
      });

      const data = await response.json();
      setUrlLesson(data["video"])
      setTaskLesson(data["task"])
    })();
    }), []; // Добавьте пустой массив зависимостей, чтобы эффект выполнялся только один раз при загрузке страницы

    return (
    <>
      <main>
        <div className="container">
          <div className="lesson-page">
            <div className="lesson-page-content">
              <h1>{props.lesson}</h1>
              <div className="lesson-video">
                <ReactPlayer url={urlLesson} />
              </div>

              <div className="lesson-task">
                <h3>
                    Задание: 
                </h3>
                <p>{taskLesson}</p>
                <textarea></textarea>
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
