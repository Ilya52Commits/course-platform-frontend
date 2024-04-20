import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to={"/"} className="header-content-logo">
            <img src="/src/assets/images/learning.svg" alt="logo" />
            <p>Platform Courses</p>
          </Link>
          <div className="header-navigation">
            <Link to={"/login"}>
              <p>Войти</p>
            </Link>
            <p>|</p>
            <Link to={"/register"}>
              <p>Регистрация</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
