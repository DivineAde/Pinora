import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import { useToast } from "../../components/toast/toast";
import "./oauthCallbackPage.css";

const OAuthCallbackPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { setCurrentUser, removeCurrentUser } = useAuthStore();
  const hasHydratedSession = useRef(false);

  useEffect(() => {
    if (hasHydratedSession.current) return;
    hasHydratedSession.current = true;

    const hydrateGoogleSession = async () => {
      try {
        const res = await apiRequest.get("/users/auth/me");

        setCurrentUser(res.data);
        toast.success("Signed in", "Welcome to Pinora.");
        navigate("/", { replace: true });
      } catch (err) {
        removeCurrentUser();
        setError(
          err.response?.data?.message ||
            "Google sign in could not be completed."
        );
      }
    };

    hydrateGoogleSession();
  }, [navigate, removeCurrentUser, setCurrentUser, toast]);

  return (
    <div className="oauthCallbackPage">
      <section className="oauthCallbackPanel">
        <img src="/pinora-logo.png" alt="Pinora" />
        {error ? (
          <>
            <h1>Sign in failed</h1>
            <p>{error}</p>
            <Link to="/auth">Back to sign in</Link>
          </>
        ) : (
          <>
            <h1>Signing you in</h1>
            <p>Please wait while Pinora finishes your Google sign in.</p>
          </>
        )}
      </section>
    </div>
  );
};

export default OAuthCallbackPage;
