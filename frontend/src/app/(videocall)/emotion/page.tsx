"use client";
import React from "react";
import Detector from "@/components/EmotionDetection/Detector";

const EmotionDetect = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Detector />
    </div>
  );
};

export default EmotionDetect;
