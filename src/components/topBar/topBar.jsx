import { useNavigate } from "react-router";
import { Link } from "react-router";
import Image from "../image/image";
import UserButton from "../userButton/userButton";
import "./topBar.css";

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
        <Image path="/general/search.svg" alt="" />
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
