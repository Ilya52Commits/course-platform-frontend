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
          <Link to={"/sign-in"} className="header-content-sign">
            <img src="/src/assets/images/user.svg" alt="user" />
            <p>Войти</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
