import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="text-center">
        <h1 className="text-4xl text-red-500 font-medium">
          404 - Page Not Found
        </h1>
        <p className="text-lg">
          Oops! The page you are looking for does not exist. Please check the
          URL and try again.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
