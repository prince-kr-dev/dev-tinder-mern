import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return <h1 className="text-lg text-center pt-10">Not available</h1>;

  if (feed.length <= 0) {
    return <h1 className="text-lg text-center pt-10">No more users found</h1>;
  }

  return (
    feed && (
      <div className="px-4 py-6 pt-15">
        <div className="flex flex-wrap justify-center gap-6">
          {feed.map((user, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[48%] lg:w-[30%] flex justify-center"
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Feed;
