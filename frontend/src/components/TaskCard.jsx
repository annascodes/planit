import React from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsPaperclip } from "react-icons/bs";
import { TbCircleFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { RxDash } from "react-icons/rx";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import moment from "moment";
import { HiOutlineSelector } from "react-icons/hi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
// import { TfiMoreAlt } from "react-icons/tfi";
import { GoArrowUpLeft } from "react-icons/go";
import TaskStatusBadges from "./TaskStatusBadges";
import TaskPriority from "./TaskPriority";


const TaskCard = ({ task }) => {
  const priorityIcons = {
    normal: (
      <span className=" bg-blue-100 px-1 flex flex-row gap-1 items-center justify-center  text-blue-600">
        <RxDash className="text-2xl" />
        NORMAL PRIORITY
      </span>
    ),

    medium: (
      <span className="bg-yellow-100 px-1 flex flex-row gap-1 items-center justify-center  text-yellow-600">
        <MdOutlineKeyboardArrowUp className="text-2xl" />
        MEDIUM PRIORITY
      </span>
    ),

    high: (
      <span className="bg-red-100 px-1 flex flex-row gap-1 items-center justify-center  text-red-600">
        <MdOutlineKeyboardDoubleArrowUp className="text-2xl" />
        HIGH PRIORITY
      </span>
    ),
  };

  const taskColor = {
    completed: "green",
    todo: "blue",
    inprogress: "yellow",
  };
  return (
    <div>
      <div

        // className="relative border border-black duration-500 p-3 rounded-xl  min-w-80 md:min-w-96 max-w-96 bg-white  "
        className="relative border border-black duration-500 p-3 rounded-xl w-96 bg-white  "

      >


        {/* <div className={`flex flex-row justify-between text-sm items-center`}>
        {priorityIcons[task?.priority]}
      </div> */}
        {
          !task.isSeen &&
          <span className="absolute -top-2 -left-2 tracking-widest bg-blue-500 text-gray-100 px-1 rounded-md uppercase text-xs">new</span>
        }

        <TaskPriority priority={task?.priority} />

        <div className="my-3">
          <span className="mr-1 uppercase text-xs tracking-widest  rounded-xl px-1">
            Assigned to:
          </span>
          {task?.assignedToUser && (
            <span className="bg-black text-white p-1 rounded-lg">
              @{task?.assignedToUser.username} | {task?.assignedToUser.title}
            </span>
          )}

          {task?.assignedToTeam && (
            <span className="  bg-zinc-800 text-white p-1  rounded-lg px-2">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  className=" flex flex-row text-sm  items-center"
                  role="button"
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <GoArrowUpLeft className="text-blue-400 text-md" /> */}
                  {task?.assignedToTeam.teamName} (
                  {task?.assignedToTeam.team.length})
                  <HiOutlineSelector className="text-xl ml-1" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content card card-compact bg-white  text-black border-2 border-black z-[1] w-64 p-2 shadow"
                >
                  <div className="card-body max-h-40 overflow-auto   ">
                    {task?.assignedToTeam.team.map((tm, tm_i) => {
                      return (
                        <p className="flex flex-row items-center gap-2 text-base">
                          <span className="text-xs">{++tm_i}</span>
                          <img
                            src={
                              tm.profileImg ||
                              `https://avatar.iran.liara.run/public/boy?username=${tm.username}`
                            }
                            className="w-10 h-10"
                            alt=""
                          />
                          <span>{tm.username} </span>
                          <span className="text-xs text-gray-400">
                            {tm.title}{" "}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </span>
          )}
        </div>

        <div className=" ">
          <Link to={`/taskdetails/${task?._id}`} className="">

            <h1>
              <TaskStatusBadges status={task?.status} />
            </h1>
            <h1
              className={` hover:text-blue-500 text-md  duration-200 ${task?.status === "completed" && "line-through"
                }`}
            >
              {task?.title.slice(0, 80)}{" "}
              <span className=" text-gray-400 text-sm  gap-2">
                {task?.title.length > 79 && "... more"}
              </span>
            </h1>
          </Link>
        </div>

        <h1 className="text-gray-400 text-sm flex flex-row justify-between mt-5">
          <span className="flex flex-row items-center gap-1">
            <IoCalendarOutline className="text-xl" />
            {moment(task?.createdAt).format("Do MMM YYYY")}
          </span>
          <span
            className={`${moment(task?.deadline).fromNow().toString().includes("ago")
                ? "text-red-400"
                : "text-blue-400"
              }`}
          >
            Deadline {moment(task?.deadline).fromNow()}
          </span>
        </h1>
        {/* 
      <div className="flex flex-row  gap-3 border-t-2  border-b-2 py-2 my-1">
        <span className="flex items-center  ">
          <BiMessageSquareDetail className="text-xl" />5
        </span>
        <span className="flex items-center">
          <BsPaperclip className="text-xl" />2
        </span>
      </div> */}

        <div className="border-0 min-h-24  border-t-2 mt-5">
          <span className="tracking-widest text-xs">
            SUB-TASKS ({task?.subtasks.length})
          </span>

          {[...Array(3)].map((_, i) => {
            return (
              task?.subtasks[i] && (
                <div className="my-2">
                  <h1 className="flex text-sm">
                    {/* <TbCircleFilled
                    className={`text-xl text-${
                      taskColor[task?.subtasks[i].status]
                    }-500 rounded-full mr-1`}
                  /> */}
                    <TaskStatusBadges onlyColor={true} status={task?.subtasks[i].status} fontsize={"[8px]"} />

                    <span
                      className={`ml-2 flex flex-row justify-between w-full ${task?.subtasks[i].status === "completed" && "line-through"
                        }`}
                    >
                      {task?.subtasks[i].title}
                      {/* {task?.subtasks[i]?.title.length > 33 && "..."} */}
                      <span className="text-gray-400 ml-2">
                        {moment(task?.subtasks[i].createdAt).format(
                          "Do MMM YYYY"
                        )}
                      </span>
                    </span>
                  </h1>
                </div>
              )
            );
          })}
        </div>
        <div className=" text-xs text-center tracking-widest">
          <Link to={`/taskdetails/${task?._id}`} className="duration-200 hover:underline underline-offset-4">
            {task?.subtasks.length - 3 > 0 &&
              (task?.subtasks.length - 3 > 1 ? (
                <span>{task?.subtasks.length - 3} more sub-tasks</span>
              ) : (
                <span>{task?.subtasks.length - 3} more sub-task</span>
              ))}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
