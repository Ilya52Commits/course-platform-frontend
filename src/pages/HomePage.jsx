import { useState } from "react";
import { useEffect } from "react";

export default function HomePage() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const connect = await response.json();

      setName(connect.name);
    })();
  });
  return (
    <>
      {name ? "Hi " + name : "You are not logger in"}
      <main>
        <div className="container">
          <div className="main-content">
            <h1>Разместите свои курсы</h1>
            <div className="buttons-main">
              <button>Создать курс</button>
              <button>Открыть курс</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
