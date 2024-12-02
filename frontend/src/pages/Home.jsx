import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className="">
      <h1 className="text-center h-screen flex flex-col items-center justify-center text-2xl">
        <span className="my-10">
          Welcome,{" "}
          <span className="font-semibold tracking-widest">
            {currentUser?.fullname}.
          </span>
        </span>
        <div className="max-w-md scale-150">
          <div className="flex flex-row  justify-center items-center gap-3">
            <div className="loader"></div>
            <h1
              style={{ fontFamily: "Bebas Neue" }}
              className="text-5xl font-bold "
            >
              PlanIt.
            </h1>
          </div>
          <p className="py-1 text-xs">
            "Get things done with effortless ease."
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
          {/* <div className="flex flex-row justify-center  my-14 "></div> */}
        </div>
      </h1>
      <Link>go there</Link>
    </div>
  );
}

export default Home
