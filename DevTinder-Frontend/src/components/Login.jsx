import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ If backend returns a token, save it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Save user into Redux + localStorage
      dispatch(addUser(res.data.user));

      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Login failed");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      dispatch(addUser(res.data.user || res.data.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginFrom ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginFrom && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary"
              onClick={isLoginFrom ? handleLogin : handleSignUp}
            >
              {isLoginFrom ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className=" text-center cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginFrom
              ? "New user ? signup here"
              : "Existing User ? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
