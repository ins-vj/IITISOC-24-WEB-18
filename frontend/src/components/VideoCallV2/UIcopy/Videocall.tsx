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
              `
              <div class="flex w-[100%] justify-around ">
              <div class = " text-black emotion1 w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               <div class = " text-black  emotion2 w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               <div class = " text-black emotion3  w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               <div class = " text-black emotion4  w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               <div class = " text-black emotion5  w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               <div class = " text-black emotion6  w-[100px] h-[100px]"> 
              <Image src="/data/emotions/${predictedEmotion}.png" width={1000} height={1000} alt="Expresso" />
             
               </div>
               </div>
               `;
            console.log(vcContext.videocallconnector);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [vcContext.videocallconnector]);

  return (
    <>
    <div className="absolute left-[-10%] bottom-[-20%] opacity-5 ">
        <Logo width="1000" />
      </div>
      {!vcContext.startCall ?
        <div className=" absolute  top-2 left-2 z-10" >
          <Image
            src="/data/logos/logo.png"
            width={200}
            height={70}
            alt="Expresso"
          ></Image>
          

        </div>
        : null}
        <div className="flex justify-center flex-col items-center z-10  ">
          <div className="flex gap-4 flex-wrap w-[100%] h-[100%]  ">
            <div className="w-[100%] h-[100%]">
              <div className="w-[100%] h-[100%]">
                {Array.from(vcContext.localVideos.entries()).map(
                ([key, localUser]) => {
                  return (
                    <div key={key} className=" w-[100%] relative">
                      <video
                        ref={(videoElement) => {
                          if (videoElement) {
                            videoElement.srcObject = localUser;
                          }
                          console.log(vcContext.remoteVideos);
                        }}
                        id={`user-${key}`}
                        autoPlay
                        className="w-[100%] h-[100%]"
                      ></video>
                      <span id="self-emotion-span" className=" w-[100%]   absolute bottom-0 left-0 ">
                      </span>
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


        <div className=" z-10 flex gap-10 items-center flex-col sm:flex-row ">
          <div className=" z-10">
            {vcContext.video ? <div className=" flex justify-center items-center h-[325px] w-[400px] bg-[#0000003b] rounded-3xl overflow-hidden"><Webcam  mirrored height={400} width={400} className=" rounded-lg" /></div> : <div className=" flex justify-center items-center h-[325px]  w-[400px] bg-[rgba(24,24,27)] rounded-3xl overflow-hidden"><div className=" -translate-x-[30%] translate-y-[20%]  "><Logo width={400} /></div></div>}
          </div>


          <div className="  transition-all duration-300    flex gap-5 flex-col z-40 ">
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
            

          

            {game ?<div className=" w-[100%] gap-5 flex flex-col transition-all duration-300"> <Button variant="light" color="danger"
              className="p-4 bg-[rgba(24,24,27)] w-[100%] light text-white rounded-3xl"
              onClick={(e) => {
                setGame(false);
              }}
            >
              Exit Game 
            </Button> <Game /> </div> : 
            <div className=" flex flex-col gap-5">
            <div className="text-[1rem] opacity-50">Getting Bored ?</div>
            <Button variant="light" color="danger"
              className="p-4 bg-[rgba(24,24,27)] light text-white rounded-3xl"
              onClick={(e) => {
                setGame(true);
              }}
            >
              Play Memory Game 
            </Button>
            </div>
            }
            
         
            

          </div>
        </div>

        : null}

        

      <div className="   flex items-center flex-col z-40 ">
        <Controlbar />
      </div>

      
      {vcContext.startCall ?
        <div className=" z-10 absolute left-5 bottom-5  flex justify-center items-center">
          <Button isIconOnly className="rounded-[50%] w-[4rem] h-[4rem] bg-[rgba(50,50,50,0.3)] flex justify-center items-center">
            <ChatIcon className=" text-[1.6rem] text-white" />
          </Button>
        </div>
        : null}

    </>
  );
};

export default VideocallComponent;
