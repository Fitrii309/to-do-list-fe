'use client';
import { useState } from 'react';

type Todo = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Tambah task baru
  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  // Hapus task
  const deleteTask = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditText('');
    }
  };

  // Mulai edit task
  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  // Simpan hasil edit
  const saveEdit = (index: number) => {
    if (editText.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[index].text = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText('');
  };

  // Toggle checkbox (selesai/belum)
  const toggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">To-Do List</h1>

        {/* Form Tambah Tugas */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="ketik bosku"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border px-4 py-2 rounded"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* List Tugas */}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-gray-200 px-4 py-2 rounded flex flex-col gap-2"
            >
              {editIndex === index ? (
                // Mode edit
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => saveEdit(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                  >
                    ❌
                  </button>
                </div>
              ) : (
                // Mode tampil
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(index)}
                    />
                    <span
                      className={
                        todo.completed ? 'line-through text-gray-500' : ''
                      }
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
