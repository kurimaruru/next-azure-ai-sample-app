'use client';

import React from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import TaskForm from '../components/TaskForm';

const App = () => {
  const { addTask } = useTaskManager();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-lg bg-white p-4 shadow">
      <h1 className="mb-4 text-2xl font-bold">タスク管理アプリ</h1>
      <TaskForm onAddTask={addTask} />
    </div>
  );
};

export default App;
