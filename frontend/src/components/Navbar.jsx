import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineNotification } from "react-icons/ai";
import { logOut } from "../redux/user/userSlice";
import { MdOutlineExpandCircleDown } from "react-icons/md";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    try {
      const res = await fetch(`/api/auth/logout`,
      {
        method: 'post'
      });
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        console.log(data)
        dispatch(logOut())
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-2  flex flex-row justify-between items-center border-b border-black">
      <h1
        style={{ fontFamily: "Bebas Neue" }}
        className="hover:pl-3 duration-300 text-5xl font-bold "
      >
        PlanIt.
      </h1>
      <div className="flex flex-row items-center justify-center gap-6">
        <Link className="flex">
          <AiOutlineNotification className="text-2xl" />{" "}
          <span className="border border-black  hover:bg-white hover:text-black duration-200 bg-black text-white rounded-full  px-2">
            4
          </span>
        </Link>
        {/* <Link className='border rounded-3xl px-1'>{currentUser?.fullname}</Link> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-1 bg-blue-100 px-1 rounded-lg  hover:text-blue-500 duration-300 "
          >
            {currentUser?.fullname}
            <MdOutlineExpandCircleDown />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link to={`/profile/${currentUser?.username}`}>Profile</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
