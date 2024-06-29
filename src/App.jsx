import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css";


function App() {

  return (
    <>
      <div className="position-relative mt-5">
        <p className="position-absolute top-0  start-50 translate-middle-x fs-1 fw-semibold  title-todo">
          ToDo List
        </p>
        <div className="container pt-3 bg-light todo-list pb-2">
          <AddTodo />
          <TodoList />
        
        </div>
      </div>
    </>
  );
}

export default App;
