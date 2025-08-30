import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import RequestListCard from "./RequestListCard";

function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      // After reviewing, refetch updated list
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1 className="mt-10 text-center text-xl">Loading...</h1>;
  if (requests.length === 0) return <h1 className="mt-10 text-xl text-center">No Requests</h1>;

  return (
    <div className="pt-10">
      <h1 className="text-2xl text-center mb-5">Requests</h1>
      {requests.map((req, i) => (
        <RequestListCard
          key={i}
          data={req.fromUserId} 
          requestId={req._id} 
          reviewRequest={reviewRequest}
        />
      ))}
    </div>
  );
}

export default Requests;
