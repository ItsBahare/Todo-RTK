import { useDispatch } from "react-redux";
import { deleteAsyncTodo, toggleAsyncTodo } from "../features/todo/todoSlice";

function TodoItems({ id, complete, text }) {
  const dispatch = useDispatch();
  return (
    <div
      className={`${complete ? "opacity-50" : ""} border-bottom d-flex align-items-center m-3 justify-content-between `}>
      <div className="m-2">
        <input
          className="m-2 form-check-input"
          onChange={() => dispatch(toggleAsyncTodo({ id, complete: !complete }))}
          role="button"
          type="checkbox"
          name="text"
          checked={complete}
         
        />
        
        <label htmlFor="text" className={`mt-1 ${complete ? "text-decoration-line-through" : ""}`}>
          {text}
        </label>
      </div>
      <button
        className="btn btn-outline-danger m-2"
        disabled={complete}
        onClick={() => dispatch(deleteAsyncTodo({ id }))}>
        Delete
      </button>
    </div>
  );
}

export default TodoItems;
