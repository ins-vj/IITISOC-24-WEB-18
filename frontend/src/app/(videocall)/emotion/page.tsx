"use client";
import React, { useEffect } from "react";
import Detector from "@/components/EmotionDetection/Detector";

const EmotionDetect = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Detector video={true} audio={true} />
      Hello
    </div>
  );
};

export default EmotionDetect;
