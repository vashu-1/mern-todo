import React, { useEffect, useState } from 'react';

const Update = ({ Listdata, onclose, onupdate, index }) => {
  const [title, setTitle] = useState(Listdata?.title || '');
  const [body, setBody] = useState(Listdata?.body || '');

  useEffect(() => {
    setTitle(Listdata?.title || '');
    setBody(Listdata?.body || '');
  }, [Listdata]);

  const handleSave = () => {
    // simple validation - require at least one non-empty field
    if (!title.trim() && !body.trim()) return;
    onupdate(index, title, body); // call parent save
  };

  return (
    <>
      <div className="flex w-[75vw] mx-auto h-full rounded-4xl border-2 items-center flex-col gap-4 space-y-4 p-8">
        <h1 className="text-5xl font-semibold py-4 mt-6 text-white">
          Update your list
        </h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white/10 border w-3/5 py-2 px-4 border-white/20 rounded-lg text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          placeholder="update your title"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="bg-white/10 border w-3/5 py-2 px-4 border-white/20 rounded-lg text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 rows-4 transition duration-200 resize-none"
          placeholder="update your description..."
          rows={6}
        />

        <div className="w-2/8 justify-center flex gap-16">
          <button
            onClick={handleSave}
            className="ring-purple-500 flex text-lg justify-center items-center py-2 px-4 bg-gradient-to-r from-purple-600 gap-8 to-violet-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition duration-200"
          >
            Save
          </button>
          <button
            className="ring-purple-500 flex text-lg justify-center items-center py-2 px-4 bg-gradient-to-r from-purple-600 gap-8 to-violet-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition duration-200"
            onClick={onclose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Update;
