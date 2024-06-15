import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Header.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default function Header(props) {
  const HOST = "localhost:8000";
  const END_POINT = "/api/logout";

  const logout = async () => {
    await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
  };

  let menu;

  if (!props.name) {
    menu = (
      <div className="header-navigation">
        <Link to={"/login"}>
          <p>Войти</p>
        </Link>
        <p>|</p>
        <Link to={"/register"}>
          <p>Регистрация</p>
        </Link>
      </div>
    );
  } else {
    menu = (
      <div className="header-navigation">
        <Link to={"/login"} onClick={logout}>
          <p>Выйти</p>
        </Link>
      </div>
    );
  }

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to={"/"} className="header-content-logo">
            <img src="/src/assets/images/learning.svg" alt="logo" />
            <p>Platform Courses</p>
          </Link>
          <div>{menu}</div>
        </div>
      </div>
    </header>
  );
}
