import React, { useEffect, useState } from 'react'
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { HiOutlineSelector } from "react-icons/hi";
import AddDesignation from './Designations';


const Team = (/* {task,setTask} */) => {
    const [allTeams, setAllTeams] = useState([])
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [teamName, setTeamName] = useState(null);
    const [err, setErr] = useState(null);
    const [individualOne, setIndividualOne] = useState(null)
    const [sUsers, setSUsers] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await fetch(`/api/user/getallusers`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                } else {
                    // console.log(data);
                    setAllUsers(data);
                }
            } catch (error) {
                console.log(error);

            }
        };
        const getAllTeams = async () => {
            try {
                const res = await fetch(`/api/team/getallteams`)
                const data = await res.json()
                if (!res.ok) {
                    console.log(data.message)
                    setErr(data.message)
                } else {
                    // console.log(data)
                    setAllTeams(data)
                    setErr(null)
                }

            } catch (error) {
                console.log(error)
                setErr(error.message)
            }
        }
        getAllUsers();
        getAllTeams()
    }, []);

    // console.log(selectedUsers);
    // console.log(allTeams)


    const handleCreateTeam = async () => {
        if (sUsers.length < 2) {
            setErr("atleast select 2 users for team");
            return;
        }
        if (!teamName) {
            setErr('Team name is required')
            return
        }
        console.log(selectedUserIds, teamName, selectedUsers);
        const hasManager = sUsers.some(user=>user.title=== 'manager')
        if(!hasManager){
            // team should have atleast one manager
            console.log("Team should have atleast one manager")
            setErr("Team should have atleast one manager")
            return
        }

        try {

            const res = await fetch(`/api/team/createteam`,
                {
                    method: 'post',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        team: sUsers.map(u=>u._id),
                        teamName
                    })
                })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
                setErr(data.message)
            }
            else {
                console.log(data);
                setAllTeams([...allTeams, data])
                setErr(null)
                 setSUsers([])
                setTeamName('')
                toast.success(`Team "${data?.teamName}" Created`);
            }
        } catch (error) {
            console.log(error)
            setErr(error.message)
        }


    };

   
    const handleSUsers = (user)=>{
        const hasUser = sUsers.some(u=>u.username === user.username)
        if(hasUser){
            // then remove it 
            let temp = sUsers.filter(u=>u.username!== user.username)
            setSUsers(temp)

        }else{
            //add it
            setSUsers([...sUsers, user])
        }
    }
    console.log(sUsers)
    return (
        <div className="">

         <div className='flex flex-row justify-end px-3'>
               {/* add designations */}
               <AddDesignation/> 

         </div>
            {err && (
                <div role="alert" className="alert alert-error p-2 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{err}</span>
                </div>
            )}

            <div className='border-2 border-dashed border-gray-400 my-2 p-2'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text tracking-widest text-xs text-black font-semibold">
                            CREATE-TEAM
                        </span>
                    </div>
                    {/* {
          selectedUserIds.length >0 && selectedUserIds.map((i,i_i)=>{
            return(
              <div key={i_i}>
                {i}
              </div>
            )
          })
        } */}
                    <div className="flex flex-row flex-wrap gap-1">
                        {sUsers.length > 0 &&
                            sUsers.map((u, u_i) => {
                                return (
                                    <div
                                        key={u_i}
                                        className="flex gap-1 items-center bg-blue-200 rounded-md px-1"
                                    >
                                        @{u.username} | {u.title}
                                         
                                    </div>
                                );
                            })}
                    </div>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text tracking-widest text-xs text-black font-semibold">
                            - choose members
                        </span>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm">
                            select more than 1
                            <HiOutlineSelector className="text-xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content  bg-base-100 rounded-box z-[1] w-80 p-2 shadow border-4 max-h-60 overflow-auto flex flex-col"
                        >
                            {allUsers.length > 0 &&
                                allUsers.map((u, u_i) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setErr(null);
                                                
                                                handleSUsers(u)
                                            }}
                                            key={u_i}
                                            className="cursor-pointer flex flex-row items-center gap-1"
                                        >
                                            
                                            {sUsers.some(user=>user.username === u.username) ? (
                                                <MdOutlineCheckBox className="text-2xl" />
                                            ) : (
                                                <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                                            )}

                                            <img
                                                src={
                                                    u.profileImg ||
                                                    `https://avatar.iran.liara.run/public/boy?username=${u?.username}`
                                                }
                                                className="w-10 h-10"
                                                alt=""
                                            />
                                            <p className="text-lg hover:underline underline-offset-4">
                                                {u?.username}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                ({u?.title})
                                            </p>
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text tracking-widest text-xs text-black font-semibold">
                            - team name
                        </span>
                    </div>
                    <input
                        type="text"
                        value={teamName}
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            setErr(null);
                            setTeamName(e.target.value);
                        }}
                    />
                    <span className="text-sm">
                        *NOTE: Type in camelCase with no spaces
                    </span>
                </label>
                <div className="flex justify-center">
                    <button
                        onClick={handleCreateTeam}
                        className="btn btn-xs btn-outline mt-2  hover:text-white tracking-widest"
                    >
                        CREATE TEAM
                    </button>
                </div>
            </div>

            {/* ---table  */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team</th>
                            <th>Members</th>
                            <th>Delete team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {
                            allTeams && allTeams.map((t, ti) => {
                                return (
                                    <tr>
                                        <th>{++ti}</th>
                                        <td>{t.teamName}</td>
                                        <td className='flex flex-row justify-center flex-wrap gap-1'>
                                            {
                                                t.team.map((m,mi)=>{
                                                    return(
                                                        <Link    to={`/profile/${m.username}`} className='my-1 bg-neutral-700 hover:bg-neutral-500 duration-200  text-white rounded-xl block p-1 '>
                                                             
                                                            @ {m.username}
                                                             | <span className=''>{m.title}</span>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            <button className='btn btn-error uppercase btn-xs text-white tracking-widest text-xs'>
                                                delete it
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Team
