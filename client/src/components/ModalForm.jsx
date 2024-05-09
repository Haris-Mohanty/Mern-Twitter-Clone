import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { updateUserProfile } from "../api/api";
import toast from "react-hot-toast";

const ModalForm = ({ closeModal, profile, setProfile, setRefresh }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  //******** UPDATE USER PROFILE *****/
  const updateProfileHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoading());
      const res = await updateUserProfile(profile?._id, name, bio);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setProfile(res.user));
        toast.success("Profile Details Updated Successfully!");
        closeModal();
        dispatch(setRefresh());
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.err(err.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={updateProfileHandler}>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 text-center"
                    id="modal-headline"
                  >
                    Edit Profile
                  </h3>
                  <div className="mt-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs border-gray-500 rounded-md p-2"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows="3"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs border-gray-500 rounded-md p-2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
