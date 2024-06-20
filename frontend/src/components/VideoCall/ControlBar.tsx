import React from "react";
import micOn from "@/../public/icons/mic_on.svg";
import cameraOn from "@/../public/icons/camera_on.svg";
import micOff from "@/../public/icons/mic_off.svg";
import cameraOff from "@/../public/icons/camera_off.svg";
import Image from "next/image";
import endCall from "@/../public/icons/end_call.svg";

const ControlBar = ({
  video,
  audio,
  toggleVideo,
  toggleAudio,
}: {
  video: boolean;
  audio: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
}) => {
  return (
    <div className="fixed z-10 bottom-4 left-0 right-0 flex justify-center gap-8 pb-4">
      <a
        className=" bg-red-400 rounded-full hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-[75px]"
        href="/"
      >
        <Image
          src={endCall.src}
          height={55}
          width={55}
          style={{ margin: "10px" }}
          alt="icon"
        />
      </a>
      <div
        className={`relative rounded-full aspect-square w-[75px] ${
          !audio ? "bg-red-400" : "bg-blue-400"
        }`}
        onClick={toggleAudio}
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
        className={`relative rounded-full aspect-square w-[75px] ${
          !video ? "bg-red-400" : "bg-blue-400"
        }`}
        onClick={toggleVideo}
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
  );
};

export default ControlBar;
