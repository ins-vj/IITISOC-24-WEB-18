import {
  motion,
  useDragControls,
  useMotionValue,
  PanInfo,
} from "framer-motion";
import React, { useState, useCallback } from "react";

import "./styles.css";

const Resizable: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const mHeight = useMotionValue(200);

  const handleDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      let newHeight = mHeight.get() + info.delta.y;
      if (newHeight > 200 && newHeight < 400) {
        mHeight.set(mHeight.get() + info.delta.y);
      }
    },
    [mHeight]
  );

  return (
    <div>
      <motion.div
        style={{
          backgroundColor: "steelblue",
          height: mHeight,
          width: 200,
          cursor: isDragging ? "row-resize" : "",
        }}
        onDoubleClick={() => {
          console.log("Dbl click");
          mHeight.set(900);
        }}
      ></motion.div>
      <div style={{ width: 200, display: "flex", justifyContent: "center" }}>
        <motion.div
          style={{
            backgroundColor: "powderblue",
            height: 20,
            width: 100,
            cursor: "row-resize",
            textAlign: "center",
          }}
          drag="y"
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={() => {
            setIsDragging(false);
          }}
          onDragStart={() => {
            setIsDragging(true);
          }}
        >
          Handle
        </motion.div>
      </div>
    </div>
  );
};

export default Resizable;
