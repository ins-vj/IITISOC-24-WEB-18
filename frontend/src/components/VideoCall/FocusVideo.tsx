import React, { ReactElement } from "react";
import "./VideoCall.css";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FocusVideo = ({
  children,
  onClick,
}: {
  children: ReactElement;
  onClick: () => void;
}) => {
  return (
    <div
      id="focus-div"
      className="aspect-[4/3] md:h-[90vh] w-[95vw] mt-8 md:ml-6 z-30"
    >
      <div
        className={`relative aspect-[4/3] md:h-[90vh] w-[95vw] md:w-auto md:left-8 rounded-lg overflow-hidden bg-black border-2 border-solid border-[#1E2640]`}
      >
        <div className="absolute right-2 top-2 z-50" onClick={onClick}>
          <FullscreenExitIcon fontSize="large" sx={{ color: "white" }} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default FocusVideo;
