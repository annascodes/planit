import React, { useEffect, useState } from "react";
import ManuallyAddNewUser from "../components/ManuallyAddNewUser";
import GenerateRandomUser from "../components/GenerateRandomUser";
import useFetch from "../utilities/useFetch";
import CheckBoxDropdown from "../components/CheckBoxDropdown";
import usePostData from "../utilities/usePostData";
import toast from "react-hot-toast";

const AddNewUser = () => {
  const [decision, setDecision] = useState(null);
  const [user, setUser] = useState({});

  const {
    data: designations,
    loading,
    err,
  } = useFetch(`/api/designation/getalldesigs`);

  const {
    postData,
    data: generatedData,
    loading: gLoading,
    err: gErr,
  } = usePostData("/api/user/generateuser");

  const handleAutoGenerateuser = async () => {
    if (!user.fullname || !user.title || !user.gender) {
      // console.log('need: fullname, title and gender alltogether')
      toast.error('need: fullname, title and gender alltogether')

      return;
    }
    postData(user);
 
  };

  useEffect(() => {
    if (generatedData) {
      toast.success(`${generatedData.username}`);
    }
  }, [generatedData]);
  return (
    <div className="border-0 border-black md:w-1/2 mx-auto">
      <div className="">
        <label className="form-control   w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is fullname?</span>
          </div>
          <input
            type="text"
            onChange={(e) => {
              setUser({ ...user, fullname: e.target.value });
            }}
            placeholder="Type here..."
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <div className="flex flex-row justify-start gap-0">
          <label className="form-control   w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is designation?</span>
            </div>
            {designations && (
              <CheckBoxDropdown
                name="title"
                user={user}
                setUser={setUser}
                options={designations}
              />
            )}
          </label>
          <label className="form-control    w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is designation?</span>
            </div>
            {designations && (
              <CheckBoxDropdown
                name="gender"
                user={user}
                setUser={setUser}
                options={[{ title: "male" }, { title: "female" }]}
              />
            )}
          </label>
        </div>
      </div>

      {!(decision === "auto" || decision === "manually") && (
        <div className="flex justify-start gap-4 mt-20">
          {gLoading ? (
            <button className="btn btn-outline tracking-widest font-normal uppercase text-xs">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              onClick={handleAutoGenerateuser}
              className="btn btn-outline tracking-widest font-normal uppercase text-xs"
            >
              Auto generate
            </button>
          )}

          <button className="btn tracking-widest font-normal uppercase text-xs">
            Manually
          </button>
        </div>
      )}

      {decision === "auto" && (
        <div>
          {/* <div className="md:w-1/2 flex items-center font-medium text-blue-500 gap-1 tracking-widest uppercase text-xs">
            generating <span className="loading loading-dots loading-md"></span>
          </div> */}
        </div>
      )}

      {decision === "manually" && <ManuallyAddNewUser />}

      <div>
        <GenerateRandomUser />
      </div>
    </div>
  );
};

export default AddNewUser;
