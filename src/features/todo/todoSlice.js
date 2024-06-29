import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const instance = axios.create({
  baseURL: "http://localhost:5000"
});

export const getAsyncTodo = createAsyncThunk("todo/getAsyncTodo", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/todo");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const AddAsyncTodo = createAsyncThunk("todo/AddAsyncTodo", async (payload, { rejectWithValue }) => {
  try {
    const response = await instance.post("/todo", { text: payload.text, id: Date.now(), complete: false });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteAsyncTodo = createAsyncThunk("todo/deleteAsyncTodo", async (payload, { rejectWithValue }) => {
  try {
    const response = await instance.delete(`/todo/${payload.id}`);
    return {id:payload.id};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const toggleAsyncTodo = createAsyncThunk(
  "todo/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/todo/${payload.id}`, {
        complete: payload.complete,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todo: [],
    error: "",
  },
  reducers: {
    AddTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        complete: false,
      };
      state.todo.push(newTodo);
    },
    ToggleTodo: (state, action) => {
      const selectedTodo = state.todo.find((t) => t.id === Number(action.payload.id));
      selectedTodo.complete = !selectedTodo.complete;
    },
    DeleteTodo: (state, action) => {
      state.todo = state.todo.filter((t) => t.id !== Number(action.payload.id));
    },
  },
  extraReducers: {
    [getAsyncTodo.pending]: (state, action) => {
      state.loading = true;
      state.todo = [];
      state.error = "";
    },
    [getAsyncTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo = action.payload;
      state.error = "";
    },
    [getAsyncTodo.rejected]: (state, action) => {
      state.loading = true;
      state.todo = [];
      state.error = action.payload;
    },
    [AddAsyncTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [AddAsyncTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo.push(action.payload);

    },
    [deleteAsyncTodo.fulfilled]: (state, action) => {
      state.todo = state.todo.filter(
        (todo) => todo.id !== Number(action.payload.id)
      );

    }, [toggleAsyncTodo.fulfilled]: (state, action) => {
      const selectedTodo = state.todo.find(
        (todo) => todo.id === Number(action.payload.id)
      );
      selectedTodo.complete = action.payload.complete;
    },

  }
});

export const { AddTodo, DeleteTodo, ToggleTodo } = todoSlice.actions;

export default todoSlice.reducer;