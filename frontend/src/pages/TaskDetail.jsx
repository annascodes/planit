import React, { useEffect, useState } from "react";

import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { RxDash } from "react-icons/rx";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";

import { LuCalendarDays } from "react-icons/lu";
import { BiCalendarX } from "react-icons/bi";
import { BsCalendarX } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import AddSubTask from "../components/AddSubTask";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { IoIosGitBranch } from "react-icons/io";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { HiOutlineExclamation } from "react-icons/hi";
import TaskActivities from "../components/TaskActivities";
import LoadingPage from "../components/LoadingPage";
import { useSelector } from "react-redux";

import { MdArrowOutward } from "react-icons/md";
import { GoArrowUpLeft } from "react-icons/go";
import TaskStatusBadges from "../components/TaskStatusBadges";
import DeletePermissionModal from "../components/DeletePermissionModal";
import useDeleteData from "../utilities/useDeleteData";
import EditSubtaskModal from "../components/EditSubtaskModal";
import EditTask from "../components/EditTask";
import TaskPriority from "../components/TaskPriority";



const TaskDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const priorityIcons = {
    normal: (
      <span className="flex flex-row gap-1 items-center justify-center  text-blue-600 bg-blue-200 rounded-md px-1">
        <RxDash />
        NORMAL
      </span>
    ),

    medium: (
      <span className="flex flex-row gap-1 items-center justify-center text-yellow-600  bg-yellow-200 rounded-md px-1">
        <MdOutlineKeyboardArrowUp />
        MEDIUM
      </span>
    ),

    high: (
      <span className="flex flex-row gap-1 items-center justify-center  text-red-600 bg-red-200 rounded-md px-1">
        <MdOutlineKeyboardDoubleArrowUp />
        HIGH
      </span>
    ),
  };

  const { id } = useParams();
  const [err, setErr] = useState(null);
  const [task, setTask] = useState(null);
  const [tab, setTab] = useState("details");
  const [loading, setLoading] = useState(false);

  const {
    deletedata,
    data,
    loading: delSubtaskLoading,
    err: delSubtaskErr,
  } = useDeleteData("/api/task/deletesubtask");
  const [delSubtaskId, setDelSubtaskId] = useState(null)

  useEffect(() => {
    const getTask = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/task/getsingletask/${id}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setErr(data.message);
          setLoading(false);
        } else {
          setLoading(false);
          console.log(data);
          setErr(null);
          setTask(data);
        }
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    getTask();
  }, []);


  const handleDeleteSubtask = async (id) => {
    console.log(id);
    setDelSubtaskId(id)
    deletedata({ subtaskId: id });

  };

  // console.log(data)
  useEffect(() => {
    if (data) {
      console.log(data)
      let tempSubtasks = task.subtasks.filter((t) => t._id !== delSubtaskId);
      console.log(tempSubtasks)

      setTask({...task, subtasks: tempSubtasks });
    }
  }, [data]);
  // console.log(task);
  if (loading) return <LoadingPage />;

  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className={`flex flex-row items-center gap-2 `}>
        <EditTask/>
        <h1>
          <TaskStatusBadges status={task?.status} fontsize={"md"} />
        </h1>
        <h1
          className={`Roboto font-extrabold tracking-wide text-md md:text-3xl ${
            task?.status === "completed" && "line-through"
          }`}
        >
          {task?.title}
        </h1>
      </div>

      <div className="flex flex-row items-center gap-3 my-5 ">
        <button
          onClick={() => {
            setTab("details");
          }}
          className={`flex flex-row gap-1 items-center p-2 text-lg    bg-gray-100 px-1 rounded-t-2xl  duration-100  ${
            tab === "details" && "text-black border-b-4 border-black"
          }`}
        >
          <BiDetail className="text-2xl" />

          <span className="text-xs tracking-widest">TASK DETAILS</span>
        </button>
        <button
          onClick={() => {
            setTab("activities");
          }}
          className={`flex flex-row gap-1 items-center p-2 text-lg   bg-gray-100 px-1 rounded-t-2xl   duration-100  ${
            tab === "activities" && "text-black border-b-4 border-black"
          }`}
        >
          <CgMenuGridO className="text-2xl" />
          <span className="text-xs tracking-widest">ACTIVITIES</span>
        </button>
      </div>

      {tab === "activities" ? (
        <TaskActivities />
      ) : (
        <div>
          <div className="flex flex-col my-5 gap-1 w-full md:w-1/2">
            <div className="flex flex-row items-center border-0 border-black">
              <div className="w-1/2 text-xs tracking-widest flex gap-1 items-center">
                <LuUserSquare2 className="text-lg" />
                BY
              </div>
              <div className="w-1/2 ">
                <Link
                  to={`/profile/${task?.createdBy?.username}`}
                  className="flex flex-row gap-1 items-center"
                >
                  <GoArrowUpLeft className="text-blue-500" />

                  <span className="uppercase text-xs tracking-widest">
                    (ADMIN)
                  </span>
                  {task?.createdBy?.fullname}
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center border-0 border-black">
              <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
                <LuCalendarDays className="text-lg text-blue-500" />
                CREATED-ON
              </div>
              <div className="w-1/2 ">
                <div className="flex flex-col">
                  {moment(task?.createdAt).format("Do MMM YYYY")}
                  {/* <span className="text-xs mx-1 text-gray-400">
                ({moment(task?.deadline).fromNow()})
              </span> */}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center border-0 border-black">
              <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
                <HiOutlineExclamation className="text-lg" />
                PRIORITY
              </div>
              <div className="w-1/2 ">
                <div className="flex flex-row">
                  {/* <span> {priorityIcons[task?.priority]} </span> */}
                  <TaskPriority priority={task?.priority} />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center border-0 border-black">
              <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
                <BiCalendarX className="text-lg text-red-500" />
                DEADLINE
              </div>
              <div
                className={`w-1/2 ${
                  moment(task?.deadline).fromNow().toString().includes("ago")
                    ? "text-red-500"
                    : "text-blue-500"
                } `}
              >
                {moment(task?.deadline).format("Do MMM YYYY")}
                <span className="text-xs mx-2 ">
                  ({moment(task?.deadline).fromNow()})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row  items-center gap-5 my-5 justify-start">
            <h1 className="text-xs tracking-widest flex flex-row items-center gap-1">
              {/* <MdOutlineAssignmentReturned className="text-lg" /> */}
              <FiArrowRightCircle className="text-lg" />
              ASSIGNED TO
            </h1>

            {task?.assignedToUser && (
              <div>
                <Link
                  to={`/profile/${task.assignedToUser.username}`}
                  className=" bg-zinc-800 hover:bg-zinc-950 hover:scale-110 duration-200 text-white  flex flex-row pr-2   gap-2 rounded-2xl"
                >
                  <img
                    src={
                      task.assignedToUser.profileImg ||
                      `https://avatar.iran.liara.run/public/boy?username=${task.assignedToUser.username}`
                    }
                    alt=""
                    className="h-7 w-7 "
                  />
                  <span>@{task.assignedToUser.username}</span>
                  <span>|{task.assignedToUser.title}</span>
                </Link>
              </div>
            )}
            {task?.assignedToTeam && (
              <div className="border-l-2 border-gray-600  px-2">
                <div className="flex flex-row items-center gap-2">
                  <h1 className="text-xs  tracking-widest">TEAM: </h1>
                  <h1>{task?.assignedToTeam.teamName}</h1>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <h1 className="hidden md:block text-xs  tracking-widest">
                    TEAM-MEMBERS ({task?.assignedToTeam.team.length}):{" "}
                  </h1>
                  <div className="flex flex-row flex-wrap gap-2 ">
                    {task?.assignedToTeam.team.map((m, m_i) => {
                      return (
                        <Link
                          to={`/profile/${m?.username}`}
                          className="hover:bg-blue-200 duration-200 bg-blue-100 text-black rounded-full flex flex-wrap items-center gap-1 border-black  "
                        >
                          <img
                            src={
                              m.profileImg ||
                              `https://avatar.iran.liara.run/public/boy?username=${m.username}`
                            }
                            alt=""
                            className="w-7 h-7 border border-black rounded-full"
                          />
                          @{m.username}
                          <span className="text-gray-400 mr-1">
                            ({m.title})
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center gap-5">
            <h1 className="text-xs tracking-widest flex flex-row items-center gap-1">
              <GrAttachment className="text-lg" />
              ATTACHMENTS
            </h1>

            <div className="border-0 border-gray-600 flex flex-row gap-5  px-2">
              <a
                className="text-blue-500 underline underline-offset-4 hover:scale-110 duration-300"
                href="https://ihatetomatoes.net/wp-content/uploads/2017/01/react-cheat-sheet.pdf"
                target="_blank"
              >
                Attachment 1{" "}
              </a>
            </div>
          </div>

          <div className="my-8">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-xs tracking-widest flex flex-row items-center gap-1">
                <IoIosGitBranch className="text-lg" />
                SUB-TASK ({task?.subtasks.length})
              </h1>

              <AddSubTask task={task} setTask={setTask} id={task?._id} />
            </div>
            <div className=" rounded-xl ">
              {task?.subtasks.length > 0 &&
                task?.subtasks.map((t, t_i) => {
                  return (
                    <div className="flex flex-row justify-between flex-wrap border-2 rounded-xl p-2 items-center gap-4 my-3">
                      <div className="flex flex-row items-center flex-wrap gap-4 ">
                        <EditSubtaskModal
                          id={t._id}
                          subtask={t}
                          task={task}
                          setTask={setTask}
                        />

                        <h1 className="">
                          <TaskStatusBadges
                            status={t.status}
                            fontsize={"[10px]"}
                          />
                        </h1>
                        <h1
                          className={`${
                            t.status === "completed" && "line-through"
                          }`}
                        >
                          {t.title}
                        </h1>
                      </div>

                      <div className="text-sm text-gray-500 flex  gap-2">
                        {t.createdBy?._id && (
                          <div className="text-blue-400">
                            <span className="text-xs text-black mx-1">by</span>
                            <Link
                              to={`/profile/${
                                t.createdBy?.username || currentUser.username
                              }`}
                              className="hover:underline underline-offset-4"
                            >
                              @{t.createdBy?.username}
                              <span className="text-gray-400 text-xs ml-1">
                                [{t.createdBy?.title}]
                              </span>
                            </Link>
                          </div>
                        )}
                        ({moment(t.createdAt).format("Do MMM YYYY")}){" "}
                        {delSubtaskId === t._id && delSubtaskLoading && (
                          <span className="loading loading-dots loading-md"></span>
                        )}
                        {/* <span className="border loading loading-dots loading-md"></span> */}
                        {!delSubtaskLoading && (
                          <button
                            onClick={() => handleDeleteSubtask(t._id)}
                            className="btn btn-xs uppercase text-red-500 text-xs hover:text-red-500 duration-200 cursor-pointer font-semibold tracking-widest"
                          >
                            delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            {task?.subtasks.length === 0 && (
              <div>
                <h1 className="text-center text-gray-400 tracking-widest">
                  (No subtask yet)
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
