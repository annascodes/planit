import React, { useState } from 'react'
 import { MdAddCircleOutline } from "react-icons/md";
 import toast from 'react-hot-toast';

const AddSubTask = ({task, setTask, id}) => {
    const [subtask,setSubtask] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async(e)=>{
        // e.preventDefault() 
        console.log(subtask)
        console.log(id)
        try {
            setLoading(true)
            const res = await fetch(`/api/task/addsubtask/${id}`,
             {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({subtask})
            });
            const data = await res.json()
            if(!res.ok){
                setLoading(false)
                console.log(data.message)
                toast.error(data.message)
            }else{
                setLoading(false)
                console.log(data)
                toast.success('sub-task is added')
                setSubtask('')
                let temp = [...task.subtasks, data]
                setTask({...task, subtasks:[...temp]})
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    console.log(task)

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
      disabled={loading}
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="btn btn-sm btn-outline text-xs tracking-widest flex gap-1  font-medium"
      >
        <MdAddCircleOutline className="text-xl" />
        SUBTASK
      </button>
      {/* <button className="btn">open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xs">TITLE</h3>
          <input
            type="text"
            value={subtask}
            placeholder="Type here"
            className="input input-bordered w-full  mt-2"
            onChange={(e)=>{
                setSubtask(e.target.value)
            }}
          />
          <div className="modal-action">
            <form method="dialog" className='w-full flex  justify-end gap-5'>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">Close</button>
              <button onClick={handleSubmit} className="btn btn-sm">ADD SUBTASK</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AddSubTask
