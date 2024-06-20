import create from 'zustand';

interface ProductState {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  clearProducts: () => set({ products: [] }),
}));

export default useProductStore;
