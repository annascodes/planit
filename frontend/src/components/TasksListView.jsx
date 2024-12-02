import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import DeletePermissionModal from "./DeletePermissionModal";
import TaskStatusBadges from "./TaskStatusBadges";

const TasksListView = ({ tasks }) => {
  const { currentUser } = useSelector((state) => state.user);
  const status = {
    todo: "blue",
    inprogress: "yellow",
    completed: "green",
  };
  const priority = {
    normal: "blue",
    medium: "yellow",
    high: "red",
  };
  return (
    <div className="bg-white p-3 rounded-xl">
      <div className="overflow-x-auto">
        <table className="table table-xs ">
          <thead>
            <tr className="tracking-widest uppercase">
              {currentUser?.title === "admin" && (
                <>
                  <th><span className="text-[8px] text-red-500">delete</span></th>
                  <th><span className="text-[8px] text-blue-500">edit</span> </th>
                </>
              )}

              <th>#</th>
              <th>Status</th>
              <th>Title</th>
              {/* <th></th> */}
              <th>Posted-by</th>

              <th>Assigned-to</th>
              <th>Priority</th>
              <th>Created-on</th>
              <th>Deadline</th>
              <th></th>
              <th>Subtasks</th>
            </tr>
          </thead>

          <tbody className="">
            {tasks.length === 0 ? (
              <span>no tasks</span>
            ) : (
              tasks.map((t, t_i) => {
                return (
                  <tr key={t_i}>
                    {currentUser?.title === "admin" && (
                      <>
                        <td>
                          <DeletePermissionModal
                            key={t_i}
                            id={t._id}
                            name={t.title}
                            msg={`Do you really want to delete this task ${t.title}`}
                          />
                        </td>
                        <td>
                          <BiEdit className="text-lg text-blue-500 hover:text-blue-700 duration-200 cursor-pointer" />
                        </td>
                      </>
                    )}

                    <th className="font-normal">{++t_i}</th>
                    {/* <td
                      className={`text-center bg-${
                        status[t.status]
                      }-200 rounded-xl text-${status[t.status]}-600`}
                    >
                      {t.status.toUpperCase()}
                    </td> */}
                    <td>
                      <TaskStatusBadges status={t.status} fontsize={"xs"} />
                    </td>
                    <td
                      className={` ${
                        t.status === "completed" && "line-through text-gray-400"
                      }`}
                    >
                      <Link
                        to={`/taskdetails/${t._id}`}
                        className="hover:underline hover:text-blue-400 duration-200 underline-offset-4 cursor-pointer"
                      >
                        {t.title.slice(0, 80)} {t.title.length > 79 && "..."}
                      </Link>
                    </td>
                    <td>
                      <span className="text-blue-500 text-[8px] tracking-widest">
                        {t.createdBy.title.toUpperCase()}
                      </span>
                      {t.createdBy.username}{" "}
                    </td>

                    {t.assignedToUser && (
                      <td>
                        <span className="text-blue-500 text-[8px] tracking-widest">
                          USER:
                        </span>
                        {t.assignedToUser?.username}
                      </td>
                    )}

                    {t.assignedToTeam && (
                      <td>
                        <span className="text-blue-500 text-[8px] tracking-widest">
                          TEAM:
                        </span>
                        {t.assignedToTeam.teamName}
                      </td>
                    )}

                    <td className={`text-${priority[t.priority]}-600 `}>
                      {t.priority.toUpperCase()}
                    </td>
                    <td>{moment(t.createdAt).format("Do MMM YYYY")}</td>
                    <td
                      className={`${
                        moment(t.deadline)
                          .fromNow()
                          .toString()
                          .includes("ago") && "text-red-400"
                      }`}
                    >
                      {moment(t.deadline).format("Do MMM YYYY")}
                    </td>
                    <td
                      className={`text-[10px] ${
                        moment(t.deadline)
                          .fromNow()
                          .toString()
                          .includes("ago") && "text-red-400"
                      }`}
                    >
                      {t.status !== "completed" && moment(t.deadline).fromNow()}
                    </td>
                    <td className="text-center">{t.subtasks.length}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default TasksListView;
