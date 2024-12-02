import React, { useEffect, useState } from 'react'
import { TbEditCircle } from "react-icons/tb";
import CheckBoxDropdown from './CheckBoxDropdown';
import GeneralCheckBoxDropdown from './GeneralCheckBoxDropdown';
import TaskStatusBadges from './TaskStatusBadges'; 
import { RiCloseFill } from "react-icons/ri";
import useUpdate from '../utilities/useUpdate';
import toast from 'react-hot-toast';


const EditSubtaskModal = ({id, subtask, task , setTask}) => {
    // console.log(subtask)
    const [newStatus, setNewStatus] = useState()
    const [newTitle, setNewTitle] = useState()
    const {data, loading, err, updateData} = useUpdate(`/api/task/updatesubtask/${id}`)
    const handleUpdateSubtask = async()=>{
       updateData({status:newStatus, title: newTitle})
    }

    useEffect(()=>{
        if(data){
            // let tempSubtask = task.subtasks.filter(t=>t._id !== id)
            // tempSubtask.push(data) 
            let tempSubtask = task.subtasks.map(st=>{
                if(st._id === data._id){
                    st.status = data.status;
                    st.title = data.title;
                    return st;
                }else{
                    return st;
                }
            })
            setTask({...task, subtasks:tempSubtask}) 
            toast.success('subtask updated successfully!') 
        }
    },[data])
  return (
    <div>
      <div className="tooltip" data-tip="edit">
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <button onClick={() => document.getElementById(`${id}`).showModal()}>
            <TbEditCircle className="text-blue-500 text-xl" />
          </button>
        )}
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button>open modal</button> */}
      <dialog id={`${id}`} className="modal">
        <div className="modal-box h-3/5 ">
          <h1 className="uppercase text-center mb-5 tracking-wide">
            Edit subtask{" "}
          </h1>
          <div className="flex flex-row  items-center gap-2	">
            <h1 className="text-xs tracking-widest">subtask</h1>
            <textarea
              className="textarea textarea-info w-full"
              placeholder="Bio"
              defaultValue={subtask?.title}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="flex flex-row mt-5  items-center gap-2	">
            <h1 className="text-xs tracking-widest">current status</h1>
            <TaskStatusBadges status={subtask?.status} />
          </div>

          <div className="flex flex-row mt-5  items-center gap-2	">
            <h1 className="text-xs tracking-widest">change status to</h1>

            <TaskStatusBadges status={newStatus} />
            <GeneralCheckBoxDropdown
              options={["completed", "inprogress", "todo"]}
              selectedOption={setNewStatus}
            />
          </div>

          <div className="modal-action float-end">
            <form
              method="dialog"
              className="flex flex-row justify-center gap-5 w-full"
            >
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline btn-error btn-sm hover:text-red-500">
                {/* <RiCloseFill className='text-2xl' /> */} close
              </button>
              <button
                onClick={handleUpdateSubtask}
                className="btn btn-outline btn-sm   text-blue-500 tracking-widest "
              >
                update
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EditSubtaskModal
