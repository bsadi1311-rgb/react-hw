import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  n: string;
}

export interface TodoState {
  data: IUser[];
}

const initialState: TodoState = {
  data: [
    { id: 1, n: "sadi" },
    { id: 2, n: "wedfrgi" },
  ],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.data.push(payload);
    },

    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    },
    editUser: (state, { payload }) => {
      const { id, newName } = payload;

      state.data = state.data.map((user) =>
        user.id === id ? { ...user, n: newName } : user
      );
    },
  },
});

export const { addUser, deleteUser, editUser} = TodoSlice.actions;

export default TodoSlice.reducer;