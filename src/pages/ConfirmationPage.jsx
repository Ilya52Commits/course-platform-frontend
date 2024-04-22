export default function ConfirmationPage() {
  return (
    <>
      <main>
        <div className="container">
          <div className="sign-in">
            <div className="sign-block">
              <div className="sign-content">
                <h3>Подтвердите почту</h3>
                <form>
                  <input type="text" placeholder="XXXX-XXXX" />
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
