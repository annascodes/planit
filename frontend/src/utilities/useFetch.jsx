import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(()=>{
   
    const getFetchData = async()=>{
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
              setErr(data.message);
              setLoading(false);
            } else {
              // console.log(data);
              setData(data);
              setLoading(false);
              setErr(null);
            }
        } catch (error) {
            console.log(error)
            setErr(error.message)
            setLoading(false)
        }


    }
    getFetchData();
  },[url])

  return {data, loading, err}
}

export default useFetch
