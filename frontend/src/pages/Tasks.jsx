import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineViewGrid } from "react-icons/hi";
import { RiTableView } from "react-icons/ri";
import TasksListView from '../components/TasksListView';
import LoadingPage from '../components/LoadingPage';
import useFetch from '../utilities/useFetch';
import TaskStatusBadges from '../components/TaskStatusBadges';
// import CreateTask from '../components/CreateTask';

const Tasks = () => {
  const [err, setErr] = useState(null)
  const [allTasks, setAllTasks] = useState([])
  const [view, setView] = useState('board')
  const [loading, setLoading] = useState(false)
  const {data:taskStats, loading:taskStatsLoading, err:taskStatsErr} = useFetch('/api/task/taskstats')

  useEffect(()=>{
    const getAllTasks = async()=>{
      try {
        setLoading(true)
        const res = await fetch(`/api/task/getalltasks`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false)
          console.log(data.message);
          setErr(data.message);
        } else {
          setLoading(false)
          console.log(data);
          setAllTasks(data)
          setErr(null);
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
        setErr(error.message)
      }
    }
    getAllTasks()

  },[])

  if(loading) return(
    <LoadingPage/>
  )
  return (
    <div>
      <div className="flex flex-row justify-between px-5">
        <h1 className="text-3xl">Tasks</h1>
      </div>

      {taskStatsLoading && <div>Stats are loading</div>}

      {/* {taskStats && (
        <div className="flex flex-row justify-around ">
          <h1 className="border-2 border-blue-400 text-blue-400 text-xl flex items-center gap-2  px-3">
            <span className="text-xs tracking-widest uppercase text-black">
              todo
            </span>
            {taskStats.todo}
          </h1>
          <h1 className="border-2 border-yellow-400 text-xl text-yellow-400 px-3 flex items-center gap-2">
            <span className=" text-xs tracking-widest uppercase text-black">
              inprogress
            </span>
            {taskStats.inprogress}
          </h1>
          <h1 className="border-2 border-green-400 text-xl text-green-400 px-3 flex items-center gap-2">
            <span className=" text-xs tracking-widest uppercase text-black">
              completed
            </span>
            {taskStats.completed}
          </h1>
        </div>
      )} */}
      {taskStats && (
        <div className='flex flex-row md:w-1/2 justify-between mx-auto border-0 border-black p-3 bg-zinc-100 rounded-xl'>
          <div className='flex items-center gap-1'>
            <TaskStatusBadges status={'todo'} fontsize={'xs'}/>
            {taskStats.todo}
          </div>
          <div className='flex items-center gap-1'>
            <TaskStatusBadges status={'inprogress'} fontsize={'xs'}/>
            {taskStats.inprogress}
          </div>
          <div className='flex items-center gap-1'>
            <TaskStatusBadges status={'completed'} fontsize={'xs'}/>
            {taskStats.completed}
          </div>

        </div>
      )}




      <div className="flex flex-row gap-5 px-5 my-5">
        <div
          onClick={() => {
            setView("board");
          }}
          className={`flex items-center bg-white p-2 gap-1 cursor-pointer   border-black rounded-t-lg tracking-widest text-xs ${
            view === "board" && "border-b-4"
          }`}
        >
          <HiOutlineViewGrid className="text-xl" />
          BOARD VIEW
        </div>
        <div
          onClick={() => {
            setView("list");
          }}
          className={`flex items-center bg-white p-2 gap-1 cursor-pointer   border-black rounded-t-lg tracking-widest text-xs ${
            view === "list" && "border-b-4"
          }`}
        >
          <RiTableView className="text-xl" />
          LIST VIEW
        </div>
      </div>

      {/* className="flex flex-wrap flex-row justify-around" */}
      {allTasks.length === 0 && (
        <div className="flex flex-row items-center justify-center min-h-48 tracking-widest text-gray-500">
          <span>no task yet</span>
        </div>
      )}
      {view === "board" ? (
        <div className="flex flex-row flex-wrap justify-around gap-y-9">
          {allTasks.length > 0 &&
            allTasks.map((t, t_i) => {
              return <TaskCard key={t_i} task={t} />;
            })}
        </div>
      ) : (
        <TasksListView tasks={allTasks} />
      )}
    </div>
  );
}

export default Tasks
