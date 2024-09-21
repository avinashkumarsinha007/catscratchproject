import React from 'react';
import { useDrop } from 'react-dnd';

const MidArea = ({ actions, setActions }) => {
  const [, drop] = useDrop(() => ({
    accept: 'MOTION',
    drop: (item) => addMotion(item),
  }));

  const addMotion = (motion) => {
    setActions((prevActions) => [...prevActions, motion]);
  };

  const clearMidArea = () => {
    setActions([]);
  }

  const deleteAction = (actionIndex) => {
    let newArray = actions.slice(0, actionIndex).concat(actions.slice(actionIndex + 1));
    setActions(newArray);
  };

  return (
    <div ref={drop} className="w-1/2 h-full bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Action Sequence</h2>
      {actions.map((action, index) => (
        <div key={index} className=" relative p-2 mx-auto mb-2 w-1/2 border mb-2 flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {action.motionType} - 
          {typeof action.value === 'object' ? (
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
       <button onClick={clearMidArea} className="absolute bottom-5 left-5 bg-red-500 text-white px-4 py-2 rounded">
       Clear Mid Area
      </button>
    </div>
  );
};

export default MidArea;
