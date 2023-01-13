function App() {
  return (
    <div className="mt-40 flex justify-center ">
      <form className="w-[32rem] flex flex-col items-center">
        <div className="flex justify-center">
          <label className="font-semibold text-lg text-white mx-4">email</label>
          <input
            type="text"
            className="w-72 rounded-md mx-4 px-2 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-8 px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
