import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Users = () => {
    const [allUsers, setAllUsers] = useState([])

      useEffect(() => {
        const getAllUsers = async () => {
          try {
            const res = await fetch(`/api/user/getallusers`);
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
              console.log(data);
              setAllUsers(data);
            }
          } catch (error) {
            console.log(error);
          }
        };
       
        getAllUsers();
    
      }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            
            <th className='text-xs uppercase tracking-widest '>Name</th>
            <th className='text-xs uppercase tracking-widest '>Currently</th>
            <th className='text-xs uppercase tracking-widest '>Designation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

    {
        allUsers.length>0 &&
        allUsers.map((u,u_i)=>{
            return (
              <tr key={u_i}>
                <td>
                  <Link
                    to={`/profile/${u.username}`}
                    className="hover:bg-slate-100 hover:scale-110 duration-200 flex items-center gap-3"
                  >
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            u.profileImg ||
                            `https://avatar.iran.liara.run/public/boy?username=${u.username}`
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">{u.fullname}</div>
                      <div className="text-sm opacity-50">@{u.username}</div>
                    
                    </div>
                  </Link>
                </td>
                <td>
                  currently working projects
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    currently working projects
                  </span>
                </td>
                <td>
                  <span className='border-2 border-black tracking-widest px-0.5 font-semibold'>{u.title}</span>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            );
        })
    }
         
           
        </tbody>
       
      </table>
    </div>
  );
}

export default Users
