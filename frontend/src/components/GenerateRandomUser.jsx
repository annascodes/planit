import React, { useState } from "react";
import { MdRestartAlt } from "react-icons/md";

const GenerateRandomUser = () => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(false)
  const generateUser = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://randomuser.me/api/`);
      const data = await res.json();
      if (!res.ok) {
        console.log("error: ", data);
        setLoading(false)
      } else {
        console.log("data: ", data);
        setUser(data);
        setLoading(false)
      }
    } catch (error) {
        setLoading(false)
      console.log(error);
    }
  };

  return (
    <div className="md:w-1/3 my-5  ">
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <button onClick={generateUser} className="btn btn-xs tracking-widest  btn-outline">
          {user && <MdRestartAlt className="text-lg" />}
          random user
        </button>
      )}

      {user && (
        <div className="my-3 bg-gray-100 p-2 rounded-md">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setUser(null);
              }}
              className="text-xs hover:text-red-500 duration-200"
            >
              close
            </button>
          </div>
          <img
            src={user?.results[0]?.picture?.large}
            className="w-16 h-16 rounded-lg mx-auto"
            alt=""
          />
          <h1>
            <span className="text-xs tracking-widest">-fullname</span>{" "}
            {user?.results[0]?.name?.first} {user?.results[0]?.name?.last}
          </h1>
          <h1>
            {" "}
            <span className="text-xs tracking-widest">-username</span>{" "}
            {user?.results[0]?.login?.username}
          </h1>
          <h1>
            <span className="text-xs tracking-widest">-gender</span>{" "}
            {user?.results[0]?.gender}
          </h1>
        </div>
      )}
    </div>
  );
};

export default GenerateRandomUser;
