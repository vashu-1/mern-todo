'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconLogout } from '@tabler/icons-react';
import TodoCard from '../components/Todocard';
import { ToastContainer, toast } from 'react-toastify';
import Update from '../components/Update.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createlist } from '../store/listslice';
import { selectUser } from '../store/userslice';
import { selectlists } from '../store/listslice';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useLoader } from '../providers/LoaderProvider';

export default function TodoPage() {
  const [data, setData] = useState({ title: '', body: '' });
  const [todos, setTodos] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const lists = useSelector(selectlists);
  const router = useRouter();
  const { show: showLoader } = useLoader();

  const redirecttohome = () => {
    showLoader();
    router.push('/');
  };

  const userid = user?.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userid) {
      toast.error('Please login to add tasks');
      return;
    }
    try {
      if (!data.title.trim() && !data.body.trim()) {
        toast.error('Title or description should not be empty');
        return;
      }

      const res = await axios.post(
        `https://mern-todo-1-krwi.onrender.com/api/list/create/${userid}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data && res.data.success) {
        const newItem = res.data.list
          ? {
              title: res.data.list.title,
              body: res.data.list.body,
              _id: res.data.list._id,
            }
          : { title: data.title, body: data.body };
        setTodos((prev) => [...prev, newItem]);
        dispatch(
          createlist({
            title: newItem.title,
            body: newItem.body,
            listid: newItem._id,
            AvailList: true,
          })
        );
        setData({ title: '', body: '' });
        toast.success('Task added successfully');
      } else {
        toast.error(res.data?.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('An error occurred while adding the task.');
    }
  };

  const deleteList = async (index) => {
    const item = todos[index];
    const listid = item._id;
    console.log(listid);

    if (!listid) {
      toast.error('Invalid task ID');
      return;
    }
    try {
      const res = await axios.delete(
        `https://mern-todo-1-krwi.onrender.com/api/list/delete/${listid}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data && res.data.success) {
        setTodos((prev) => {
          const copy = [...prev];
          copy.splice(index, 1);
          return copy;
        });
        toast.success('Task deleted successfully');
      } else {
        toast.error(res.data?.message || 'Failed to delete task');
      }
    } catch (error) {
      console.log();
    }
  };

  const handleUpdateClick = (index) => {
    setSelectedIndex(index);
    setShowUpdate(true);
  };

  const handleUpdateSave = async (index, newTitle, newBody) => {
    const item = todos[index];
    const listid = item._id;
    if (!listid) {
      toast.error('Please login to update tasks');
      return;
    }
    try {
      const res = await axios.put(
        `https://mern-todo-1-krwi.onrender.com/api/list/update/${listid}`,
        { title: newTitle, body: newBody },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data && res.data.success) {
        setTodos((prev) => {
          const copy = [...prev];
          copy[index] = {
            ...(copy[index] || {}),
            title: newTitle,
            body: newBody,
          };
          return copy;
        });
        toast.success('Task updated');
        setShowUpdate(false);
        setSelectedIndex(null);
      } else {
        toast.error(res.data?.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('An error occurred while updating the task.');
    }
  };

  useEffect(() => {
    if (!userid) return;

    const fetchtodo = async () => {
      try {
        const res = await axios.get(
          `https://mern-todo-1-krwi.onrender.com/api/list/getlists/${userid}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        if (res.data && res.data.success) setTodos(res.data.lists || []);
        else toast.error(res.data?.message || 'Failed to fetch todos');
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };

    fetchtodo();
  }, [userid]);

  return (
    <>
      <div className="min-h-screen relative bg-linear-to-br from-gray-900 via-purple-900 to-violet-900 px-2 py-4 sm:px-4 sm:py-8">
        <ToastContainer />
        <div className="mx-auto max-w-6xl w-full">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                My Tasks
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Welcome back!
              </p>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => {
                  showLoader();
                  router.push('/login');
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600/20 border border-blue-500/50 px-4 py-2 text-blue-300 hover:bg-blue-600/30 transition duration-200"
              >
                <IconLogout size={20} />
                Login
              </button>
              <button
                onClick={redirecttohome}
                className="flex items-center gap-2 rounded-lg bg-red-600/20 border border-red-500/50 px-4 py-2 text-red-300 hover:bg-red-600/30 transition duration-200"
              >
                <IoArrowBackSharp size={20} />
                Back
              </button>
            </div>
          </div>

          {/* Create Todo Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 sm:p-6"
          >
            <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4">
              Create New Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                  placeholder="Task title..."
                  className="w-full px-2 py-2 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                />
              </div>
              <div>
                <textarea
                  placeholder="Task description (optional)..."
                  name="body"
                  onChange={handleChange}
                  value={data.body}
                  rows={3}
                  className="w-full px-2 py-2 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-violet-600 px-4 py-2 sm:px-6 sm:py-3 text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition duration-200"
              >
                <IconPlus size={20} />
                Add Task
              </button>
            </form>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {todos && todos.length > 0 ? (
              todos.map((item, index) => (
                <TodoCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  id={index}
                  delid={deleteList}
                  updatetodo={() => handleUpdateClick(index)} // pass index
                />
              ))
            ) : (
              <h1 className="text-white text-3xl mt-4">No list is created</h1>
            )}
          </div>
        </div>
      </div>

      {showUpdate && selectedIndex !== null ? (
        <div className="top-30 bg-linear-to-br from-gray-900 via-purple-900 to-violet-900 fixed left-0 h-[70vh] w-full">
          <Update
            Listdata={todos[selectedIndex]} // pass the selected todo data
            index={selectedIndex} // pass index so Update can call onupdate(index, ...)
            onupdate={handleUpdateSave}
            onclose={() => {
              setShowUpdate(false);
              setSelectedIndex(null);
            }}
          />
        </div>
      ) : null}
    </>
  );
}
