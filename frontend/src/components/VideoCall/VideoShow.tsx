import React from "react";
import { RemoteUser } from "agora-rtc-react";

const VideoShow = ({
  users,
  toggleFocus,
}: {
  users: any[];
  toggleFocus: (e: HTMLElement) => void;
}) => {
  return (
    <div id="usersDiv" className="flex flex-wrap justify-center gap-4 h-max">
      {users.map((user, index) => (
        <div
          key={index}
          className={`md:h-72 md:w-72 w-[45vw] aspect-square bg-black`}
          onClick={(e) => {
            toggleFocus(e.currentTarget);
          }}
        >
          <RemoteUser user={user} />
        </div>
      ))}
    </div>
  );
};

export default VideoShow;
