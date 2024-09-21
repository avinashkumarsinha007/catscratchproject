import React, { useState } from "react";

const AddSprite = ({ onAddSprite }) => {
  const [selectedSprite, setSelectedSprite] = useState("cat");

  const availableSprites = ["cat", "dog", "flag", "undo"];

  const handleAddSprite = () => {
    const newSprite = {
      id: Math.random() + "sprite",
      xPos: parseInt(10 + 10 * Math.random()),
      yPos: parseInt(50 + 50 * Math.random()),
      rotation: 0,
      spriteName: selectedSprite,
    };
    onAddSprite(newSprite);
  };

  return (
    <div>
      <label htmlFor="sprite-select">Choose a sprite:</label>
      <select
        className="cursor-pointer"
        id="sprite-select"
        value={selectedSprite}
        onChange={(e) => setSelectedSprite(e.target.value)}
      >
        {availableSprites.map((sprite) => (
          <option key={sprite} value={sprite}>
            {sprite}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddSprite}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default AddSprite;
