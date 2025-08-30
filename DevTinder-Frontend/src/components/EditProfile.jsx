import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  // ✅ Initialize with safe defaults
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const [showToast, setShowToast] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Sync state when user changes (important for async loading)
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setCountdown(3);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  // ✅ Auto close toast after countdown
  useEffect(() => {
    if (showToast && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showToast && countdown === 0) {
      setShowToast(false);
      navigate("/viewprofile");
    }
  }, [showToast, countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-4">
      {showToast && (
        <div className="toast toast-top toast-end pt-15">
          <div className="alert alert-success py-2">
            <span className="font-medium flex items-center gap-2">
              <h5>Profile saved successfully.</h5>
              <span className="text-white font-medium text-lg">
                {countdown}
              </span>
            </span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-xl p-5">
        <h2 className="text-xl font-semibold text-center mb-5">Edit Profile</h2>

        <div className="space-y-3">
          {/* Preview */}
          {photoURL && (
            <div className="flex justify-center">
              <img
                src={photoURL}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border border-gray-600 mt-2"
              />
            </div>
          )}

          {/* First Name */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter age"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="resize-none w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm mb-1">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter photo URL"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
