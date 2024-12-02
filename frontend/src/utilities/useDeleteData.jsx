import React, { useState } from 'react'

const useDeleteData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
  
    const deletedata = async(formData={})=>{
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                    method:'delete',
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                  
                })
            const resData = await res.json();
            if(!res.ok){
                console.log(resData.message);
                setErr(resData.message)
                setLoading(false)
            }else{
                setLoading(false);
                setErr(null);
                setData(resData)
            }
            
        } catch (error) {
            setErr(error.message)
            setLoading(false)
        }
    }
    return { deletedata, data, loading, err };
}

export default useDeleteData
