import { create } from "zustand";

export interface Idata {
  id: number;
  name: string;
  surname: string;
  age: number;
}

interface Store {
  data1: Idata[];
  addUser1: (user: Idata) => void;
  editUser1: (user: Idata) => void;
  deleteUser1: (id: number) => void;
}

export const useTodo = create<Store>((set) => ({
  data1: [
    { id: 1, name: "Ali", surname: "Barotov", age: 19 },
    { id: 2, name: "Sadi", surname: "Zaripov", age: 13 },
    { id: 3, name: "Karim", surname: "Barotov", age: 15 },
    { id: 4, name: "Sadam", surname: "Zaripov", age: 39 },
    { id: 5, name: "Firuz", surname: "Khurshedzoda", age: 15 },
    { id: 6, name: "Vose", surname: "Murodov", age: 39 },
  ],

  addUser1: (user) =>
    set((state) => ({
      data1: [...state.data1, user],
    })),

  editUser1: (user) =>
    set((state) => ({
      data1: state.data1.map((u) =>
        u.id === user.id ? user : u
      ),
    })),

  deleteUser1: (id) =>
    set((state) => ({
      data1: state.data1.filter((u) => u.id !== id),
    })),
}));