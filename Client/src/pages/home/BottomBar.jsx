import { Bookmark, BookMarkedIcon, Home, User } from "lucide-react";
import { Link } from "react-router";

const BottomBar = ({ active, setActive }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/60 border-t shadow-md flex justify-around items-center h-14 z-50">
      <Link to={"/"}>
        <button onClick={() => setActive("home")}>
          <Home
            size={26}
            className={active === "home" ? "text-white" : "text-gray-400"}
          />
        </button>
      </Link>

      <button onClick={() => setActive("bookmark")}>
        <Bookmark
          size={22}
          className={active === "bookmark" ? "text-white" : "text-gray-400"}
        />
      </button>

      <Link to={"/profile"}>
        <button onClick={() => setActive("profile")}>
          <User
            size={26}
            className={active === "profile" ? "text-white" : "text-gray-400"}
          />
        </button>
      </Link>
    </div>
  );
};

export default BottomBar;
