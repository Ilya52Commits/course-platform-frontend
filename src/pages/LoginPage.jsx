import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return navigate("/");
  };

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
