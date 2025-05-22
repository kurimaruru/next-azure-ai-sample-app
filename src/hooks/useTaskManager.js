import { useState, useEffect } from 'react';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  const [filter, setFilter] = useState('all'); // filterの追加

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title, description = '', dueDate = '') => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };
  const updateTask = (id, updates) => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const markAll = completed => {
    setTasks(tasks.map(task => ({ ...task, completed })));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTaskByAI = (tasksCreatedByAi) => {
    const newTask = tasksCreatedByAi.map((task) => {
      return {
        id: self.crypto.randomUUID(),
        title: task?.title || '',
        description: task?.description || '',
        dueDate: task?.dueDate || '',
        completed: false,
      }
    });

    setTasks([...tasks, ...newTask]);
  };

  return {
    addTask,
    tasks,
    deleteTask,
    toggleComplete,
    updateTask,
    filteredTasks,
    filter,
    setFilter,
    markAll,
    clearCompleted,
    addTaskByAI
  };
};
