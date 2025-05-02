import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
    setIsEditing(false);
  };

  return (
    <li
      className={`mb-2 rounded border p-3 ${
        task.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <div className="flex">
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="flex-grow rounded border p-1"
              autoFocus
            />
            <input
              type="date"
              value={editDueDate}
              onChange={e => setEditDueDate(e.target.value)}
              className="ml-2 rounded border p-1"
            />
          </div>
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            className="w-full rounded border p-1"
            rows="2"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
              type="button"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="rounded bg-gray-300 px-2 py-1 hover:bg-gray-400"
              type="button"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="mr-3 h-5 w-5"
              />
              <div>
                <span
                  className={task.completed ? 'text-gray-500 line-through' : ''}
                >
                  {task.title}
                </span>
                {task.dueDate && (
                  <span className="ml-2 text-xs text-gray-500">
                    期限: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{task.dueDate}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded bg-yellow-100 px-2 py-1 text-yellow-600 hover:bg-yellow-200"
                type="button"
              >
                編集
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="rounded bg-red-100 px-2 py-1 text-red-600 hover:bg-red-200"
                type="button"
              >
                削除
              </button>
            </div>
          </div>
          {task.description && (
            <p className="ml-8 text-sm text-gray-600">{task.description}</p>
          )}
        </div>
      )}
    </li>
  );
};

export default TaskItem;
