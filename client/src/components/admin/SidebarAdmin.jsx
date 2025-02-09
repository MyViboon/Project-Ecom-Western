import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const SidebarAdmin = () => {
  const navItems = [
    {
      to: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2" />,
    },
    {
      to: "manage",
      label: "Manage",
      icon: <LayoutDashboard className="mr-2" />,
    },
    {
      to: "category",
      label: "Category",
      icon: <LayoutDashboard className="mr-2" />,
    },
    {
      to: "product",
      label: "Product",
      icon: <LayoutDashboard className="mr-2" />,
    },
  ];

  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen ">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            end={to === "/admin"} // Only apply `end` to the Dashboard link
            to={to}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
                : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
