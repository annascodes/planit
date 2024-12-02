import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxDash } from "react-icons/rx";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import CreateTeam from "../components/CreateTeam";
import toast from "react-hot-toast";

// ----
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import moment from "moment";

const AddTask = () => {
  const date = "2024-10-24T14:55:58.704Z";
  // console.log(new Date(date))
  // console.log(moment(new Date(date)).fromNow())
  // console.log(moment(new Date(date)).format("Do MMM YYYY"));
  // console.log(moment(new Date(date)).format("LLLL"));

  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState({
    priority: "normal",
    deadline: new Date(),
  });
  const [err, setErr] = useState(null);
  const handlePublishTask = async () => {
    console.log(task)
    if (!task.title) {
      setErr("Task title is required");
      return;
    }
    if(!task.deadline){
      setErr('Deadline not added');
      return;
    }
    if (!task.assignedtoteam && !task.assignedtouser) {
      setErr('Assign to is not mention'); 
      return;
    }
    try {
      const res = await fetch(`/api/task/createtask`,
      {
        method: 'post',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify(task)
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
        setErr(data.message)
      }
      else{
        console.log(data)
        toast.success('Task has created successfully!')
        setTask({
          priority: "normal",
          deadline: new Date(),
        });
      }
    } catch (error) {
      console.log(error)
      setErr(error.message)
    }
    
    
    

   
  };

  // console.log(moment(startDate).fromNow())
  // console.log(typeof task.deadline)
  // console.log( task.deadline)
useEffect(()=>{
setErr(null)
},[task])
  return (
    <div className="bg-white py-5 px-2 rounded-3xl">
      <div className="mx-auto border-0 border-black gap-y-5 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text tracking-widest text-xs text-black font-semibold">
                TITLE
              </span>
            </div>
            <input
              type="text"
              value={task?.title}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
            />
          </label>
          <label className="mt-5  form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text tracking-widest text-xs text-black font-semibold">
                PRIORITY
              </span>
            </div>
          </label>
          <div className="flex flex-row gap-4 mb-3">
            <button
              onClick={() => {
                setTask({ ...task, priority: "normal" });
              }}
              className={` hover:tracking-widest underline-offset-4 duration-200 flex flex-row items-center border  px-2 ${
                task?.priority === "normal" && "bg-black text-white border-black"
              }`}
            >
              <RxDash className="text-2xl" />
              NORMAL
            </button>
            <button
              onClick={() => {
                setTask({ ...task, priority: "medium" });
              }}
              className={` hover:tracking-widest underline-offset-4 duration-200 flex flex-row items-center border  px-2 ${
                task?.priority === "medium" && "bg-black text-white border-black"
              }`}
            >
              <MdOutlineKeyboardArrowUp className="text-2xl" />
              MEDIUM
            </button>
            <button
              onClick={() => {
                setTask({ ...task, priority: "high" });
              }}
              className={` hover:tracking-widest underline-offset-4 duration-200 flex flex-row items-center border  px-2 ${
                task?.priority === "high" && "bg-black text-white border-black"
              }`}
            >
              <MdOutlineKeyboardDoubleArrowUp className="text-2xl" />
              HIGH
            </button>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text tracking-widest text-xs text-black font-semibold">
                ATTACHMENTS
              </span>
            </div>
            <div>
              <div className="hover:underline cursor-pointer underline-offset-4 flex flex-row items-center">
                <MdOutlineAttachFile className="text-2xl" />
                add attachment
              </div>
            </div>
          </label>
          {/* ---- deadline start  */}
          <div className=" mt-3">
            <div className="label">
              <span className="label-text tracking-widest text-xs text-red-600 font-semibold">
                DEADLINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SlCalender className="text-2xl" />

            <DatePicker
              showTimeSelect
              dateFormat="Pp"
              selected={new Date(task?.deadline || new Date())}
              onChange={(date) => setTask({ ...task, deadline: date.toUTCString() })}
              className="cursor-pointer rounded-xl text-center bg-black text-white"
            />
            <span
              className={`text-sm ${
                moment(task.deadline).fromNow().toString().includes("ago")
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {moment(task.deadline).fromNow()} (approx)
            </span>
          </div>
        </div>
        {/* ---- deadline end  */}

        <div className="w-full md:w-1/2">
          <CreateTeam task={task} setTask={setTask} />
        </div>
      </div>
      <button
        onClick={handlePublishTask}
        className="btn btn-outline w-full mt-14 "
      >
        Publish task
      </button>

      {err && (
        <div role="alert" className="alert alert-error p-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="">{err}</span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
