import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, role: "dev" },
    { id: 2, role: "designer" },
    { id: 3, role: "dev" },
    { id: 4, role: "designer" },
    { id: 5, role: "dev" },
    { id: 6, role: "designer" },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((u) => u.id !== action.payload);
    },
    editUser: (state, action) => {
      state.data = state.data.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
    },
  },
});

export const { addUser, deleteUser, editUser } = todoSlice.actions;
export default todoSlice.reducer;