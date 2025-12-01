"use client";

import { getMyRequests, myRequest, toggleRequest } from "@/utils/axios/houseMatesEndPoints";
import useHouseStore from "@/utils/store/useHouseStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Requests() {
  const [activeTab, setActiveTab] = useState("received");
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const { error, setHouseError, message, setHouseMessage } = useHouseStore();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      setHouseError(null);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setHouseMessage(null);
    }
  }, [message]);

  // Fetch requests sent TO ME
  const fetchReceived = async () => {
    try {
      const res = await getMyRequests();
      setReceivedRequests(res?.requests || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch requests sent BY ME
  const fetchSent = async () => {
    try {
      const res = await myRequest();
      console.log("my requests", res);
      setSentRequests(res || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle request accepted/rejected
  const handleToggle = async (id, newStatus) => {
    try {
      const res = await toggleRequest(id, newStatus);
      toast.success(res.message || `Request marked ${newStatus}`);
      fetchReceived();
      if (newStatus === "accepted" && res.chatId) {
        router.push(`/home/chat/${res.chatId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReceived();
    fetchSent();
  }, []);

  return (
    <section className="min-h-screen text-white container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">Requests</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-white/10 pb-3 mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`pb-2 px-3 text-lg font-medium border-b-2 ${
            activeTab === "received"
              ? "border-white text-white"
              : "border-transparent text-gray-400"
          }`}
        >
          Received
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`pb-2 px-3 text-lg font-medium border-b-2 ${
            activeTab === "sent"
              ? "border-white text-white"
              : "border-transparent text-gray-400"
          }`}
        >
          Sent
        </button>
      </div>

      {/* Received Requests */}
      {activeTab === "received" && (
        <div className="space-y-5">
          {receivedRequests.length === 0 ? (
            <p className="text-gray-400">No requests received yet.</p>
          ) : (
            receivedRequests.map((req) => (
              <div
                key={req._id}
                className="p-5 bg-white/5 rounded-xl border border-white/10"
              >
                <Image
                  src={req?.requesterId?.profilePics?.url}
                  alt={req?.requesterId?.username || "User"}
                  width={50}
                  height={50}
                  className="rounded-full size-[50px] object-cover"
                />
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {req?.requesterId?.username || "Unknown User"}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {new Date(req.createdAt).toDateString()}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Email: {req?.requesterId?.email}
                </p>

                <p className="mt-3 capitalize">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      req.status === "accepted"
                        ? "bg-green-700"
                        : req.status === "rejected"
                        ? "bg-red-700"
                        : "bg-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "pending" && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => handleToggle(req._id, "accepted")}
                      className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleToggle(req._id, "rejected")}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {req.status !== "pending" && (
                  <button
                    onClick={() =>
                      handleToggle(
                        req._id,
                        req.status === "accepted" ? "rejected" : "accepted"
                      )
                    }
                    className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    {req.status === "accepted"
                      ? "Mark as Rejected"
                      : "Mark as Accepted"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Sent Requests */}
      {activeTab === "sent" && (
        <div className="space-y-5">
          {sentRequests.length === 0 ? (
            <p className="text-gray-400">You haven't sent any requests yet.</p>
          ) : (
            sentRequests.map((req) => (
              <div
                key={req._id}
                className="p-5 bg-white/5 rounded-xl border border-white/10"
              >
                <Image
                  src={req?.posterId?.profilePics?.url}
                  alt={req?.posterId?.username || "User"}
                  width={50}
                  height={50}
                  className="rounded-full size-[50px] object-cover"
                />

                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {req?.posterId?.username || req?.posterId?.email}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {new Date(req.createdAt).toDateString()}
                  </span>
                </div>

                <p className="text-gray-400 text-sm capitalize">
                  Status: {req.status}
                </p>

                {req.status === "pending" && (
                  <button className="mt-4 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                    Cancel Request
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
