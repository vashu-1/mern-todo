'use client';

import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const TodoCard = ({ title, body, updatetodo, id, delid }) => {
  return (
    <div className="group w-full sm:w-5/6 mb-8 relative rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 p-3 sm:p-6 hover:from-white/15 hover:via-white/10 hover:to-white/5 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1">
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-violet-500/10 rounded-bl-3xl rounded-tr-2xl opacity-50"></div>

      {/* Title */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-400"></div>
          <div className="w-1 h-1 rounded-full bg-purple-300/60"></div>
        </div>
        <h3 className="text-base sm:text-xl font-bold text-white leading-tight group-hover:text-purple-100 transition-colors duration-200">
          {title || 'Untitled Task'}
        </h3>
      </div>

      {/* Description */}
      <div className="relative mb-6 min-h-[3rem]">
        {body ? (
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed bg-black/10 rounded-lg p-2 sm:p-3 border border-white/10 group-hover:bg-black/20 group-hover:text-gray-200 transition-all duration-200">
            {body}
          </p>
        ) : (
          <p className="text-gray-500 text-xs sm:text-sm italic">
            No description provided
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="relative flex gap-2 sm:gap-3 justify-center flex-wrap">
        <button
          onClick={updatetodo}
          className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm font-medium hover:from-blue-600/30 hover:to-indigo-600/30 hover:border-blue-400/60 hover:text-blue-200 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
        >
          <IconEdit
            size={16}
            className="group-hover/btn:rotate-12 transition-transform duration-200"
          />
          Update
        </button>
        <button
          onClick={() => delid(id)}
          className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/40 rounded-xl text-red-300 text-sm font-medium hover:from-red-600/30 hover:to-pink-600/30 hover:border-red-400/60 hover:text-red-200 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 transform hover:scale-105"
        >
          <IconTrash
            size={16}
            className="group-hover/btn:rotate-12 transition-transform duration-200"
          />
          Delete
        </button>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
    </div>
  );
};

export default TodoCard;
