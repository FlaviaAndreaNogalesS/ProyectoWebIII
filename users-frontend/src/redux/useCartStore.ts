import { create } from "zustand";
import type { Libro } from "../models/dto/Libro";

interface CarritoItem {
  libro: Libro;
}

interface CartState {
  items: CarritoItem[];
  agregar: (libro: Libro) => void;
  eliminar: (id: number) => void;
  vaciar: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  agregar: (libro) => {
    const items = get().items;
    if (items.find((item) => item.libro.id === libro.id)) return;
    set({ items: [...items, { libro }] });
  },
  eliminar: (id) => {
    set({ items: get().items.filter((item) => item.libro.id !== id) });
  },
  vaciar: () => set({ items: [] }),
}));
