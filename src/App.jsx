import { useState } from "react"
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    let ask = confirm("Are you sure you want to delete it? This action is irreversible.")
    if (ask) {
      setTodos(newTodos)
    }
  }

  const handleEdit = (id) => {
    let getTodo = todos.filter((item) => {
      return item.id === id
    })
    setTodo(getTodo[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-1/2" name="" id="" />
          <button className="bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-6 text-sm font-bold" onClick={handleAdd}>Save</button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display!</div>}
          {todos.map((item) => {
            return <div key={item.id} className="todo flex w-1/2 md:1/4 my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button className="bg-violet-800 hover:bg-violet-950 md:py-1 md:p-3 px-3 text-white rounded-md mx-2 text-sm font-bold" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="bg-violet-800 hover:bg-violet-950 md:py-1 md:p-3 px-3 text-white rounded-md mx-2 text-sm font-bold" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          })}
        </div>
        <div>
        </div>
      </div>
    </>
  )
}

export default App
