import React from "react";
import { MdDashboard, MdGppBad, MdLogout } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = location.pathname;
  console.log("Current path:", location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center px-6">

      {/* Username */}
      <h1 className="text-2xl text-white mt-5 font-bold">
        {user?.name}
      </h1>

      {/* Dashboard */}
      <div
        onClick={() => navigate("/")}
        className={`${
          activeMenu === "/"
            ? "bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] !text-white"
            : "!text-white"
        } text-xl font-bold flex gap-4 rounded-xl p-3 items-center justify-center w-full cursor-pointer`}
      >
        <MdDashboard />
        <span>Dashboard</span>
      </div>

      {/* Alerts */}
      <div
        onClick={() => navigate("/alerts")}
        className={`${
          activeMenu === "/alerts"
            ? "bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] !text-white"
            : "!text-white"
        } text-xl font-bold flex gap-4 rounded-xl p-3 items-center justify-center w-full cursor-pointer`}
      >
        <IoNotifications />
        <span>Alerts</span>
      </div>

      {/* Attacks */}
      <div
        onClick={() => navigate("/attacks")}
        className={`${
          activeMenu === "/attacks"
            ? "bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] !text-white"
            : "!text-white"
        } text-xl font-bold flex gap-4 rounded-xl p-3 items-center justify-center w-full cursor-pointer`}
      >
        <MdGppBad />
        <span>Attacks</span>
      </div>

      {/* Websites */}
      <div
        onClick={() => navigate("/websites")}
        className={`${
          activeMenu === "/websites"
            ? "bg-gradient-to-br from-indigo-400/[0.10] via-white/[0.04] to-blue-500/[0.06] !text-white"
            : "!text-white"
        } text-xl font-bold flex gap-4 rounded-xl p-3 items-center justify-center w-full cursor-pointer`}
      >
        <FiGlobe />
        <span>Websites</span>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="text-xl font-bold !text-white flex gap-4 items-center justify-center p-3 w-full cursor-pointer"
      >
        <MdLogout />
        <span>Logout</span>
      </div>

    </div>
  );
};

export default SideBar;