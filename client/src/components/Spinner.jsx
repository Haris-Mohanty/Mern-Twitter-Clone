import React from "react";
import { useSelector } from "react-redux";

const Spinner = () => {
  const { loading } = useSelector((state) => state.spinner);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-700"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
