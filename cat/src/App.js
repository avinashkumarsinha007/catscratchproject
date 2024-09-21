import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';

const App = () => {
  const [actions, setActions] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar />
        <MidArea actions={actions} setActions={setActions} />
        <PreviewArea actions={actions} />
      </div>
    </DndProvider>
  );
};

export default App;
