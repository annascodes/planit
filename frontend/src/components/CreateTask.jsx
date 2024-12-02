import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxDash } from "react-icons/rx";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
                  import { MdOutlineAttachFile } from "react-icons/md";
import CreateTeam from './CreateTeam';


const CreateTask = () => {
    const handleAddTask = async(e)=>{
        // e.preventDefault()
        console.log('adding task')
        return
    }
  return (
    <div className=''>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn tracking-widest flex items-center gap-1"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <IoMdAddCircleOutline className="text-2xl" />
        ADD TASK
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-full md:w-8/12 max-w-5xl border-0">
          <div className="mx-auto border-0 border-black flex flex-row">
            <div className="w-1/2">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text tracking-widest text-xs text-black font-semibold">
                    TITLE
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="my-5 form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text tracking-widest text-xs text-black font-semibold">
                    PRIORITY
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <button className="flex flex-row items-center border  px-2">
                    <RxDash className="text-2xl" />
                    NORMAL
                  </button>
                  <button className="flex flex-row items-center border  px-2">
                    <MdOutlineKeyboardArrowUp className="text-2xl" />
                    MEDIUM
                  </button>
                  <button className="flex flex-row items-center border  px-2">
                    <MdOutlineKeyboardDoubleArrowUp className="text-2xl" />
                    HIGH
                  </button>
                </div>
              </label>
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
            </div>
            <div className="w-1/2">
              

              <CreateTeam/>

             
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className=''>
              {/* if there is a button, it will close the modal */}
              <button onClick={handleAddTask} className="btn text-red-500 bg-red-200">
                Close
              </button>
              <button onClick={handleAddTask} className="btn mx-3 bg-blue-200 text-blue-500">
                Create
              </button>
            </form>
          </div>
           
        </div>
      </dialog>
    </div>
  );
}

export default CreateTask
