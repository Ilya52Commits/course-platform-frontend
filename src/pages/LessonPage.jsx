import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';

LessonPage.propTypes = {
    module: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired,
};

export default function LessonPage(props) {
    const [nameLesson, setNameLesson] = useState("")
    const [urlLesson, setUrlLesson] = useState("");
    const [taskLesson, setTaskLesson] = useState("");

    const HOST = "localhost:8000" 
    const END_POINT = "/api/get-lesson"

    let idLesson = props.lessonId;

    useEffect(() => {
    (async () => {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            idLesson,
          }),
      });

      const data = await response.json();
      setNameLesson(data["name"])
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
              <h1>{nameLesson}</h1>
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
