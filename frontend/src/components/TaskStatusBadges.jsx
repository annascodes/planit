import React from 'react'
import { BiSolidBadge } from "react-icons/bi";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
{/* <FaCheck />; */}
import { RiCheckboxBlankLine } from "react-icons/ri";
{/* <RiCheckboxBlankLine /> */}

const TaskStatusBadges = ({onlyColor=false,status, fontsize=null,}) => {
    // console.log(fontsize)
    // console.log(`text-${fontsize}`)
    if(onlyColor){

      if (status === "todo") return <TbArrowBadgeRightFilled className="text-blue-500 text-lg" />;
      if (status === "inprogress") return <RiCheckboxBlankLine className="text-yellow-500 text-lg" />;
      if (status === "completed") return <FaCheck className="text-green-500 text-lg" />;
    }
   
  return (
    <div>
      {status === "todo" && (
        <div className="flex">
          <div
            className={`border-2 px-1 uppercase font-semibold border-blue-400 tracking-widest text-blue-400 ${
              fontsize ? `text-${fontsize}` : `text-xs`
            }`}
          >
            todo
          </div>
        </div>
      )}
      {status === "inprogress" && (
        <div className="flex">
          <div
            className={` border-2 px-1 uppercase font-semibold border-yellow-400 tracking-widest text-yellow-400 ${
              fontsize ? `text-${fontsize}` : `text-xs`
            }`}
          >
            inprogress
          </div>
        </div>
      )}
      {status === "completed" && (
        <div className="flex">
          <div
            className={` border-2 px-1 uppercase font-semibold border-green-400 tracking-widest text-green-400 ${
              fontsize ? `text-${fontsize}` : `text-xs`
            }`}
          >
            completed
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskStatusBadges
