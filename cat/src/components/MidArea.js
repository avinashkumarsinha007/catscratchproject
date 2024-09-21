import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { Context } from "./Context";

const MidArea = ({ actions, setActions }) => {
  const { sprites, selectedSpriteId, setSelectedSpriteId } =
    useContext(Context);

  const [, drop] = useDrop({
    accept: "MOTION",
    drop: (item) => {
      addMotion(item);
    },
  });

  const addMotion = (motion) => {
    setActions((prevActions) => {
      const currentActions = prevActions[selectedSpriteId] || [];
      const newActions = [...currentActions, motion];
      return { ...prevActions, [selectedSpriteId]: newActions };
    });
  };

  const clearMidArea = () => {
    setActions((prevActions) => ({
      ...prevActions,
      [selectedSpriteId]: [],
    }));
  };

  const deleteAction = (actionIndex) => {
    setActions((prevActions) => {
      const currentActions = prevActions[selectedSpriteId] || [];
      const updatedActions = currentActions
        .slice(0, actionIndex)
        .concat(currentActions.slice(actionIndex + 1));
      return { ...prevActions, [selectedSpriteId]: updatedActions };
    });
  };

  const actionsOfIndividual = actions[selectedSpriteId] || [];

  return (
    <div className="w-1/2 h-full bg-gray-100 p-4" ref={drop}>
      <h2 className="text-xl font-bold mb-4">
        Action Sequence for Sprite {selectedSpriteId}
      </h2>
      <div className="flex mb-4">
        {sprites.map((sprite) => (
          <button
            key={sprite.id}
            className={`px-4 py-2 ${
              selectedSpriteId === sprite.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedSpriteId(sprite.id)}
          >
            {sprite.spriteName}
          </button>
        ))}
      </div>
      {actionsOfIndividual.map((action, index) => (
        <div
          key={index}
          className="relative p-2 mx-auto mb-2 w-1/2 border mb-2 flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          {action.motionType} -
          {typeof action.value === "object" ? (
            <>
              x: {action.value.x}, y: {action.value.y}
            </>
          ) : (
            ` ${action.value}`
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteAction(index);
            }}
            className="absolute bottom-5 right-0 text-white rounded-full w-2"
          >
            ❌
          </button>
        </div>
      ))}
      <button
        onClick={clearMidArea}
        className="absolute bottom-5 left-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear Mid Area
      </button>
    </div>
  );
};

export default MidArea;
