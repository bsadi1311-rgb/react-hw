import { create } from "zustand";

export interface Debt {
  id: number;
  name: string;
  amount: number;
  description: string;
  type: "pay" | "receive";
}

interface DebtStore {
  debts: Debt[];
  addDebt: (debt: Debt) => void;
}

export const useDebtStore = create<DebtStore>((set) => ({
  debts: [],

  addDebt: (debt) =>
    set((state) => ({
      debts: [...state.debts, debt],
    })),
}));