import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    try {
      setLoading(true);
      await register(form);
      setOk("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setErr(error?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authGlow" />
      <div className="authNoise" />

      <div className="authCard authCardEnter">
        <div className="authTop">
          <div className="authBadge">Create account</div>
          <h2 className="authTitle">Register</h2>
          <p className="authSub">Sign up to access the portal.</p>
        </div>

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="field fieldEnter" style={{ animationDelay: "80ms" }}>
            <input
              className="authInput"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <span className="fieldGlow" />
          </div>

          <div className="field fieldEnter" style={{ animationDelay: "140ms" }}>
            <input
              className="authInput"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <span className="fieldGlow" />
          </div>

          <div className="field fieldEnter" style={{ animationDelay: "200ms" }}>
            <div className="authPasswordWrap">
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <span className="fieldGlow" />
          </div>

          <button
            className="authBtn authBtnEnter"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {!!err && <p className="authMsg authErr">❌ {err}</p>}
          {!!ok && <p className="authMsg authOk">✅ {ok}</p>}
        </form>
      </div>
    </div>
  );
}
