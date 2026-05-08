import "./authPage.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import { useToast } from "../../components/toast/toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const { setCurrentUser } = useAuthStore();

  const handleGoogleLogin = () => {
    const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT?.replace(/\/$/, "");

    if (!apiBaseUrl) {
      setError("Google sign in is not configured.");
      return;
    }

    window.location.href = `${apiBaseUrl}/users/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        data
      );

      setCurrentUser(res.data);
      toast.success(
        isRegister ? "Account created" : "Signed in",
        isRegister ? "Welcome to Pinora." : "Welcome back."
      );

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(isRegister ? "Could not create account" : "Could not sign in", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <aside className="authArtwork" aria-hidden="true">
          <img className="authArtworkImage" src="/pins/pin23.jpeg" alt="" />
          <div className="authBrand">
            <img src="/pinora-logo.png" width={54} height={54} alt="" />
            <span>Pinora</span>
          </div>
        </aside>

        <section className="authPanel">
          <div className="authTabs">
            <button
              className={isRegister ? "active" : ""}
              type="button"
              onClick={() => {
                setError("");
                setIsRegister(true);
              }}
            >
              Create Account
            </button>
            <button
              className={!isRegister ? "active" : ""}
              type="button"
              onClick={() => {
                setError("");
                setIsRegister(false);
              }}
            >
              Sign In
            </button>
          </div>

          <form
            key={isRegister ? "register" : "loginForm"}
            onSubmit={handleSubmit}
          >
            {isRegister && (
              <>
                <div className="formGroup">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="divine"
                    required
                    name="username"
                    id="username"
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="displayName">Name</label>
                  <input
                    type="text"
                    placeholder="Divine Adeyeye"
                    required
                    name="displayName"
                    id="displayName"
                  />
                </div>
              </>
            )}
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="devs@pinora.co"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <div className="labelRow">
                <label htmlFor="password">Password</label>
                {!isRegister && (
                  <button type="button" className="forgotButton">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="passwordInput">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  id="password"
                />
                <button
                  className="passwordToggle"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HugeiconsIcon icon={ViewOffSlashIcon} /> : <HugeiconsIcon icon={ViewIcon} />}
                </button>
              </div>
            </div>
            <button className="submitButton" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isRegister
                  ? "Creating account..."
                  : "Signing in..."
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <div className="authDivider">
            <span>or</span>
          </div>

          <button
            className="googleButton"
            type="button"
            onClick={handleGoogleLogin}
          >
            <span aria-hidden="true">G</span>
            Continue with Google
          </button>

          <p className="termsText">
            By continuing you agree to our <a href="#">Terms</a> ·{" "}
            <a href="#">Privacy</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
