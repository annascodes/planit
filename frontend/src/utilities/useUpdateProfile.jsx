import { useSelector } from "react-redux"
import toast from "react-hot-toast";
import React, { useEffect, useState } from 'react'

const useUpdateProfile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

  const updateProfileApi = async ({formData, id}) => {
    console.log("HOOK update profile", formData, id);
    try {
      setLoading(true);
      const res = await fetch(`/api/user/updateuser/${id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setErr(data.message);
        setLoading(false);
      } else {
        console.log(data);
        setData(data);
        setLoading(false);
        setErr(null);
        toast.success("Profile updated");
      }
    } catch (error) {
      console.log(error);
      setErr(error.message);
      setLoading(false);
    }
  };

//   useEffect(() => {
//     updateProfileApi()
//   }, []);
  return { data, loading, err, updateProfileApi };
};

export default useUpdateProfile




