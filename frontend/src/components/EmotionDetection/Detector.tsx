import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";
import micOn from "@/../public/icons/mic_on.svg";
import cameraOn from "@/../public/icons/camera_on.svg";
import micOff from "@/../public/icons/mic_off.svg";
import cameraOff from "@/../public/icons/camera_off.svg";
import Image from "next/image";

const Detector = () => {
  const webcamRef = useRef<Webcam>(null);
  const [emotion, setEmotion] = useState<string>();
  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);

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
      setEmotion(
        detectionsWithExpression?.expressions.asSortedArray()[0].expression
      );
    } else {
      // console.log("Not visible");
    }
    // console.log("triggered");
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
      <div className="relative w-[600px] max-w-[90vw] md:aspect-[4/3] aspect-[3/4] outline-2 outline outline-[#DC9750] overflow-hidden">
        <div className="text-white text-lg text-center capitalize absolute top-0 w-full">
          {emotion}
        </div>
        {video && (
          <Webcam
            audio={false}
            width={"600px"}
            className="rounded-lg max-w-[90vw] md:aspect-[4/3] aspect-[3/4]"
            muted={!video}
            ref={webcamRef}
          />
        )}
      </div>
      <div className="flex gap-4 mt-4 justify-center">
        <div
          className={`relative rounded-full aspect-square w-[75px] outline-4 outline outline-white ${
            !audio ? "bg-red-400" : "bg-transparent"
          }`}
          onClick={() => {
            setAudio(!audio);
          }}
        >
          {!audio ? (
            <Image
              src={micOff.src}
              height={55}
              width={55}
              style={{ margin: "10px" }}
              alt="icon"
            />
          ) : (
            <Image
              src={micOn.src}
              height={55}
              width={55}
              style={{ margin: "10px" }}
              alt="icon"
            />
          )}
        </div>
        <div
          className={`relative rounded-full aspect-square w-[75px] outline-4 outline outline-white ${
            !video ? "bg-red-400" : "bg-transparent"
          }`}
          onClick={() => {
            setVideo(!video);
          }}
        >
          {!video ? (
            <Image
              src={cameraOff.src}
              height={55}
              width={55}
              style={{ margin: "10px" }}
              alt="icon"
            />
          ) : (
            <Image
              src={cameraOn.src}
              height={55}
              width={55}
              style={{ margin: "10px" }}
              alt="icon"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Detector;
