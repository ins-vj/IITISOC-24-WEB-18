"use client";
import VideocallComponent from "@/components/Call/Videocall";
import {
  VideoCallContext,
  VideoCallProvider,
} from "@/components/Call/VideocallHandler";
import React, { useContext } from "react";

const CallPage = ({ params }: { params: { callId: string } }) => {
  return (
    <VideoCallProvider meetId={params.callId}>
      <div>{params.callId}</div>
      <VideocallComponent />
    </VideoCallProvider>
  );
};

export default CallPage;
