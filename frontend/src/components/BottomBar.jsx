import React from 'react'
import { GoHome } from "react-icons/go";
import { GrTask } from 'react-icons/gr';
import { FaUsersRectangle } from "react-icons/fa6";
import { PiUsersFourLight } from 'react-icons/pi';
import { LuUserPlus2 } from 'react-icons/lu';
import { RiFunctionAddLine } from 'react-icons/ri';
import { BiSolidHome } from "react-icons/bi";
import { PiUsersFourBold } from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';
import { SlBadge } from 'react-icons/sl';



const BottomBar = () => {
    const location = useLocation()
    console.log(location.pathname.split('').length < 2 )
    return (

        <div className="fixed  bg-yellow-100 bottom-0 w-full md:hidden border-0 z-20 border-0 border-black bor flex flex-row justify-around bg-white p-2 shadow-lg">
            <Link to={'/'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.split('').length < 2 && 'bg-black text-white'}`}>
                <BiSolidHome className='text-2xl'/>
            </Link>
            <Link to={'/tasks'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('tasks') && 'bg-black text-white'}`}>
                 
                <GrTask className='text-2xl'/>
            </Link>
            <Link to={'/teams'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('createteam') && 'bg-black text-white'}`}>
                <FaUsersRectangle className='text-2xl'/>
            </Link>
            <Link to={'/allusers'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('allusers') && 'bg-black text-white'}`}>
                <PiUsersFourBold className='text-2xl'/>
            </Link>
            <Link to={'/addnewuser'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('addnewuser') && 'bg-black text-white'}`}>
                <TiUserAdd className='text-2xl'/>
            </Link>
            <Link to={'/addtask'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('addtask') && 'bg-black text-white'}`}>
                <RiFunctionAddLine className='text-2xl'/>
            </Link>
            <Link to={'/roles'} className={`hover:bg-neutral-700 hover:text-white duration-200 rounded-md p-1 border-0 border-black ${location.pathname.toString().includes('roles') && 'bg-black text-white'}`}>
                <SlBadge className='text-2xl'/>
            </Link>
        </div>


    )
}

export default BottomBar;
