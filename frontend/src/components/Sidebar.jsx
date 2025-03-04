import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbProgress } from "react-icons/tb";
import { HiOutlineViewBoards } from "react-icons/hi";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { GrTask } from "react-icons/gr";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiUsersFourLight } from "react-icons/pi";
import { FiUserPlus } from "react-icons/fi";
import { LuUserPlus2 } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";


import { RiFunctionAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import BottomBar from "./BottomBar";
import { SlBadge } from "react-icons/sl";
const Sidebar = () => {
  const {currentUser} = useSelector(state=>state.user)
  const [tab, setTab] = useState(null);
  return (
    <div className="px-3 sticky top-0 ">
      <div className="flex flex-col gap-5  mt-10 text-lg border-black border-r-2 px-2">
        <Link
          onClick={() => setTab("home")}
          to={"/"}
          className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
            tab === "home" && "bg-zinc-800 text-white rounded-md p-1"
          }`}
        >
          <AiOutlinePieChart className="text-xl" />
          Home
        </Link>
        {/* <Link
          onClick={() => setTab("overview")}
          to={"/overview"}
          className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
            tab === "overview" && "bg-zinc-800 text-white rounded-md p-1"
          }`}
        >
          <HiOutlineViewColumns />
          Overview
        </Link> */}
        <Link
          onClick={() => setTab("tasks")}
          to={"/tasks"}
          className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
            tab === "tasks" && "bg-zinc-800 text-white rounded-md p-1"
          }`}
        >
          <GrTask />
          Tasks
        </Link>
        {/* <Link
          onClick={() => setTab("completed")}
          to={"/completed"}
          className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
            tab === "completed" && "bg-zinc-800 text-white rounded-md p-1"
          }`}
        >
          <IoMdCheckmarkCircleOutline />
          Completed
        </Link> */}

        {currentUser && currentUser.title === "admin" && (
          <>
            <Link
              onClick={() => setTab("createTeam")}
              to={"/teams"}
              className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
                tab === "createTeam" && "bg-zinc-800 text-white rounded-md p-1"
              }`}
            >
              <FaUsersRectangle />
               Team
            </Link>
            <Link
              onClick={() => setTab("users")}
              to={"/allusers"}
              className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
                tab === "users" && "bg-zinc-800 text-white rounded-md p-1"
              }`}
            >
              <PiUsersFourLight />
              Users
            </Link>
            <Link
              onClick={() => setTab("addnewuser")}
              to={"/addnewuser"}
              className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
                tab === "addnewuser" && "bg-zinc-800 text-white rounded-md p-1"
              }`}
            >
              {/* <FiUserPlus /> */}
              <LuUserPlus2 />
              <span className="text-xs tracking-widest font-thin">
                ADD
              </span>{" "}
              User
            </Link>

            <Link
              onClick={() => setTab("addtask")}
              to={"/addtask"}
              className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
                tab === "addtask" && "bg-zinc-800 text-white rounded-md p-1"
              }`}
            >
              <RiFunctionAddLine />
              <span className="text-xs tracking-widest font-thin">
                ADD
              </span>{" "}
              Task
            </Link>

            <Link
              onClick={() => setTab("designations")}
              to={"/roles"}
              className={` hover:pl-2   duration-300 flex flex-row items-center   gap-2 ${
                tab === "designations" && "bg-zinc-800 text-white rounded-md p-1"
              }`}
            >
              <SlBadge />
             
              Roles
            </Link>
          </>
        )}
      </div>

      
    </div>
  );
};

export default Sidebar;
