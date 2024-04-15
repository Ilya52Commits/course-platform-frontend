import Header from "../components/Header";

export default function SignInUpPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="sign-in">
            <div className="sign-block">
              <div className="sing-content">
                <h3>Войти</h3>
                <form>
                  <input type="email" />
                  <input type="password" />
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
