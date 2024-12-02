import React from 'react'
import { TbEditCircle } from "react-icons/tb";
import GeneralCheckBoxDropdown from './GeneralCheckBoxDropdown';

const EditTask = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6">
        <TbEditCircle className="text-3xl text-blue-500 cursor-pointer hover:bg-blue-100 rounded-md p-1" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-1">

          <div>
            <div className='flex  items-center gap-2'>
              <h1 className='text-xs tracking-widest uppercase'>title</h1>
              <input
                type="text"
                placeholder="Type here"
                className="  input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          {/* ---- */}
          <div>
            <div className='flex  items-center gap-2'>
              <h1 className='text-xs tracking-widest uppercase'>status</h1>
               <GeneralCheckBoxDropdown options={['todo', 'inprogress', 'completed']} />
            </div>
          </div>
          {/* ---- */}
          <div>
            <div className='flex  items-center gap-2'>
              <h1 className='text-xs tracking-widest uppercase'>priority</h1>
               <GeneralCheckBoxDropdown options={['normal', 'medium', 'high']} />
            </div>
          </div>






          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask
