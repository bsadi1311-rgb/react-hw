import { atom } from "jotai";

export interface IUser {
  id: number;
  phone: string;
  status: boolean;
}

export const dataAtom = atom<IUser[]>([
  { id: 1, phone: "+992903862121", status: true },
  { id: 2, phone: "+992945040202", status: false },
  { id: 3, phone: "+992900001111", status: true },
  { id: 4, phone: "+992000000001", status: false },
  { id: 5, phone: "+992900001111", status: true },
  { id: 6, phone: "+992000000001", status: false },
]);

export const addAtom = atom(null, (get, set, user: IUser) => {
  set(dataAtom, [...get(dataAtom), user]);
});

export const editAtom = atom(null, (get, set, user: IUser) => {
  set(
    dataAtom,
    get(dataAtom).map((u) =>
      u.id === user.id ? { ...u, ...user } : u
    )
  );
});

export const deleteAtom = atom(null, (get, set, id: number) => {
  set(
    dataAtom,
    get(dataAtom).filter((u) => u.id !== id)
  );
});