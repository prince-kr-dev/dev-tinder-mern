import { Check, X } from "lucide-react";
import React from "react";

function RequestListCard({ data, requestId, reviewRequest }) {
  return (
    <ul className="max-w-150 bg-base-300 rounded-2xl shadow-md divide-y divide-base-300 m-auto">
      <li className="mb-4 flex items-center gap-4 p-4 hover:bg-base-200 transition rounded-xl">
        <div className="flex items-center justify-between w-full">
          {/* Left: Profile Info */}
          <div className="flex items-center gap-4">
            <img
              className="w-14 h-14 rounded-full object-cover shadow"
              src={data.photoURL || "https://via.placeholder.com/150"}
              alt={`${data.firstName} ${data.lastName}`}
            />

            <div className="flex flex-col">
              <span className="text-sm md:text-lg font-medium">
                {data.firstName} {data.lastName}
              </span>
              <span className="text-sm text-gray-500 line-clamp-1">
                {data.about || "No bio available"}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => reviewRequest("rejected", requestId)}
              className="px-1.5 py-1.5 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
            >
              <X />
            </button>
            <button
              onClick={() => reviewRequest("accepted", requestId)}
              className="px-1.5 py-1.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              <Check />
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default RequestListCard;
