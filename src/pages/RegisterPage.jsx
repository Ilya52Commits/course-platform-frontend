import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const HOST = "localhost:8000";
  const END_POINT = "/api/register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    setMessage(data.message);

    if (message === "Почта не коректная") {
      setRedirect(false);
    } else {
      setRedirect(true);
    }
  };

  const asyncFunction = () => (redirect ? navigate("/confirm") : "");

  asyncFunction();

  return (
    <>
      <main>
        <div className="container">
          <div className="sign">
            <div className="sign-block">
              <div className="sign-content">
                <h3>Пожалуйста зарегистрируйтесь!</h3>

                <form onSubmit={submit}>
                  <input
                    type="text"
                    placeholder="Имя"
                    onChange={(e) => setName(e.target.value)}
                  />
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
                  <input type="submit" value={"Зарегистрироваться"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
