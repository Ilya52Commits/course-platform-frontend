import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  //const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const HOST = "localhost:8000";
  const END_POINT = "/api/mail-confirm";

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${HOST}${END_POINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await response.json(); // Преобразование ответа в формат JSON

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      //setRedirect(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const submitNavigate = async () => {
    if (message === "почта подтверждена") {
      navigate("/login");
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="sign-in">
            <div className="sign-block">
              <div className="sign-content">
                <h3>Подтвердите почту</h3>
                <form onSubmit={submit}>
                  <input
                    type="text"
                    placeholder="XXXXX"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {<p>{message}</p>}
                  {error && <p className="error-message">{error}</p>}
                  <input type="submit" value={"Подтвердить"} />
                </form>
                <button onClick={submitNavigate}>Авторизоваться</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
