import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "../utils/config.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          email: credentials.email,
          password: credentials.password
        },
        { withCredentials: true }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ safe values
      const token = res.data.token || "";
      const role = res.data.role || "user";
      const user = res.data.data || {};

      // save auth
      localStorage.setItem(
        "auth",
        JSON.stringify({ token, role, user })
      );

      // ✅ success UI
      toast.success("Login Successful ✔");
      setMsg("Login successful! Redirecting...");

      // redirect logic
      let defaultPath = "/user";
      if (role === "admin") {
        defaultPath = "/admin";
      }

      const target = from || defaultPath;

      setTimeout(() => {
        navigate(target, { replace: true });
      }, 800);

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const backendMsg = err.response?.data?.message;

      toast.error(backendMsg || "Login failed!");
      setMsg(backendMsg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form__container">
      <div className="login__container">
        <div className="login__content">
          <img src={loginImg} alt="login" />
        </div>

        <div className="login__form">
          <div className="user">
            <img src={userIcon} alt="user" />
          </div>

          <h2>Login</h2>

          <form onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              value={credentials.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              value={credentials.password}
              onChange={handleChange}
            />

            {msg && <p className="auth-message">{msg}</p>}

            <button
              className="btn primary__btn auth__btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p>
              don't have an account?{" "}
              <Link to="/register">Create</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;