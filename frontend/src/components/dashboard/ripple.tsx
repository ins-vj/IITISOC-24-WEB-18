import React, { CSSProperties } from "react";


const MAIN_CIRCLE_SIZE = 90;
const MAIN_CIRCLE_OPACITY = 0.7;
const NUM_CIRCLES = 20;

const Ripple = React.memo(() => {
  return (
    <div className="absolute  h-full w-full overflow-hidden bg-[rgb(10,10,10)]">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full  bg-[rgba(54,54,54,0.2)]`}
          style={
            {
              
              width: MAIN_CIRCLE_SIZE + i * 150,
              height: MAIN_CIRCLE_SIZE + i * 100,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.025,
              animationDelay: `${i * 0.06}s`,
            } as CSSProperties
          }
        ></div>
      ))}
    </div>
  );
});

export default Ripple;
