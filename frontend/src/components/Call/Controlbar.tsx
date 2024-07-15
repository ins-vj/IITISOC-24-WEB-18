import React from "react";

const Controlbar = () => {
  return (
    <div>
      <button className="p-4 bg-gray-600">Mic</button>
      <button className="p-4 bg-gray-600">Camera</button>
      <button className="p-4 bg-gray-600">Screen share</button>
      <button className="p-4 bg-gray-600">End call</button>
      {/* <button>Show users</button> */}
    </div>
  );
};

export default Controlbar;
