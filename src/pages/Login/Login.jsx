import { useState } from "react";
import logo from "../../assets/nexora.png";
import "./Login.css";
import { Link } from "wouter";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

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
          <form className="auth-form">
            <article className="input-container">
              <label>Username or Email</label>
              <input type="text" placeholder="example@domain.com" />
            </article>
            <article className="input-container">
              <label>Password</label>
              <section className="input">
                <input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="* * * * * *"
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
