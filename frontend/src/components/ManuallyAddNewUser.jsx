import React, { useEffect } from 'react'

const ManuallyAddNewUser = () => {

    useEffect(()=>{
        
        // generateUser();
    },[])
  return (
    <div className="mt-5 md:w-1/2 mx-auto">
      <h1 className="uppercase tracking-widest text-xs text-center"> 
        Manually Add User
      </h1>
      <div className="flex flex-col gap-3 mt-2 ">
        <label className="input input-bordered flex items-center gap-2">
          <span className="text-xs tracking-widest">-username</span>
          <input type="text" className="grow" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <span className="text-xs tracking-widest">-email</span>
          <input type="text" className="grow" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span className="text-xs tracking-widest">-password</span>
          <input type="text" className="grow" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <span className="text-xs tracking-widest">-title</span>
          <input type="text" className="grow" />
        </label>
      </div>
    </div>
  );
}

export default ManuallyAddNewUser
