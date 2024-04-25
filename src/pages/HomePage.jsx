import PropTypes from "prop-types";

HomePage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function HomePage(props) {
  let content;

  if (!props.name) {
    content = "Вы не вошли в аккаунт!";
  } else {
    content = (
      <div className="container">
        <div className="main-content">
          <h1>Разместите свои курсы</h1>
          <div className="buttons-main">
            <button>Создать курс</button>
            <button>Открыть курс</button>
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
