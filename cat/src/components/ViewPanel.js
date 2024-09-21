import React from "react";

const ViewPanel = ({ sprite, onUpdateSprite }) => {
  const handleInputChange = (e, spriteId, field) => {
    const { value } = e.target;
    onUpdateSprite(spriteId, field, value);
  };

  return (
    <div className="bg-gray-200 p-4 border rounded">
      {sprite === undefined ? (
        <p>No sprites added</p>
      ) : (
        <div
          key={sprite.id}
          className="mb-4 p-2 bg-white shadow rounded flex flex-wrap"
        >
          <label className="ml-5">
            Sprite
            <input
              type="text"
              value={sprite.spriteName}
              onChange={(e) => handleInputChange(e, sprite.id, "spriteName")}
              className="text-black w-12 mx-7 rounded-full p-1 border "
            />
          </label>

          <label className="ml-5">
            X
            <input
              type="number"
              value={sprite.xPos}
              onChange={(e) => handleInputChange(e, sprite.id, "xPos")}
              className="text-black w-12 mx-7 rounded-full p-1 border "
            />
          </label>

          <label className="ml-5">
            Y
            <input
              type="number"
              value={sprite.yPos}
              onChange={(e) => handleInputChange(e, sprite.id, "yPos")}
              className="text-black w-12 mx-7 rounded-full p-1 border "
            />
          </label>

          <label className="ml-5">
            Direction
            <input
              type="number"
              value={sprite.rotation}
              onChange={(e) => handleInputChange(e, sprite.id, "rotation")}
              className="text-black w-12 mx-7 rounded-full p-1 border"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ViewPanel;
