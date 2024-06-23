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
      className="mt-8 md:ml-6 rounded-lg overflow-hidden flex w-max z-30"
      onClick={onClick}
    >
      <div className={`md:h-[80vh] w-[95vw] aspect-[4/3] md:left-8 bg-black`}>
        {children}
      </div>
    </div>
  );
};

export default FocusVideo;
