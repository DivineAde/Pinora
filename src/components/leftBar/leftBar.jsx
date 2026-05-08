import { Link, useNavigate } from "react-router";
import "./leftBar.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CameraAdd03Icon,
  Chat01Icon,
  Home01Icon,
  Logout03Icon,
  Notification01Icon,
  Settings05Icon,
} from "@hugeicons/core-free-icons";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import { useToast } from "../toast/toast";

const LeftBar = () => {
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useAuthStore();
  const toast = useToast();

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
      navigate("/auth");
    }
  };

  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <img src="/pinora-logo.png" alt="" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <HugeiconsIcon icon={Home01Icon} />
        </Link>
        <Link to="/create" className="menuIcon">
          <HugeiconsIcon icon={CameraAdd03Icon} />
        </Link>
        <Link to="/" className="menuIcon">
          <HugeiconsIcon icon={Notification01Icon} />
        </Link>
        <Link to="/" className="menuIcon">
         <HugeiconsIcon icon={Chat01Icon} />
        </Link>
      </div>
      <div className="menuBottom">
        <Link to="/" className="menuIcon">
          <HugeiconsIcon icon={Settings05Icon} />
        </Link>
        {currentUser && (
          <button
            className="menuIcon logoutIcon"
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <HugeiconsIcon icon={Logout03Icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
