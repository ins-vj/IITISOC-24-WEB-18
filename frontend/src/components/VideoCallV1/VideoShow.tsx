import React, { ReactElement } from "react";
import { RemoteUser } from "agora-rtc-react";
import { VideoPlayerConfig } from "agora-rtc-react";
import "./VideoCall.css";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PersonIcon from "@mui/icons-material/Person";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";

export const VideoTile = ({
  onClickFullscreen,
  socketUsers,
  user,
  usersEmotions,
}: {
  onClickFullscreen: () => void;
  socketUsers: any;
  user: any;
  usersEmotions: any[];
}) => {
  return (
    <div className="max-w-full max-h-full w-full h-full md:aspect-[4/3] aspect-[3/4] rounded-lg overflow-hidden bg-black border-2 border-solid border-[#1E2640]">
      <div
        className="absolute top-2 right-2 z-10"
        onClick={() => {
          onClickFullscreen();
        }}
      >
        <FullscreenIcon sx={{ color: "white" }} />
      </div>
      <div className="absolute left-0 bottom-0 text-[#DC9750] z-30">
        {socketUsers?.map(
          (socketuser: any) =>
            user.uid == socketuser.client_id && socketuser.user__username
        )}
      </div>
      <div className="absolute top-0 z-10 text-white">
        {usersEmotions[user.uid] && usersEmotions[user.uid]}
      </div>
      {!user.hasVideo && (
        <div className="absolute w-full h-full flex justify-center items-center left-auto right-auto top-auto bottom-auto z-50">
          <PersonIcon sx={{ color: "white", fontSize: 150 }} />
        </div>
      )}

      <RemoteUser width={"100%"} user={user} />
    </div>
  );
};

const VideoShow = ({
  users,
  makeFullscreen,
  socketUsers,
  usersEmotions,
}: {
  users: IAgoraRTCRemoteUser[];
  makeFullscreen: (e: ReactElement) => void;
  socketUsers: any;
  usersEmotions: any[];
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
        {users.length == 2 &&
          users.map((user, index) => (
            <div key={user.uid} className={`relative md:w-[45vw] w-[90vw]`}>
              <VideoTile
                user={user}
                socketUsers={socketUsers}
                onClickFullscreen={() => {
                  onClick(index);
                }}
                usersEmotions={usersEmotions}
              />
            </div>
          ))}
        {users.length > 3 &&
          users.map((user, index) => (
            <div key={user.uid} className={`relative md:w-1/4 w-[45vw]`}>
              <VideoTile
                user={user}
                socketUsers={socketUsers}
                onClickFullscreen={() => {
                  onClick(index);
                }}
                usersEmotions={usersEmotions}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoShow;
