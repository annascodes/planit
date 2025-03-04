import React, { useEffect, useState } from 'react'
              import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { HiOutlineSelector } from "react-icons/hi";


const CreateTeam = ({task,setTask}) => {
  const [allTeams, setAllTeams] = useState([])
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamName, setTeamName] = useState(null);
  const [err, setErr] = useState(null);
  const [individualOne, setIndividualOne] = useState(null)

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
    const getAllTeams = async()=>{
      try {
        const res = await fetch(`/api/team/getallteams`)
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
          setErr(data.message)
        }else{
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
    if (selectedUsers.length < 2) {
      setErr("atleast select 2 users for team");
      return;
    }
    if(!teamName) {
      setErr('Team name is required')
      return
    }
    console.log(selectedUserIds, teamName);

    try {
      
      const res = await fetch(`/api/team/createteam`, 
      {
        method:'post',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          team: selectedUserIds,
          teamName
        })
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
        setErr(data.message)
      }
      else{
        console.log(data);
        setAllTeams([...allTeams, data])
        setErr(null)
        setSelectedUserIds([])
        setSelectedUsers([])
        setTeamName('')
        toast.success(`Team "${data?.teamName}" Created`);
      }
    } catch (error) {
      console.log(error)
      setErr(error.message)
    }

   
  };

   useEffect(() => {
     setTask({...task,
       assignedtoteam: selectedTeam?._id,
       assignedtouser: individualOne?._id,
     });
   }, [selectedTeam, individualOne]);

  //  console.log(selectedTeam)
  return (
    <div className="">
      {}
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
      {/* ---- */}
      <label className="form-control w-full  ">
        <div className="label flex flex-row justify-start gap-3">
          <span className="label-text tracking-widest text-xs text-black font-semibold">
            ASSIGN-TO
          </span>
          {individualOne && (
            <div className="bg-blue-200 p-1 rounded-lg">
              <span className="mr-1">{individualOne?.fullname} -</span>
              <span className="mr-1">@{individualOne?.username} -</span>
              <span>({individualOne?.title})</span>
            </div>
          )}
        </div>
        <div className="border-0">
          {selectedTeam && (
            <div className="border-0 border-black p-2 rounded-lg">
              <div>
                <span className="tracking-widest text-xs font-semibold">
                  - team
                </span>
                <span className=" mx-2 text-xl font-semibold text-gray-500">
                  "{selectedTeam.teamName}"
                </span>
                <span className="text-sm">
                  ({selectedTeam.team.length} members)
                </span>
              </div>
              <div>
                <div className="flex  gap-1 flex-wrap my-1">
                  {selectedTeam?.team.map((m, m_i) => {
                    return (
                      <div
                        key={m_i}
                        className="flex gap-1  items-center bg-blue-200 rounded-md px-1"
                      >
                        <span className="font-semibold">@{m.username}</span>
                        <span>({m?.title})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </label>

      <div className="flex flex-row flex-wrap  ">
        <div className="">
          {/* select individual one */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm">
              select individual one
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
                        setSelectedTeam(null);
                        if (individualOne?._id !== u._id) {
                          setIndividualOne(u);
                        } else {
                          setIndividualOne(null);
                        }
                      }}
                      key={u_i}
                      className="cursor-pointer hover:underline underline-offset-4 flex flex-row items-center gap-1"
                    >
                      {individualOne?._id === u._id ? (
                        <MdOutlineCheckBox className="text-2xl" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                      )}

                      <img
                        src={
                          u?.profileImg ||
                          `https://avatar.iran.liara.run/public/boy?username=${u?.username}`
                        }
                        className="w-10 h-10"
                        alt=""
                      />
                      <p className="text-lg">{u?.username}</p>
                      <p className="text-gray-400">({u?.title})</p>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="divider divider-accent">OR</div>
        <div className="">
          {/* select team */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm">
              select team
              <HiOutlineSelector className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  bg-base-100 rounded-box z-[1] w-80 p-2 shadow border-4 max-h-60 overflow-auto flex flex-col"
            >
              {allTeams.length > 0 &&
                allTeams.map((t, t_i) => {
                  return (
                    <div
                      onClick={() => {
                        setIndividualOne(null);
                        if (selectedTeam?._id !== t._id) {
                          setSelectedTeam(t);
                        } else {
                          setSelectedTeam(null);
                        }
                      }}
                      key={t_i}
                      className="cursor-pointer hover:underline underline-offset-4 flex flex-row items-center gap-1"
                    >
                      <span>{++t_i} - </span>
                      {selectedTeam?._id === t._id ? (
                        <MdOutlineCheckBox className="text-2xl text-blue-500 " />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                      )}

                      <p className="text-lg">{t?.teamName}</p>
                      <p className="text-gray-400">
                        ({t?.team.length} members)
                      </p>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      {/* ----- */}
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
            {selectedUsers.length > 0 &&
              selectedUsers.map((u, u_i) => {
                return (
                  <div
                    key={u_i}
                    className="flex gap-1 items-center bg-blue-200 rounded-md px-1"
                  >
                    @{u}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        let temp = selectedUserIds.filter(
                          (i) => i !== selectedUserIds[u_i]
                        );
                        let temp2 = selectedUsers.filter(
                          (username) => username !== u
                        );
                        setSelectedUsers(temp2);
                        setSelectedUserIds(temp);
                      }}
                    >
                      <MdClose className=" text-red-500 hover:scale-150 duration-300" />
                    </button>
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
                        if (!selectedUsers.includes(u.username)) {
                          setSelectedUsers([...selectedUsers, u.username]);
                          setSelectedUserIds([...selectedUserIds, u._id]);
                        } else {
                          let temp2 = selectedUserIds.filter(
                            (i) => i !== u._id
                          );
                          let temp = selectedUsers.filter(
                            (user) => user !== u.username
                          );
                          setSelectedUsers(temp);
                          setSelectedUserIds(temp2);
                        }
                      }}
                      key={u_i}
                      className="cursor-pointer flex flex-row items-center gap-1"
                    >
                      {selectedUsers.includes(u.username) ? (
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
    </div>
  );
}

export default CreateTeam
