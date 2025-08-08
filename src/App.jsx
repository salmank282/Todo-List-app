import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // const savetoLs=() => {
  //   localStorage.setItem("todos",JSON.stringify(todos));
  // }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if ( todo.length >= 3)
        {
          handleAdd();
        }
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { id: uuidv4(), todo, isCompleted: false }])
    );
    console.log(todos);
  };

  const handleEdit = (id) => {
    let newTodo = todos.filter((item) => {
      return item.id === id;
    });
    console.log(newTodo[0]);
    setTodo(newTodo[0].todo);
    handleDelete(id);
    // savetoLs();
    localStorage.setItem("todos", JSON.stringify(todos));

    // let newTodo=todos.find(item=>item.id===id);
    // setTodo(newTodo.todo);
    // handleDelete(id);
    // savetoLs();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="md:container md:mx-auto mx-3 border border-gray-300 bg-violet-100 rounded-xl  py-5 px-2 my-5 min-h-[80vh] md:w-[40%]">
        <h1 className="font-bold text-center text-2xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="add-todo my-5 flex  flex-col gap-3">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex w-full">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyPress} 
              className=" w-full py-1 px-5 rounded-full"
              type="text"
              value={todo}
            />
            <button
              onClick={handleAdd}
              className="bg-violet-700 hover:bg-violet-900 text-sm font-bold text-white p-3 mx-2  py-1 rounded-full  disabled:bg-violet-400 disabled:cursor-not-allowed"
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex gap-5">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
          />
          <p>Show Finished</p>
        </div>
        <div className="h-[0.75px] bg-gray-600 w-[90%] mx-auto my-2 opacity-40"></div>
        <h1 className="text-xl font-bold my-4">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 ">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo my-2  w-full justify-between flex"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-700 hover:bg-violet-900 text-sm font-bold text-white p-3  py-1 rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-900 text-sm font-bold text-white p-3  py-1 rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div>
          <button className="bg-violet-800 px-[10px] text-white rounded py-[2px]">Clear All</button>
        </div>
      </div>
    </>
  );
}

export default App;
