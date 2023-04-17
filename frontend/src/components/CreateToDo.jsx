import React from "react";

function CreateTodo() {
  return (
    <>
      <form className="flex mt-2">
        <input
          className="grow border-2 border-slate-400 rounded-lg focus:outline-slate-700 px-2 py-1 text-lg"
          type="text"
        />
        <input
          className="ml-4 px-2 py-1 bg-slate-400 hover:bg-slate-700 rounded-lg text-slate-50 cursor-pointer"
          type="submit"
        />
      </form>
    </>
  );
}

export default CreateTodo;
