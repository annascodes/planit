import React, { useEffect, useState } from 'react'

import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
 


const CheckBoxDropdown = ({name,user,setUser,options}) => {
    // console.log('options:',options)
    const [selected, setSelected] = useState(null)
    useEffect(()=>{
        setUser({...user, [name]:selected })
    },[selected,setSelected])
    // console.log('---user: ', user)
  return (
    <div> 
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn font-medium tracking-widest btn-sm m-1">
          {selected || 'Select'}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 border-2 border-black max-h-96 overflow-auto  rounded-box z-[1] w-52 p-2 shadow"
        >
          <div className="flex flex-col">
            {options.map((o, oi) => {
              return (
                <div
                  onClick={() => {
                    setSelected(o.title);
                  }}
                  className="hover:bg-zinc-100 duration-200 rounded-md flex flex-row items-center gap-2"
                >
                  {selected === o.title ? (
                    <MdOutlineCheckBox className="text-3xl text-blue-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-xl" />
                  )}
                  <h1 className="text-lg">{o.title}</h1>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default CheckBoxDropdown
