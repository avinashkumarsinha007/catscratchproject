import React, { useState, useContext, useEffect } from "react";
import Sprite from "./Sprite";
import AddSprite from "./AddSprite";
import ViewPanel from "./ViewPanel";
import RenderSprite from "./RenderSprite";
import { Context } from "./Context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PreviewArea = ({ actions, setActions }) => {
  const { sprites, setSprites, selectedSpriteId, setSelectedSpriteId } =
    useContext(Context);
  const [isPlaying, setIsPlaying] = useState(false);

  const executeAction = (spriteId, action) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        if (sprite.id !== spriteId) return sprite;
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

  useEffect(() => {
    if (sprites?.length === 0) {
      setActions({});
    }
  }, [sprites, setActions]);

  const playAnimations = async () => {
    setIsPlaying(true);
    const spritePromises = Object.entries(actions).map(
      async ([spriteId, spriteActions]) => {
        let currentActions = [];
        for (let action of spriteActions) {
          if (action.motionType === "REPEAT") {
            for (let i = 0; i < action.value; i++) {
              for (let subAction of currentActions) {
                executeAction(spriteId, subAction);
                await delay(100);
              }
            }
          } else {
            executeAction(spriteId, action);
            currentActions.push(action);
            await delay(100);
          }
        }
      }
    );
    await Promise.all(spritePromises);
    setIsPlaying(false);
  };

  const addSprite = (newSprite) => {
    setSprites((prevSprites) => [...prevSprites, newSprite]);
    if (newSprite !== undefined) {
      setSelectedSpriteId(newSprite.id);
    }
  };

  const updateSprite = (spriteId, field, value) => {
    setSprites((prevSprites) => {
      const updatedSprites = prevSprites.map((sprite) =>
        sprite.id === spriteId
          ? {
              ...sprite,
              [field]:
                field === "xPos" || field === "yPos" || field === "rotation"
                  ? value === ""
                    ? value
                    : parseFloat(value)
                  : value,
            }
          : sprite
      );
      setSelectedSpriteId(spriteId);
      return updatedSprites;
    });
  };

  const selectSprite = (spriteId) => {
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
        <ViewPanel
          sprite={sprites.find((sprite) => sprite.id === selectedSpriteId)}
          onUpdateSprite={updateSprite}
        />
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
          selectedSpriteId={selectedSpriteId}
        />
      </div>
    </div>
  );
};

export default PreviewArea;
