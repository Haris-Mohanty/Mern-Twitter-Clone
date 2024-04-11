import React, { useState } from "react";
import logo from "../Assets/twitter.png";
import { loginUser, registerUser } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/spinnerSlice";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //********** Form submit ******************/
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = isLoggedIn
      ? { email, password }
      : { name, username, email, password };

    if (isLoggedIn) {
      //Login
      try {
        dispatch(showLoading());
        const res = await loginUser(data);
        if (res.success) {
          dispatch(setUser(res.user));
          dispatch(hideLoading());
          toast.success(res.message);
          navigate("/");
        }
      } catch (err) {
        dispatch(hideLoading());
        toast.error(err.response.data.message);
      }
    } else {
      //Register
      try {
        dispatch(showLoading());
        const res = await registerUser(data);
        if (res.success) {
          dispatch(hideLoading());
          toast.success(res.message);
          setIsLoggedIn(true);
        }
      } catch (err) {
        dispatch(hideLoading());
        toast.error(err.response.data.message);
      }
    }
  };

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-evenly w-[70%]">
          <div>
            <img src={logo} className="ml-5" width={"50%"} alt="Twitter Logo" />
          </div>
          <div>
            <div className="my-5">
              <h1 className="font-bold text-5xl">Happening Now</h1>
            </div>
            <h1 className="mt-4 mb-2 text-3xl font-semibold">
              {!isLoggedIn ? "Register" : "Login"}
            </h1>
            <form onSubmit={submitHandler} className="flex flex-col w-[65%]">
              {!isLoggedIn && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-xl my-1 text-md font-semibold"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="username"
                    placeholder="Username"
                    className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-xl my-1 text-md font-semibold"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-xl my-1 text-md font-semibold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-xl my-1 text-md font-semibold"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-[#109BF0] border-none py-2 my-3 rounded-xl text-md text-white font-semibold">
                {!isLoggedIn ? "Register" : "Login"}
              </button>
              <h1>
                {isLoggedIn
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                  onClick={loginHandler}
                  className="cursor-pointer font-bold hover:text-blue-600 underline"
                >
                  {isLoggedIn ? "Register" : "Login"}
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
