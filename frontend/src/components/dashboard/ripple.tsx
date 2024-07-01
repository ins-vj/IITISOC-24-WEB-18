import React, { CSSProperties } from "react";

// Modify these
const MAIN_CIRCLE_SIZE = 10;
const MAIN_CIRCLE_OPACITY = 0.45;
const NUM_CIRCLES = 200;

const Ripple = React.memo(() => {
  return (
    <div className="absolute  h-full w-full overflow-hidden bg-[rgb(220,220,225)]">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full  bg-neutral-400`}
          style={
            {
              border: "3px solid rgba(255,255,255,0.1)",
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
