import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [account, setAccount] = useState();

  if (!account) {
    return <Login setAccount={setAccount} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">MY TO DO LIST 😎</h1>
      <div>
        <div className="mt-8 text-sm font-semibold">Believe in your self</div>
        <div className="text-xs">자신을 믿어라</div>
      </div>
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
      <div className="mt-16 flex flex-col w-1/2">
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
      </div>
    </div>
  );
}

export default App;
