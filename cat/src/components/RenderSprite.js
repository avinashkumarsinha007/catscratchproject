import React from "react";
import CatSprite from "./CatSprite";
import Icon from "./Icon";

const RenderSprite = ({ sprites, onDeleteSprite, onSelectSprite, selectedSpriteId }) => {
   
  return (
    <div className="flex flex-wrap mt-5">
      {sprites.map((sprite) => (
        <div
            key={sprite.id}
            tabIndex={0}
          className={`relative w-10 flex items-center space-x-2 mr-2 cursor-pointer 
            ${sprite.id === selectedSpriteId ? "border-4 border-blue-500 bg-blue-100" : ""}`}
              onClick={(e) => {
                  onSelectSprite(sprite.id)
                  e.currentTarget.focus();
              }
          }
        >
          {sprite.spriteName === "cat" ? (
            <CatSprite size={40} />
          ) : (
            <Icon
              name={sprite.spriteName}
              size={40}
              className="text-green-600 mx-2"
            />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSprite(sprite.id);
            }}
            className="absolute bottom-5 left-5 text-white rounded-full w-2"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default RenderSprite;
