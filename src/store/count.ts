import { create } from "zustand";
import axios from "axios";

const API = "https://to-dos-api.softclub.tj/api/to-dos";

export const useData = create((set) => ({
  data: [],
  // get
  getData: async () => {
    try {
      const { data } = await axios.get(API);

      set({
        data: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // add
  addUser: (name) =>
    set((state) => ({
      data: [
        ...state.data,
        {
          id: Date.now(),
          name,
        },
      ],
    })),
  // delete
  deleteUser: (id) =>
    set((state) => ({
      data: state.data.filter((user) => user.id !== id),
    })),
  // ✏️ edit
  editUser: (id, newName) =>
    set((state) => ({
      data: state.data.map((user) =>
        user.id === id
          ? { ...user, name: newName }
          : user
      ),
    })),
}));