import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

CreateCoursePage.propTypes = {
  setCourse: PropTypes.func.isRequired,
};

export default function CreateCoursePage(props) {
  const navigate = useNavigate();

  const HOST = "localhost:8000";
  const END_POINT = "/api/create-course";

  const [nameCourse, setNameCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Опция credentials указывает, должен ли fetch
      // отправлять куки и авторизационные заголовки HTTP вместе с запросом. "include" – отправлять всегда,
      body: JSON.stringify({
        nameCourse,
        descriptionCourse,
      }),
    });

    const data = await response.json();

    setMessage(data.message);
  };

  const navigateToPage = async () => {
    if (message === "Курс успешно создан") {
      props.setCourse(nameCourse);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/create-module");
    }
  };

  navigateToPage();

  return (
    <>
      <main>
        <div className="container">
          <div className="create-course-block">
            <div className="create-course-block-content">
              <form onSubmit={submit}>
                <div>
                  <h2>Введите название курса*</h2>
                  <input
                    type="text"
                    onChange={(e) => setNameCourse(e.target.value)}
                  />
                </div>
                <div>
                  <h2>Добавьте описание</h2>
                  <textarea
                    name="comment"
                    onChange={(e) => setDescriptionCourse(e.target.value)}
                  ></textarea>
                </div>
                {<p>{message}</p>}
                <input type="submit" value={"Создать"} />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
