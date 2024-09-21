import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Icon from './Icon';

const MotionCard = ({ motion }) => {
  const [inputValues, setInputValues] = useState({
    value: motion.defaultValue,
    x: motion.defaultValue?.x || '',
    y: motion.defaultValue?.y || '',
  });

 const [{ isDragging }, drag] = useDrag({
  type: 'MOTION',
  item: () => {
    const dragItem = {
      motionType: motion.type,
      value: typeof motion.defaultValue !== 'object' ? inputValues.value : { x: inputValues.x, y: inputValues.y },
    };
    return dragItem;
  },
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'x' || name === 'y') {
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setInputValues({
        ...inputValues,
        value: value,
      });
    }
  };

  return (
    <div
      ref={drag}
      className={`border p-2 mx-auto mb-2 ${motion.className} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <p>{motion.label}</p>
      <Icon name={motion.icon} size={15} className="text-white m-2" />

      {typeof motion.defaultValue !== 'object' ? (
        <input
          type="number"
          onChange={handleChange}
          className="text-black w-12 mx-7 rounded-full p-1"
          value={inputValues.value}
          name="value"
        />
      ) : (
        <>
          <div className="flex space-x-4">
            <div>
              <label>X:</label>
              <input
                type="number"
                onChange={handleChange}
                className="text-black w-12 mx-7 rounded-full p-1"
                value={inputValues.x}
                name="x"
              />
            </div>
            <div>
              <label>Y:</label>
              <input
                type="number"
                onChange={handleChange}
                className="text-black w-12 mx-7 rounded-full p-1"
                value={inputValues.y}
                name="y"
              />
            </div>
          </div>
        </>
      )}
      <p>{motion.label2}</p>
    </div>
  );
};

export default MotionCard;
