import React, { useState } from 'react'
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
 

const GeneralCheckBoxDropdown = ({options, selectedOption}) => {
 const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn font-medium tracking-widest btn-sm m-1"
        >
          {selected || "select here"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 border border-black max-h-96 overflow-auto  rounded-md z-[1] w-52 p-2 shadow"
        >
          <div className="flex flex-col">
            {options && options.map((o, oi) => {
              return (
                <div
                  onClick={() => {
                    setSelected(o);
                    selectedOption(o)
                  }}
                  className="hover:bg-zinc-100 cursor-pointer duration-200 rounded-md flex flex-row items-center gap-2"
                >
                  {selected === o ? (
                    <MdOutlineCheckBox className="text-2xl text-blue-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-xl" />
                  )}
                  <h1 className="text-lg">{o}</h1>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default GeneralCheckBoxDropdown
