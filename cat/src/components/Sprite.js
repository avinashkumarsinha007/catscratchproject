import React from 'react';
import CatSprite from "./CatSprite";
import Icon from './Icon';

const Sprite = ({ xPos, yPos, rotation, spriteName , size=50}) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${xPos}px`,
        top: `${yPos}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'left 0.3s, top 0.3s, transform 0.3s',
      }}
    >
      {
        spriteName === "cat"? 
          <CatSprite size={size} />:<Icon name={spriteName} size={size} className="text-green-600 mx-2" />
      }
    </div>
  );
};

export default Sprite;
