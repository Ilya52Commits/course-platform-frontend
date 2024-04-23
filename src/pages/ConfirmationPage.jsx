import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const HOST = "localhost:8000";
  const END_POINT = "/api/register";

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

      if (!response.ok) {
        throw new Error("Неправильный код!");
      }

      setRedirect(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (redirect) {
    return navigate("/login");
  }

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
                  {error && <p className="error-message">{error}</p>}
                  <input type="submit" value={"Подтвердить"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
