import React from "react";
import MotionCard from "./MotionCard";

const Sidebar = () => {
  const motionCategories = [
    {
      id: 1,
      type: "MOVE",
      label: "Move",
      defaultValue: 10,
      label2: "steps",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      icon: "none",
    },
    {
      id: 2,
      type: "TURN",
      label: "Turn",
      defaultValue: 15,
      label2: "degree",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      icon: "undo",
    },
    {
      id: 3,
      type: "GOTO",
      label: "GoTo",
      defaultValue: { x: 10, y: 15 },
      label2: "",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      icon: "none",
    },
    {
      id: 4,
      type: "REPEAT",
      label: "Repeat",
      defaultValue: 5,
      label2: "times",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      icon: "none",
    },
  ];

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Motion Categories</h2>
      {motionCategories.map((motion) => (
        <MotionCard key={motion.id} motion={motion} />
      ))}
    </div>
  );
};

export default Sidebar;
