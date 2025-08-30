import axios from "axios";
import React from "react";
import { URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  if (!user) return null;
  const { _id, firstName, lastName, photoURL, about } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserFromFeed(userId));
  };

  return (
    <div className="card bg-base-300 w-full max-w-sm shadow-md">
      <figure className="w-full h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={photoURL}
          alt="image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        <div className="flex items-center justify-between px-5">
          <div className="card-actions justify-end">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="btn bg-indigo-600"
            >
              Ignore
            </button>
          </div>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn bg-pink-500"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
