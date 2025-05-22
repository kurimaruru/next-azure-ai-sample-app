'use client';

import React from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters'; // 追加
import AITaskHelper from "../components/TaskHelper"; // 追加

const App = () => {
  const {
    addTask,
    tasks,
    updateTask,
    deleteTask,
    toggleComplete,
    // filteredTasks,filter,setFilter,markAll,clearCompletedの追加
    filteredTasks,
    filter,
    setFilter,
    markAll,
    clearCompleted,
    addTaskByAI
  } = useTaskManager();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-lg bg-white p-4 shadow">
      <h1 className="mb-4 text-2xl font-bold">タスク管理アプリ</h1>
      <TaskForm onAddTask={addTask} />
      {/* ---------TaskFiltersの追加ここから----------- */}
      <TaskFilters
        filter={filter}
        setFilter={setFilter}
        markAll={markAll}
        clearCompleted={clearCompleted}
      />
      <div className="mt-4 w-full text-sm text-gray-500">
        全タスク: {tasks.length} | 完了済み:{' '}
        {tasks.filter(t => t.completed).length} | 未完了:{' '}
        {tasks.filter(t => !t.completed).length}
      </div>
      {/* ---------TaskFiltersの追加ここまで----------- */}
      <TaskList
        tasks={filteredTasks} // ここをフィルター結果を表示できるように更新！！！
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
      <AITaskHelper filteredTasks={filteredTasks} addTaskByAI={addTaskByAI} />
    </div>
  );
};

export default App;
