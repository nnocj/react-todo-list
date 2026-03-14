/**One thing I'm learning with react is how to manage state */
import "./styles.css"
import { useState } from "react"


export default function App() {

  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState([])

  /*this stores the value of the input field in the newItem state variable,
  and then when the form is  submitted, it creates a new todo object.*/
  function handleSubmit(e){
    e.preventDefault()
    const newTodo = {
      id: crypto.randomUUID(),
      title: newItem,
      completed: false
    }

    setTodos(currentTodos => {
      return [...currentTodos, newTodo]
    })

    setNewItem('')
  }


  //update the completed status of a todo item when the checkbox is toggled.
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
    })
  }
 

  //delete todo item when the delete button is clicked.
  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return <><form onSubmit={handleSubmit} className="todo-form">
            <div className="form-row">
              <label htmlFor="new-todo">New Todo:</label>
              <input value={newItem}
               id="new-todo" type="text" placeholder="Add a new todo..." 
               onChange={e => setNewItem(e.target.value)}/>
            </div>
            
            <button className="btn" type="submit">Add</button>
          </form>
          <h1 className="header">Todo List</h1>
          <ul className="todo-list">
            {todos.map(todo => {
                return <li key={todo.id} className="todo">
                        <label>
                          <input type="checkbox" checked={todo.completed} 
                          onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                          {todo.title}
                        </label>
                        <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
                      </li>
            })}
             
          </ul>
          
        </>
}