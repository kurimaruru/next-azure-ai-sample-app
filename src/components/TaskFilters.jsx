import React from 'react';

const TaskFilters = ({ filter, setFilter, markAll, clearCompleted }) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded px-3 py-1 ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          type="button"
        >
          全て
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`rounded px-3 py-1 ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          type="button"
        >
          未完了
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`rounded px-3 py-1 ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          type="button"
        >
          完了済み
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => markAll(true)}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          type="button"
        >
          全て完了
        </button>
        <button
          onClick={() => markAll(false)}
          className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          type="button"
        >
          全て未完了
        </button>
        <button
          onClick={clearCompleted}
          className="rounded bg-red-100 px-3 py-1 text-red-600 hover:bg-red-200"
          type="button"
        >
          完了を削除
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
