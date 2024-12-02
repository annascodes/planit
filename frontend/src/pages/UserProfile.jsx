import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TiUser } from "react-icons/ti";
import { TiUserOutline } from "react-icons/ti";
import moment from "moment";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { BsCalendar2Plus } from "react-icons/bs";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";

import { TbCircleDotted } from "react-icons/tb";
// import { MdOutlineCheckBox } from "react-icons/md";
{
  /* <MdOutlineCheckBox /> */
}
// import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import DesignaionChangeModal from "../components/DesignaionChangeModal";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import UpdateProfile from "../components/UpdateProfile";
import { FiUserX } from "react-icons/fi";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [work, setWork] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workingTasks, setWorkingTasks] = useState([]);
  const [updateProfile, setUpdateProfile] = useState({})
 const {currentUser} = useSelector(state=>state.user)
 const [loading, setLoading] =useState(false)
 const [userNotFound, setUserNotFound] = useState(false)
 const searchParam = useSearchParams()
 console.log('search: ', searchParam)


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getsingleuser/${username}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setErr(data.message);
          setUserNotFound(true)
        } else {
          //   console.log(data);
          setErr(null);
          setUser(data);
        }
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserWork = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/user/userintasks/${user?._id}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false)
          console.log(data.message);
          setErr(data.message);
        } else {
          setLoading(false)
          //   console.log(data);
          setWork(data);
          setErr(null);
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
        setErr(error.message);
      }
    };
    if (user?._id) {
      //   console.log(user?._id);
      getUserWork();
    }
  }, [user, setUser]);

  useEffect(() => {
     let completed = [];
     let working = [];

    if (work.length > 0) {
    //   console.log("WORK: ", work);
      work.map((t) => {
        if (t.status === "completed") completed.push(t);
        else working.push(t)
      });

      setCompletedTasks([...completed]);
      setWorkingTasks([...working])
    }
  }, [work, setWork]);

//   console.log("completed:", completedTasks);
//   console.log("working:", workingTasks);
if(userNotFound){
  return (
    <div className="h-screen flex flex-col items-center gap-2 justify-center ">
      <FiUserX  className="text-4xl text-red-500"/>
      <span className="tracking-widest"> user not found !</span>
    </div>
  );
}
  return (

    <div className="flex flex-row flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col   items-center  ">
        <img
          src={
            user?.profileImg ||
            `https://avatar.iran.liara.run/public/boy?username=${user?.username}`
          }
          alt="Avatar Tailwind CSS Component"
          className="w-40"
        />
        {(currentUser._id === user?._id || currentUser.title === "admin") && (
          <UpdateProfile user={user} setUser={setUser} />
        )}
        <div className="flex flex-col  my-5 gap-1 w-full md:w-2/3">
          <div className="flex flex-row items-center border-0 border-black">
            <div className="w-1/2 text-xs tracking-widest flex gap-1 items-center">
              <TiUserOutline className="text-lg" />
              FULLNAME
            </div>
            <div className="w-1/2 ">
              <h1>{user?.fullname}</h1>
            </div>
          </div>
          <div className="flex flex-row items-center border-0 border-black">
            <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
              <MdAlternateEmail className="text-lg " />
              USERNAME
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col">@{user?.username}</div>
            </div>
          </div>
          <div className="flex flex-row items-center border-0 border-black">
            <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
              <HiOutlineMail className="text-lg" />
              EMAIL
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-row">{user?.email}</div>
            </div>
          </div>
          <div className="flex flex-row items-center border-0 border-black">
            <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
              <MdOutlinePermContactCalendar className="text-lg" />
              CREATED-ON
            </div>
            <div className={`w-1/2  `}>
              {moment(user?.createdAt).format("Do MMM YYYY")}
            </div>
          </div>
          <div className="flex flex-row items-center border-0 border-black">
            <div className="w-1/2 text-xs tracking-widest flex items-center gap-1">
              <FaLaptopCode className="text-lg" />
              DESIGNATION
            </div>
            <div className={`w-1/2 flex items-center  gap-5 `}>
              <span className="border-2 px-0.5 font-semibold py border-black py-0  tracking-widest text-sm  ">
                {user?.title}
              </span>

              {/* {currentUser?.title === "admin" && currentUser?._id === user?._id
                ? " "
                : currentUser.title === "admin" && (
                    <DesignaionChangeModal user={user} setUser={setUser} />
                  )} */}

              {currentUser.title === "admin" && (
                <DesignaionChangeModal user={user} setUser={setUser} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-center tracking-widest uppercase text-xs border border-black">
          Work history
        </h1>

        <h1 className="tracking-widest uppercase text-xs   mt-5">
          - completed tasks
        </h1>
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        <div className="flex flex-row flex-wrap gap-x-2 max-h-96 overflow-auto ">
          {completedTasks.length === 0 && (
            <div className=" text-gray-400 mx-auto text-xs tracking-widest">
              {" "}
              no completed tasks
            </div>
          )}
          {completedTasks.length > 0 &&
            [...Array(9)].map((_, i) => {
              return (
                completedTasks[i]?.title && (
                  <Link
                    key={i}
                    to={`/taskdetails/${completedTasks[i]._id}`}
                    className=" my-2  hover:underline underline-offset-4   "
                  >
                    <h1 className=" flex flex-row items-center gap-1 bg-gray-200  px-2 rounded-md text-sm">
                      <MdOutlineDone className="min-w-10 text-2xl text-green-500" />
                      {completedTasks[i]?.title}
                    </h1>
                  </Link>
                )
              );
            })}
          {completedTasks.length > 10 && (
            <div className="flex flex-row items-center justify-center">
              <button className=" border-black   text-xs px-0.5 hover:text-blue-400 duration-200">
                show all
              </button>
            </div>
          )}
        </div>

        {/* ------------ */}

        <h1 className="tracking-widest uppercase text-xs   mt-5">
          - working on
        </h1>
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        <div className="flex flex-row flex-wrap gap-x-2 max-h-96 overflow-auto ">
          {workingTasks.length === 0 && (
            <div className=" text-gray-400 mx-auto text-xs tracking-widest">
              not working currently on any task
            </div>
          )}

          {workingTasks.length > 0 &&
            [...Array(9)].map((_, i) => {
              return (
                workingTasks[i]?.title && (
                  <Link
                    key={i}
                    to={`/taskdetails/${workingTasks[i]._id}`}
                    className=" my-2  hover:underline underline-offset-4   "
                  >
                    <h1 className=" flex flex-row items-center gap-1 bg-gray-200  px-2 rounded-md text-sm">
                      <TbCircleDotted className="min-w-10 text-2xl text-blue-500" />
                      {workingTasks[i]?.title}
                    </h1>
                  </Link>
                )
              );
            })}
          {workingTasks.length > 10 && (
            <div className="flex flex-row items-center justify-center">
              <button className=" border-black   text-xs px-0.5 hover:text-blue-400 duration-200">
                show all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
