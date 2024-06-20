import logo from './logo.svg';
import './App.css';
import { TodoProvider } from './contexts';
import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos)
  const addTodo = (todo) => {
    // //modified: not done like shown in video, so if error, check here first.
    // const newTodo = {
    //   id : Date.now(),
    //   todo: todo,
    //   completed: false
    // }
    // setTodos([...todos], newTodo);
    // console.log(todos)
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])

  }

  const updateTodo = (id, todo) => {
    // //modified: not done like shown in video, so if error, check here first.
    // const existingTodo = todos.filter((eachTodo)=> eachTodo.id===id)

    // if(existingTodo){
    //   existingTodo.todo = todo
    //   setTodos([...todos], existingTodo)
    // }
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    //modified: not done like shown in video, so if error, check here first.
    setTodos(todos.filter((eachTodo) => (eachTodo.id !== id)))
  }

  const toggleComplete = (id) => {
    //modified: not done like shown in video, so if error, check here first.
    // const existingTodo = todos.filter((eachTodo)=> eachTodo.id===id)

    // if(existingTodo){
    //   existingTodo.completed = !existingTodo.completed
    //   setTodos([...todos], existingTodo)
    // }

    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }  
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos ? todos?.map((todoItem) => (
                <div key={todoItem.id} className='w-full'>
                  <TodoItem todo={todoItem} />
                </div>
              ))
                : <div className='w-full'>
                  <h5>No tasks created yet.</h5>
                </div>
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
