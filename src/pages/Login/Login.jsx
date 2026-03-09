import { useState } from "react";
import logo from "../../assets/nexora.png";
import "./Login.css";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputForm, setInputForm] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login } = useAuth();

  const [_, navigate] = useLocation();

  const handleInputForm = (e) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(inputForm);
    if (response.type === "OK") navigate("/home");
    alert(response.message);
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
          <h2 className="title">Welcome back</h2>
          <p className="subtitle">
            Enter your credentials to access your account.
          </p>
        </section>
        <section className="auth-right-center">
          <form className="auth-form" onSubmit={handleSubmit}>
            <article className="input-container">
              <label>Username or Email</label>
              <input
                type="text"
                placeholder="example@domain.com"
                name="emailOrUsername"
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
            <button className="btn">Continue</button>
          </form>
          <p className="subtitle">
            Don't have an account?{" "}
            <Link to="/register" className="redirect">
              Sign up for free
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
