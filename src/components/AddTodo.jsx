import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddAsyncTodo } from "../features/todo/todoSlice";

function AddItem() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    dispatch(AddAsyncTodo({ text: value }));
    setValue("");
  };
  return (
    <form className={`mb-2 ${loading ? "opacity-50":"opacity-100"}`} onSubmit={handleSubmit}>
      <input
        autoComplete="false"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="form-control in"
        placeholder="Add Your Todo.."
      />
      <button type="submit" className="btn-submit btn btn-outline-secondary mt-3 d-flex mx-auto " disabled={loading}>
        {loading ? "Submitting ..." : "Submit"}
      </button>
    </form>
  );
}

export default AddItem;
