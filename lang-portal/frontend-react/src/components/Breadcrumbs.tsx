
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getCrumbText = (pathname: string) => {
    switch (pathname) {
      case "study-activities":
        return "Study Activities";
      default:
        return pathname.charAt(0).toUpperCase() + pathname.slice(1);
    }
  };

  return (
    <div className="container flex h-10 items-center gap-1 text-sm text-muted-foreground">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            {isLast ? (
              <span className="font-medium text-foreground">
                {getCrumbText(value)}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-foreground transition-colors duration-200"
              >
                {getCrumbText(value)}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
