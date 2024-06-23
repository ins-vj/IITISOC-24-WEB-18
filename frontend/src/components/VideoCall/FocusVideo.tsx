import React, { ReactElement } from "react";
import "./VideoCall.css";

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
      className="absolute top-8 flex justify-center w-screen z-30"
      onClick={onClick}
    >
      <div className={`inFocus bg-black`}>{children}</div>
    </div>
  );
};

export default FocusVideo;
