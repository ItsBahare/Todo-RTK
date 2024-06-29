import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { useEffect } from "react";
import { getAsyncTodo } from "../features/todo/todoSlice";
import Loading from "./loader/Loading";

function TodoList() {
  const { todo, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncTodo());
  }, []);
  return (
    <div>
      <h1>Todo</h1>
      {loading ? (
        <p><Loading/></p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>

          {todo.map((todo) => {
            return <TodoItems key={todo.id} {...todo} />;
          })}
        </div>
      )}
    </div>
  );
}

export default TodoList;
