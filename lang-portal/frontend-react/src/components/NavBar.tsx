
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/dashboard" className="mr-8 font-bold text-xl">
          漢字 Explorer
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/study-activities"
            className={`nav-link ${isActive("/study-activities") ? "active" : ""}`}
          >
            Study Activities
          </Link>
          <Link
            to="/words"
            className={`nav-link ${isActive("/words") ? "active" : ""}`}
          >
            Words
          </Link>
          <Link
            to="/groups"
            className={`nav-link ${isActive("/groups") ? "active" : ""}`}
          >
            Word Groups
          </Link>
          <Link
            to="/sessions"
            className={`nav-link ${isActive("/sessions") ? "active" : ""}`}
          >
            Sessions
          </Link>
          <Link
            to="/settings"
            className={`nav-link ${isActive("/settings") ? "active" : ""}`}
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
