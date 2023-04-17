import React from "react";

function TodoCard({ todo, isDone }) {
  return (
    <div className="flex my-4">
      {isDone ? (
        <>
          <div className="relative">
            <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-700 w-8 h-8 rounded-xl"></div>
          </div>
          <div className="text-2xl ml-4 line-through">{todo}</div>
        </>
      ) : (
        <>
          <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
          <div className="text-2xl ml-4">{todo}</div>
        </>
      )}
      <button className="ml-10 text-gray-400 text-xl hover:text-black hover:scale-110">
        X
      </button>
    </div>
  );
}

export default TodoCard;
