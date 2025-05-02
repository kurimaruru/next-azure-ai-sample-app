import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !description.trim() || !dueDate) {
      return;
    }
    onAddTask(newTaskTitle, description, dueDate);
    setNewTaskTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 w-full"
    >
      <div className="mb-2 flex">
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="タスクのタイトルを入力..."
          className="flex-grow rounded-l border border-gray-300 p-2 focus:outline-none"
          required
        />
        <div className="rounded-l border border-gray-300 p-2 focus:outline-none">
          期限
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="border border-gray-300 p-2 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          追加
        </button>
      </div>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="タスクの詳細を入力..."
        className="w-full rounded border border-gray-300 p-2 focus:outline-none"
        rows="2"
        required
      />
    </form>
  );
};

export default TaskForm;
