import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import useFetch from "../utilities/useFetch";
import { TbTrash } from "react-icons/tb";
import DeletePermissionModal from "../components/DeletePermissionModal";
import toast from "react-hot-toast";
import useDeleteData from "../utilities/useDeleteData";
                    import { IoPauseCircleOutline } from "react-icons/io5";
                    import { RiUserForbidLine } from "react-icons/ri";
                    import { CiNoWaitingSign } from "react-icons/ci";


const AllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(null);
  const [delUserId, setDelUserId] = useState(null)

  const getuserswithactivetasks = async (url, isShowingMore = false) => {
    try {
      setLoading(true);
      setShowMore(true);
      const res = await fetch(url);
      const newData = await res.json();
      if (!res.ok) {
        console.log(newData.message);
        setLoading(false);
      } else {
        setLoading(false);
        if (newData.length < 5) setShowMore(false);

        console.log(newData);
        //    setCount(newData.length);
        if (isShowingMore) {
          setCount([...data, ...newData].length);
          setData([...data, ...newData]);
        }else{
             setCount(newData.length);
             setData(newData); 
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getuserswithactivetasks(`/api/user/getuserswithactivetasks`);
  }, []);

  const handleShowMore = async () => {
    getuserswithactivetasks(
      `/api/user/getuserswithactivetasks?startIndex=${count}`,
       true
    );
  };

  const { deletedata, data:delUserRes, loading:delUserLoading, err:delUserErr } =
    useDeleteData(`/api/user/deleteuser`);

  useEffect(()=>{
    if(delUserId){
       deletedata({deleteId:delUserId})

    }
   
  },[delUserId, setDelUserId])

  useEffect(()=>{
if(delUserRes){
    let tempData = data.filter((d,di)=> d.fullProfile._id !== delUserRes._id)

    setData(tempData)
    toast.success(`@${delUserRes?.username} deleted`)
}
  },[delUserRes])



  console.log("data:", data);
  console.log("count:", count);

  return (
    <div className="overflow-x-auto">
      <h1 className="tracking-widest">Users ({data.length})</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="tracking-widest">
            <th></th>
            <th>Identity</th>
            <th>Active Tasks</th>
            <th>Designation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {data.length > 0 &&
            data.map((d, di) => {
              return (
                <tr
                  key={di}
                //   className={`${
                //     (d.fullProfile._id === "672ca44840fcd3f4a4eb1496" ||
                //       d.fullProfile._id === "6725260d69809d145d7a0ec2") &&
                //     "opacity-20"
                //   }`}
                >
                  <td className="flex items-center gap-3     ">
                    <DeletePermissionModal
                      key={d?.fullProfile?._id}
                      id={d?.fullProfile?._id}
                      setDelUserId={setDelUserId}
                      name={d?.fullProfile?.fullname}
                      msg={`Do you really want to delete this user? @${d?.fullProfile?.username}`}
                    />
                    {/* <CiNoWaitingSign className="text-xl  " /> */}
                    {/* < /> */}
                  </td>
                  <td>
                    <Link
                      to={`/profile/${d?.fullProfile?.username}`}
                      className="hover:bg-blue-50 px-1 duration-200 rounded-lg flex items-center gap-3"
                    >
                      <h1>{++di}</h1>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              d?.fullProfile?.profileImg ||
                              `https://ui-avatars.com/api/?name=${d?.fullProfile?.username}`
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-base text-lg tracking-widest ">
                          {d?.fullProfile?.fullname}
                          {/* {d?.fullProfile?.email} */}
                        </div>
                        <div className="text-sm">
                          <span className="border-0 tracking-widest text-sm  p-0.5 border-black">
                            @{d?.fullProfile?.username}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </td>

                  <td className="flex flex-col gap-y-1">
                    {d?.work?.length === 0 && (
                      <span className="text-gray-400 tracking-widest text-xs">
                        no active work yet
                      </span>
                    )}
                    {d?.work &&
                      d?.work.map((w, wi) => {
                        return (
                          <div key={wi} className="flex flex-row items-center">
                            <span className=" bg-blue-100 text-blue-600 px-1 rounded-lg">
                              {w?.title}
                            </span>
                            <span className="border text-xs border-black tracking-widest text-black font-medium ml-1 px-0.5">
                              {w?.status}
                            </span>
                          </div>
                        );
                      })}
                  </td>

                  <td>
                    <span className="border-2 tracking-widest text-[10px] md:text-sm  font-semibold p-0.5 border-black">
                      {d?.fullProfile?.title}
                    </span>
                  </td>
                  <td>
                    {false ? (
                      <h1 className="cursor-pointer hover:text-blue-500  underline underline-offset-4 opacity-100 duration-200 text-xs tracking-widest uppercase">
                        disabled
                      </h1>
                    ) : (
                      <h1 className="cursor-pointer hover:text-blue-500  underline underline-offset-4 duration-200 text-xs tracking-widest uppercase">
                        disable it
                      </h1>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showMore ? (
        <div className="flex justify-around py-5  border-t-2 border-black">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span> 
          ) : (
            <button
              disabled={loading}
              onClick={handleShowMore}
              className="btn btn-sm btn-outline"
            >
              {"Show more..."}
            </button>
          )}
        </div>
      ) : (
        <span className="block text-center">Thats it</span>
      )}
    </div>
  );
};

export default AllUsers;
