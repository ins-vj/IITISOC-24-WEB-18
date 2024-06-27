import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";

const Detector = () => {
  const webcamRef = useRef<Webcam>(null);
  const [emotion, setEmotion] = useState<string>();

  const loadModels = async () => {
    const MODEL_URL = `/models`;
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
    ]);
  };

  const predictEmotion = async () => {
    const video = webcamRef.current?.video;
    if (video) {
      const detectionsWithExpression = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      console.log(detectionsWithExpression);
      setEmotion(
        detectionsWithExpression?.expressions.asSortedArray()[0].expression
      );
    } else {
      console.log("ggh");
    }
    console.log("triggered");
  };

  useEffect(() => {
    const load = async () => {
      await loadModels();
    };
    load();
    const interval = setInterval(async () => {
      await predictEmotion();
    }, 500);
    return () => clearInterval(interval);
  }, [emotion]);

  return (
    <div>
      <div className="relative">
        <Webcam audio={false} width={"600px"} />
      </div>
    </div>
  );
};

export default Detector;
