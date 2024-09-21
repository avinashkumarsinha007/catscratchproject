import React, { useState } from "react";
import Sprite from "./Sprite";
import AddSprite from "./AddSprite";
import ViewPanel from "./ViewPanel";
import RenderSprite from "./RenderSprite";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PreviewArea = ({ actions }) => {
  const [sprites, setSprites] = useState([
    { id: 1, xPos: 10, yPos: 50, rotation: 0, spriteName: "cat" },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSubAction, setLastSubAction] = useState([]);
  const [filteredSprite, setFilteredSprite] = useState(sprites[0]);
  const [selectedSpriteId, setSelectedSpriteId] = useState(1);

  const executeAction = (action) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        let x = sprite.xPos;
        let y = sprite.yPos;
        let rotation = sprite.rotation;

        if (action.motionType === "MOVE") {
          x += +action.value;
        } else if (action.motionType === "TURN") {
          rotation += action.value;
        } else if (action.motionType === "GOTO") {
          x = +action.value.x;
          y = +action.value.y;
        }

        return { ...sprite, xPos: x, yPos: y, rotation };
      })
    );
  };

  const playAnimations = async () => {
    setIsPlaying(true);
    let currentActions = [...lastSubAction];
    for (let action of actions) {
      if (action.motionType === "REPEAT") {
        for (let i = 0; i < action.value; i++) {
          for (let subAction of currentActions) {
            executeAction(subAction);
            await delay(100);
          }
        }
      } else {
        executeAction(action);
        currentActions.push(action);
        setLastSubAction([...currentActions]);
        await delay(100);
      }
    }
    setIsPlaying(false);
  };

  const addSprite = (newSprite) => {
    setSprites((prevSprites) => [...prevSprites, newSprite]);
  };

  const updateSprite = (spriteId, field, value) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) =>
        sprite.id === spriteId
          ? {
              ...sprite,
              [field]:
                field === "xPos" || field === "yPos" || field === "rotation"
                  ? parseFloat(value)
                  : value,
            }
          : sprite
      )
    );
    selectSprite(spriteId);
  };

  const selectSprite = (spriteId) => {
    let selectedSprite = sprites.filter((sprite) => sprite.id === spriteId);
    setFilteredSprite(selectedSprite[0]);
    setSelectedSpriteId(spriteId);
  };

  const deleteSprite = (spriteId) => {
    setSprites((prevSprites) =>
      prevSprites.filter((sprite) => sprite.id !== spriteId)
    );
  };

  return (
    <div className="w-1/4">
      <div className="h-2/4 bg-blue-100 p-4 relative">
        <h2 className="text-xl font-bold mb-4">Preview Area</h2>
        {sprites.map((sprite) => (
          <Sprite
            key={sprite.id}
            xPos={sprite.xPos}
            yPos={sprite.yPos}
            rotation={sprite.rotation}
            spriteName={sprite.spriteName}
          />
        ))}
      </div>
      <div className="h-2/4">
        <ViewPanel sprite={filteredSprite} onUpdateSprite={updateSprite} />
        <div className="flex justify-around pt-2">
          <AddSprite onAddSprite={addSprite} />
          <button
            onClick={playAnimations}
            className={`bg-blue-500 h-2/4 text-white px-4 py-2 rounded ${
              isPlaying ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPlaying}
          >
            {isPlaying ? "Playing..." : "Play"}
          </button>
        </div>
        <RenderSprite
          sprites={sprites}
          onDeleteSprite={deleteSprite}
          onSelectSprite={selectSprite}
          selectedSpriteId= {selectedSpriteId}
        />
      </div>
    </div>
  );
};

export default PreviewArea;
