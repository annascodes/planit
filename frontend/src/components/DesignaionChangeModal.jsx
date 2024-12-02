import React, { useEffect, useState } from "react";
import { designations } from "../Constants/user";
import { BiEdit } from "react-icons/bi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import useUpdateProfile from "../utilities/useUpdateProfile";
import ShowErrorDiv from "./ShowErrorDiv";
import usePostData from "../utilities/usePostData";
import useFetch from "../utilities/useFetch";

const DesignaionChangeModal = ({ user, setUser }) => {
  const [allDesigs, setAllDesigs] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [newDesig, setnewDesig] = useState(null);

  const { data, loading, err, updateProfileApi } = useUpdateProfile();
  const {
    postData,
    data: desigData,
    loading: desigLoading,
    err: desigErr,
  } = usePostData(`/api/designation/create`);

  const {data:fetchedDesigs, loading:fetchLoading, err:fetchErr} = useFetch(`/api/designation/getalldesigs`)

  
  const handleNewDesignation = async () => {
    // console.log(newDesig)
    postData({ title: newDesig });
    console.log("data:", desigData);

    console.log("err:", desigErr);
    console.log("loading:", desigLoading);
  };


   const handleUpdateDesignation = () => {
     console.log(selectedDesignation);
     updateProfileApi({
       formData: { title: selectedDesignation },
       id: user._id,
     });
   };

useEffect(() => {
  if(desigData){
    setAllDesigs([...allDesigs, desigData])
  }
}, [desigData]);

  useEffect(() => {
    if (user) setSelectedDesignation(user.title);
  }, [user]);

  useEffect(() => {
    if (data?.title) {
      setUser({ ...user, title: data.title });
    }
  }, [data]);

  useEffect(() => {

    setAllDesigs(fetchedDesigs);
  }, [fetchedDesigs]);
  

  // console.log(allDesigs);

 
  return (
    <>
      {/* ----------modal start  */}
      {err && <ShowErrorDiv err={err} />}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {loading ? (
        <span className="loading loading-dots text-blue-600 loading-md"></span>
      ) : (
        <button
          onClick={() =>
            document.getElementById("changeDesignation").showModal()
          }
        >
          <BiEdit className="text-lg hover:text-black text-blue-400 duration-200" />
        </button>
      )}

      <dialog id="changeDesignation" className="modal">
        <div className="modal-box">
          <div className="  mb-5">
            <h1 className="text-xs tracking-widest mb-1">-new designation</h1>
            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => {
                setnewDesig(e.target.value);
              }}
              className="input input-sm input-bordered w-full max-w-xs"
            />
            <button
              onClick={handleNewDesignation}
              className="btn btn-sm uppercase btn-outline mx-2 btn-info"
            >
              add
            </button>
          </div>

          <h3 className="font-semibold text-lg"> Designation change to </h3>
          <div className="flex flex-row flex-wrap gap-x-7">
            {(allDesigs && allDesigs.length>0) && allDesigs.map((d, d_i) => {
              return (
                <button
                  onClick={() => {
                    setSelectedDesignation(d.title);
                  }}
                  className=" flex items-center gap-0 my-2"
                >
                  {selectedDesignation === d.title ? (
                    <MdOutlineCheckBox className="text-3xl text-blue-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                  )}
                  <h1>{d.title} </h1>
                </button>
              );
            })}
          </div>

          <div className="modal-action">
            <form method="dialog" className="w-full flex justify-end gap-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-outline btn-error">
                <RiCloseLargeFill />
              </button>
              <button
                onClick={handleUpdateDesignation}
                className="btn btn-sm btn-outline uppercase text-xs tracking-widest"
              >
                update designaion
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* ----------modal ends  */}
    </>
  );
};

export default DesignaionChangeModal;
