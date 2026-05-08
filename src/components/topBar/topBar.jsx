import { useNavigate } from "react-router";
import { Link } from "react-router";
import UserButton from "../userButton/userButton";
import "./topBar.css";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar">
      <div className="topBarTitle">
        <span>Explore</span>
      </div>
      <form onSubmit={handleSubmit} className="search">
        <HugeiconsIcon icon={Search01Icon} size={20} aria-hidden="true" />
        <input type="text" placeholder="Search" />
      </form>
      <div className="topBarActions">
        <Link to="/create" className="topCreateButton">
          Create
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
