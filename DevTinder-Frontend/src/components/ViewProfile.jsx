import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen text-white pt-10">
      <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-xl p-6">
        {/* Photo */}
        <div className="flex justify-center mb-4">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-600"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center">
          {user.firstName} {user.lastName}
        </h2>

        {/* Email */}
        <p className="text-center text-gray-400 text-sm">{user.email}</p>

        <div className="mt-4 space-y-3">
          {/* Age */}
          {user.age && (
            <div className="flex justify-between border-b border-gray-700 pb-1">
              <span className="text-gray-400">Age</span>
              <span>{user.age}</span>
            </div>
          )}

          {/* Gender */}
          {user.gender && (
            <div className="flex justify-between border-b border-gray-700 pb-1">
              <span className="text-gray-400">Gender</span>
              <span className="capitalize">{user.gender}</span>
            </div>
          )}

          {/* About */}
          <div>
            <span className="text-gray-400 block">About</span>
            <p className="text-sm mt-1">{user.about}</p>
          </div>

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div>
              <span className="text-gray-400 block">Skills</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Created & Updated */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 mt-4 space-y-1">
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p>
                Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="bg-indigo-600 text-xl px-8 rounded-md py-1 cursor-pointer hover:bg-indigo-700 transition-all"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
