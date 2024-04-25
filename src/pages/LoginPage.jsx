import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

LoginPage.propTypes = {
  setName: PropTypes.func.isRequired,
};

export default function LoginPage(props) {
  const navigate = useNavigate();

  const HOST = "localhost:8000";
  const END_POINT = "/api/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const connect = await response.json();

    setMessage(connect.message);

    if (!response.ok) throw new Error(message);

    props.setName(connect.name);
  };

  const asyncFunction = async () => {
    if (message === "Успешно") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } else if (message === "Вы не подтвердили почту") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/register");
    }
  };

  asyncFunction();

  return (
    <>
      <main>
        <div className="container">
          <div className="sign-in">
            <div className="sign-block">
              <div className="sign-content">
                <h3>Войти</h3>
                <form onSubmit={submit}>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {<p>{message}</p>}
                  <input type="submit" value={"Войти"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
