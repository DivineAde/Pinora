import { useEffect, useRef, useState } from "react";
import "./userButton.css";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";
import { useToast } from "../toast/toast";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const userButtonRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();

  // TEMP
  // const currentUser = true;

  const { currentUser, removeCurrentUser } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      toast.success("Signed out", "You have been logged out.");
      navigate("/auth");
    } catch (err) {
      console.log(err);
      toast.error(
        "Could not log out",
        err.response?.data?.message || "Please try again."
      );
    }
  };

  return currentUser ? (
    <div className="userButton" ref={userButtonRef}>
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
