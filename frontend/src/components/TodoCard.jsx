import React from "react";

function TodoCard() {
  return (
    <div className="flex my-4">
      <>
        <div className="relative">
          <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-700 w-8 h-8 rounded-xl"></div>
        </div>
        <div className="text-2xl ml-4 line-through">title</div>
      </>

      <>
        <div className="border-4 border-cyan-700 w-8 h-8 rounded-xl"></div>
        <div className="text-2xl ml-4">title</div>
      </>

      <button className="ml-10 text-gray-400 text-xl hover:text-black hover:scale-110">
        X
      </button>
    </div>
  );
}

export default TodoCard;
