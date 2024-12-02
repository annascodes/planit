import React from 'react'

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className='flex flex-row justify-center items-center gap-3 border-4 border-gray-800  px-2'>
        <span className="tracking-widest font-bold text-xl">LOADING</span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
}

export default LoadingPage
