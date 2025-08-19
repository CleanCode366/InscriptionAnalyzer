import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  end?: boolean; // for exact match (used for "/")
}

const links: NavItem[] = [
  { path: "/home", label: "Home", end: true },
  { path: "/photos", label: "Photos" },
  { path: "/login", label: "Login" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row justify-between bg-secondary-background p-4 text-primary-text px-16">
      <div>
        <NavLink to="/home" end className="text-xl font-bold">
          Stone Inscriptions
        </NavLink>
      </div>

      <div className="flex gap-6">
        {links.map(({ path, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `hover:text-primary-dark ${
                isActive ? "text-primary-dark font-semibold" : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
