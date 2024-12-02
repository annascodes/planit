import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import useUpdateProfile from "../utilities/useUpdateProfile";
import { RiCloseLargeFill } from "react-icons/ri";
import toast from "react-hot-toast";
import ShowErrorDiv from "./ShowErrorDiv";

const UpdateProfile = ({ user, setUser }) => {
  const { data, loading, err, updateProfileApi } = useUpdateProfile();
  const [formData, setFormData] = useState({});

  useEffect(()=>{
if(user){
  setFormData(user)
}
  },[user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const handleUpdateProfile =  () => {
    // console.log(formData);
    updateProfileApi({ formData, id:user._id })
    // setFormData({})
  };
  useEffect(()=>{
    if(data){
      setUser(data)
    }
  },[data])
  console.log()

  return (
    <div className="mt-2">
      {/* ----------modal start  */}
      {err && <ShowErrorDiv err={err }/> }
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {loading ? (
        <span className="loading loading-dots text-blue-600 loading-md"></span>
      ) : (
        <button
          onClick={() =>
            document.getElementById("UpdateProfileModal").showModal()
          }
          className="flex flex-row items-center text-xs text-blue-500 hover:underline underline-offset-4 duration-200 tracking-widest uppercase"
        >
          <BiEdit className="text-lg hover:text-black text-blue-400 duration-200" />
          <span>edit profile</span>
        </button>
      )}

      <dialog id="UpdateProfileModal" className="modal">
        <div className="modal-box border-black border-0 w-full min-w-40 md:max-w-[450px] mx-2">
          <h3 className="font-semibold text-lg text-center uppercase tracking-widest my-3">
            Update Profile{" "}
          </h3>
          <div className="flex flex-col gap-3">
            {/* ---fullname  */}
            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
              <h1 className="text-xs tracking-widest">-fullname</h1>
              <input
                type="text"
                value={formData?.fullname}
                name="fullname"
                onChange={handleChange}
                placeholder="fullname here"
                className="input input-sm input-bordered justify-between w-full max-w-xs"
              />
            </div>
            {/* ---username  */}
            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
              <h1 className="text-xs tracking-widest">-username</h1>
              <input
                type="text"
                name="username"
                value={formData?.username}
                onChange={handleChange}
                placeholder="username here"
                className="input input-sm input-bordered w-full max-w-xs"
              />
            </div>
            {/* ---email  */}
            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
              <h1 className="text-xs tracking-widest ">-email</h1>
              <input
                type="text"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="email here"
                className="input input-sm input-bordered w-full max-w-xs"
              />
            </div>
            {/* ---password  */}
            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
              <h1 className="text-xs tracking-widest ">-password</h1>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password here"
                className="input input-sm input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-end gap-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-outline btn-error">
                <RiCloseLargeFill />
              </button>
              <button
                onClick={handleUpdateProfile}
                className="btn btn-sm btn-outline uppercase text-xs"
              >
                update
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* ----------modal ends  */}
    </div>
  );
};

export default UpdateProfile;
