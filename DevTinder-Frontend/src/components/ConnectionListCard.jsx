import React from "react";

function ConnectionListCard({ data }) {
//   console.log(data);

  return (
    <ul className="max-w-150 bg-base-300 rounded-2xl shadow-md divide-y divide-base-300 m-auto">
      <li className="mb-4 flex items-center gap-4 p-4 hover:bg-base-200 transition rounded-xl">
        <img
          className="w-14 h-14 rounded-full object-cover shadow"
          src={data.photoURL || "https://via.placeholder.com/150"}
          alt={`${data.firstName} ${data.lastName}`}
        />

        <div className="flex flex-col">
          <span className="text-lg font-semibold">
            {data.firstName} {data.lastName}
          </span>
          <span className="text-sm text-gray-500 line-clamp-1">
            {data.about || "No bio available"}
          </span>
        </div>

        <div className="ml-auto">
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm shadow hover:bg-blue-700 transition">
            View
          </button>
        </div>
      </li>
    </ul>
  );
}

export default ConnectionListCard;
