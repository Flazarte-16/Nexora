import { useState } from "react";
import logo from "../../assets/nexora.png";
import { Link } from "wouter";

export const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputForm, setInputForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputForm = (e) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <main className="main main--auth">
      <section className="auth-left">
        <img src={logo} alt="nexora logo" />
        <h2 className="title xl">Connect with the world.</h2>
        <p className="subtitle xl secondary">
          Join our premium community and experience social media in a completely
          new light.
        </p>
      </section>
      <section className="auth-right">
        <section className="auth-right-top">
          <h2 className="title">Welcome</h2>
          <p className="subtitle">
            Enter your credentials to create your account.
          </p>
        </section>
        <section className="auth-right-center">
          <form className="auth-form" onSubmit={handleSubmit}>
            <article className="input-container">
              <label>Username</label>
              <input
                type="text"
                placeholder="example"
                name="username"
                onChange={handleInputForm}
              />
            </article>
            <article className="input-container">
              <label>Email</label>
              <input
                type="text"
                placeholder="example@domain.com"
                name="email"
                onChange={handleInputForm}
              />
            </article>
            <article className="input-container">
              <label>Password</label>
              <section className="input">
                <input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="* * * * * *"
                  name="password"
                  onChange={handleInputForm}
                />
                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  <ion-icon
                    name={isShowPassword ? "eye-outline" : "eye-off-outline"}
                  ></ion-icon>
                </button>
              </section>
            </article>
            <article className="input-container">
              <label>Confirm password</label>

              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="* * * * * *"
                name="confirmPassword"
                onChange={handleInputForm}
              />
            </article>
            <button className="btn">Continue</button>
          </form>
          <p className="subtitle">
            Already have an account?{" "}
            <Link to="/" className="redirect">
              Log in
            </Link>
          </p>
        </section>
        <section className="auth-right-footer">
          <p>&copy;{new Date().getFullYear()} Nexora Inc</p>
        </section>
      </section>
    </main>
  );
};
