import { useEffect, useRef, useState } from "react";
import "./userButton.css";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";
import { useToast } from "../toast/toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

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
      toast.success("Signed out", "You have been logged out.");
    } catch (err) {
      console.log(err);
      toast.error(
        "Could not log out",
        err.response?.data?.message || "Your local session has been cleared."
      );
    } finally {
      removeCurrentUser();
      setOpen(false);
      navigate("/auth");
    }
  };

  return currentUser ? (
    <div className="userButton" ref={userButtonRef}>
      <Image src={currentUser.img || "/general/noAvatar.png"} alt="" />
      <button
        className="arrow"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open user menu"
      >
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
      </button>
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
