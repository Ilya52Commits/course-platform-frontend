import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setRedirect(true);
  };

  if (redirect) {
    return navigate("/login");
  }

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
