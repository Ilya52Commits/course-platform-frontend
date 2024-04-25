import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [repeat, setRepeat] = useState("");
  const [message, setMessage] = useState("");

  const HOST = "localhost:8000";
  const END_POINT = "/api/mail-confirm";

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://${HOST}${END_POINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        repeat,
      }),
    });

    setRepeat("");

    const data = await response.json();

    setMessage(data.message);
  };

  const repeatMail = async () => {
    setRepeat("yes");
  };

  const asyncFunction = async () => {
    if (message === "Почта подтверждена") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
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
                <h3>Подтвердите почту</h3>
                <form onSubmit={submit}>
                  <input
                    type="text"
                    placeholder="XXXXX"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {<p>{message}</p>}
                  <input
                    type="submit"
                    value={repeat !== "" ? "Отправить повторно" : "Подтвердить"}
                  />
                </form>
                {message !== "Почта подтверждена" ? (
                  <button onClick={repeatMail}>Повторить отправку</button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
