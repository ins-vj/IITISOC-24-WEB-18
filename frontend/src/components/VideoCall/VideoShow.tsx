import React, { ReactElement } from "react";
import { RemoteUser } from "agora-rtc-react";
import { VideoPlayerConfig } from "agora-rtc-react";
import "./VideoCall.css";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PersonIcon from "@mui/icons-material/Person";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";

const VideoShow = ({
  users,
  makeFullscreen,
}: {
  users: IAgoraRTCRemoteUser[];
  makeFullscreen: (e: ReactElement) => void;
}) => {
  const vConfig: VideoPlayerConfig = {
    fit: "contain",
  };

  const onClick = (index: number) => {
    makeFullscreen(
      <RemoteUser user={users[index]} videoPlayerConfig={vConfig} />
    );
  };

  return (
    <div className="max-w-screen justify-center pt-8 gap-4 md:p-8">
      <div
        id="usersDiv"
        className="flex flex-wrap flex-1 justify-center gap-4 max-h-[80vh] overflow-y-auto unscroll unscroll1"
      >
        {users.map((user, index) => (
          <div
            key={index}
            className={`relative md:w-72 w-[45vw] md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden bg-black border-2 border-solid border-[#1E2640]`}
          >
            <div
              id={`remoteuser-${index}`}
              className="absolute top-2 right-2 z-10"
              onClick={() => {
                onClick(index);
              }}
            >
              <FullscreenIcon sx={{ color: "white" }} />
            </div>
            {!user.hasVideo && (
              <div className="absolute w-full h-full flex justify-center items-center left-auto right-auto top-auto bottom-auto z-50">
                <PersonIcon sx={{ color: "white", fontSize: 150 }} />
              </div>
            )}

            <RemoteUser user={user} videoPlayerConfig={vConfig} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoShow;
