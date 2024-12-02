import React, { useState } from "react";

const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [err, setErr] = useState(null);

  const postData = async (postData) => {
    try {
      setLoading(true);
      
        const res = await fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        const resdata = await res.json()
        if(!res.ok){
            console.log(resdata.message);
            setLoading(false);
            setErr(resdata.message);
        }else{
            setLoading(false);
            setErr(null);
            setData(resdata)
        }
     
    } catch (error) {
      console.log(error);
      setErr(error.message);
      setLoading(false);
    }
  };
  return {postData, data, loading, err}
};

export default usePostData;
