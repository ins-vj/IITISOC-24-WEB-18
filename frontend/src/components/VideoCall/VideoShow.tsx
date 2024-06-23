import React, { ReactElement } from "react";
import { RemoteUser } from "agora-rtc-react";
import { VideoPlayerConfig } from "agora-rtc-sdk-ng";

const VideoShow = ({
  users,
  makeFullscreen,
}: {
  users: any[];
  makeFullscreen: (e: ReactElement) => void;
}) => {
  const vConfig: VideoPlayerConfig = {
    fit: "contain",
  };
  return (
    <div className="flex flex-row flex-wrap justify-center pt-8 gap-4 md:p-8">
      <div
        id="usersDiv"
        className="flex flex-wrap flex-grow justify-center gap-4 h-max"
      >
        {users.map((user, index) => (
          <div
            key={index}
            className={`md:h-72 md:w-72 w-[45vw] aspect-square bg-black`}
          >
            <RemoteUser
              user={user}
              onClick={(e) => {
                makeFullscreen(<div>e.currentTarget</div>);
              }}
              videoPlayerConfig={vConfig}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoShow;
