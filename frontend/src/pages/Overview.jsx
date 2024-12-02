import React, { useEffect } from 'react'
import useFetch from '../utilities/useFetch';

const Overview = () => {

  const { data, loading, err } = useFetch(`/api/task/getalltasks`);

  console.log('data:', data)
  console.log('loading:', loading)
  console.log('err:', err)
  
  return (
    <div>
      <div className="breadcrumbs w-full text-sm">
        <ul>
          {
            [...Array(10)].map((_,i)=>{
              return (
                <li>
                  <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        Shoes!
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          }
          
        </ul>
      </div>
    </div>
  );
}

export default Overview
