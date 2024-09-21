import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [sprites, setSprites] = useState([
    { id: "1sprite", xPos: 10, yPos: 50, rotation: 0, spriteName: "cat" },
  ]);

  const [selectedSpriteId, setSelectedSpriteId] = useState("1sprite");

  return (
    <Context.Provider
      value={{ sprites, setSprites, selectedSpriteId, setSelectedSpriteId }}
    >
      {children}
    </Context.Provider>
  );
};
