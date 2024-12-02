import React from "react";
import { TbTrash } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import { TiUserDeleteOutline } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import { TiUserOutline } from "react-icons/ti";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const DeletePermissionModal = ({ id, setDelUserId, name, msg }) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className=""
        onClick={() => document.getElementById(`${id}`).showModal()}
      >
        <TbTrash className="cursor-pointer hover:text-red-400 duration-200 text-red-600 text-xl" />
      </button>
      <dialog id={`${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-medium text-lg">
            <div className="flex flex-row gap-0">
              <TiUserOutline className="text-2xl text-blue-500" />
              <HiOutlineArrowNarrowRight className="text-2xl " />
              <BiTrash className="text-2xl text-red-500" />
            </div>
            {name}
          </h3>
          <p className="py-4 text-lg">{msg}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex flex-row justify-around w-full"
            >
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">close</button>

              <button
                onClick={() => {
                  setDelUserId(id);
                }}
                className="btn btn-sm hover:bg-red-200 duration-200 hover:border-red-100 text-red-500"
              >
                delete it
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeletePermissionModal;
