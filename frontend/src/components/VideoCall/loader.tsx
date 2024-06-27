"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getUserDetails, UserDetailsFC } from "@/helpers/api";
import "@/components/VideoCall/VideoCall.css";
import Detector from "../EmotionDetection/Detector";

const VideoCallLoader = () => {
  const [data, setData] = useState<UserDetailsFC>();
  const [proceed, setProceed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const c1 = await getUserDetails();
      setData(c1);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-xl font-semibold">
      <Detector />
      <button className="join-button mt-8" onClick={() => setProceed(!proceed)}>
        Join Now as {data?.username}
      </button>
    </div>
  );
};

export default VideoCallLoader;
