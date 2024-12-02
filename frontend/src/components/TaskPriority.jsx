import React from 'react'

const TaskPriority = ({priority}) => {
  return (
    <div>
      {priority === "normal" && (
        <div className="">
          <h1 className="px-1 text-xs flex items-center justify-center bg-blue-100 rounded-lg py-1 tracking-widest font-semibold text-center text-blue-500">
            NORMAL
            <span className="text-black mx-1 text-[8px]">PRIORITY</span>
          </h1>
        </div>
      )}
      {priority === "medium" && (
        <div>
          <h1 className="px-1 text-xs flex items-center justify-center bg-orange-100 rounded-lg py-1 tracking-widest font-semibold text-center text-orange-400">
            MEDIUM
            <span className="text-black mx-1 text-[8px]">PRIORITY</span>
          </h1>
        </div>
      )}
      {priority === "high" && (
        <div>
          <h1 className="px-1 text-xs flex items-center justify-center bg-red-100 rounded-lg py-1 tracking-widest font-semibold text-center text-red-500">
            HIGH
            <span className="text-black mx-1 text-[8px]">PRIORITY</span>
          </h1>
        </div>
      )}
    </div>
  );
}

export default TaskPriority
