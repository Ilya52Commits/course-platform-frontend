import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

HomePage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function HomePage(props) {
  const navigate = useNavigate();

  const [typePage, setTypePage] = useState(""); 
  
  const navigateToCrate = async () => {
    setTypePage("create");
  }
  const navigateToOpen = async () => {
    setTypePage("open");
  }

  const navigateToPage = async () => {
    if (typePage === "create") navigate("/create-course");
    else if (typePage === "open") navigate("/open-courses")
  }

  navigateToPage()

  let content;

  if (!props.name) {
    content = "Вы не вошли в аккаунт!";
  } else {
    content = (
      <div className="container">
        <div className="main-content">
          <h1>Разместите свои курсы</h1>
          <div className="buttons-main">
            <button onClick={navigateToCrate}>Создать курс</button>
            <button onClick={navigateToOpen}>Открыть курс</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <main>{content}</main>
    </>
  );
}
