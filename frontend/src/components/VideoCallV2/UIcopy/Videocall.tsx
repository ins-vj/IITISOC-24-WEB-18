"use client";
import React, { useContext, useEffect } from "react";
import Controlbar from "./Controlbar";
import { VideoCallContext } from "../lib/VideocallHandler";
import { predictEmotion, loadModels } from "../lib/emotionDetection";
import Logo from "../../../components/logo/logo";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@nextui-org/react";
import ChatIcon from '@mui/icons-material/Chat';
import Game from "@/components/game/game"
const VideocallComponent = () => {
  const vcContext = useContext(VideoCallContext);
  const [game, setGame] = React.useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (vcContext.videocallconnector) {
      const interval = setInterval(async () => {
        const videoElement = document.getElementById(
          "user-video"
        ) as HTMLVideoElement;

        if (videoElement) {
          const predictedEmotion = await predictEmotion(videoElement);
          if (predictedEmotion) {
            vcContext.videocallconnector.sendEmotion(predictedEmotion);
            console.log(predictedEmotion);
            document.getElementById("self-emotion-span").innerHTML =
              predictedEmotion;
            console.log(vcContext.videocallconnector);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [vcContext.videocallconnector]);

  return (
    <>
      {!vcContext.startCall ?
        <div className=" absolute  top-2 left-2" >
          <Image
            src="/data/logos/logo.png"
            width={200}
            height={70}
            alt="Expresso"
          ></Image>

        </div>
        : null}
      <div className="flex justify-center flex-col items-center   ">
        <div className="flex gap-4 flex-wrap ">
          <div>
            <div className="w-100 h-100">
              {Array.from(vcContext.localVideos.entries()).map(
                ([key, localUser]) => {
                  return (
                    <div key={key}>
                      <video
                        ref={(videoElement) => {
                          if (videoElement) {
                            videoElement.srcObject = localUser;
                          }
                          console.log(vcContext.remoteVideos);
                        }}
                        id={`user-${key}`}
                        autoPlay
                      ></video>
                      <span>Self Media Emotion: </span>
                      <span id="self-emotion-span"></span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div id="remote-videos">
            <div className="w-100 h-100">
              {Array.from(vcContext.remoteVideos.entries()).map(
                ([key, remoteUser]) => {
                  return (
                    <div key={key}>
                      <video
                        ref={(videoElement) => {
                          if (videoElement) {
                            videoElement.srcObject = remoteUser.stream;
                          }
                          console.log(vcContext.remoteVideos);
                        }}
                        autoPlay
                      ></video>
                      <span>{remoteUser.userData.username}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

      </div>



      {!vcContext.startCall ?


        <div className=" z-10 flex gap-10 items-center ">
          <div className=" z-10">
            {vcContext.video ? <div className=" flex justify-center items-center h-[325px] w-[100%] bg-[#0000003b] rounded-3xl overflow-hidden"><Webcam mirrored height={470} width={470} className=" rounded-lg" /></div> : <div className=" flex justify-center items-center h-[325px] w-[100%] bg-[rgba(24,24,27)] rounded-3xl overflow-hidden"><div className=" -translate-x-[30%] translate-y-[20%]  "><Logo width={400} /></div></div>}
          </div>


          <div className="     flex gap-5 flex-col z-40 ">
            <div className=" text-[2rem]"> Dive into Expresso World </div>
            <div>
            <Button variant="ghost"
              className="p-4 bg-[rgba(24,24,27)] light text-white rounded-3xl"
              onClick={(e) => {
                console.log("start");
                vcContext.setStartCall(!vcContext.startCall);
                e.currentTarget.disabled = true;
              }}
            >
              Join meeting
            </Button>
            </div>
            <div className="text-[1rem] opacity-50">Getting Bored ?</div>

          

            {game ?<div className=" w-[100%] gap-5 flex flex-col"> <Button variant="light" color="danger"
              className="p-4 bg-[rgba(24,24,27)] w-[100%] light text-white rounded-3xl"
              onClick={(e) => {
                setGame(false);
              }}
            >
              Exit Game 
            </Button> <Game /> </div> : <Button variant="light" color="danger"
              className="p-4 bg-[rgba(24,24,27)] light text-white rounded-3xl"
              onClick={(e) => {
                setGame(true);
              }}
            >
              Play Memory Game 
            </Button>}
            
         
            

          </div>
        </div>

        : null}

        

      <div className="   flex items-center flex-col z-40 ">
        <Controlbar />
      </div>

      <div className="absolute left-[-10%] bottom-[-20%] opacity-5 ">
        <Logo width="1000" />
      </div>
      {vcContext.startCall ?
        <div className=" absolute left-5 bottom-5  flex justify-center items-center">
          <Button isIconOnly className="rounded-[50%] w-[4rem] h-[4rem] bg-[rgba(50,50,50,0.3)] flex justify-center items-center">
            <ChatIcon className=" text-[1.6rem] text-white" />
          </Button>
        </div>
        : null}

    </>
  );
};

export default VideocallComponent;
