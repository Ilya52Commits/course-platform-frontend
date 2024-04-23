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
  const [redirect, setRedirect] = useState("");

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

    props.setName(connect.name);
    setRedirect(true);
  };

  if (redirect) {
    return navigate("/");
  }

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
