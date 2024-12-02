import React, { useState } from 'react'

const useUpdate = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const updateData =  async(formData={})=>{
    try {
        setLoading(true)
        const res = await fetch(url, 
            {
                method: 'post',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
        const resData = await res.json()
        if(!res.ok){
            console.log(resData)
            setErr(resData.message);
            setLoading(false)
        }else{
            setData(resData)
            setLoading(false)
            setErr(null)
        }
        
    } catch (error) {
        console.log(error);
        setErr(error.message);
        setLoading(false);
    }
  }

  return {data, loading, err, updateData};
 }

export default useUpdate
