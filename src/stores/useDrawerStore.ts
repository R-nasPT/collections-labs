import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DrawerState {
  isDrawerOpen: boolean;
  selectedId: string | null;
  openDrawer: (returnOrderId: string) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>()(
  devtools((set) => ({
    isDrawerOpen: false,
    selectedId: null,
    openDrawer: (returnOrderId: string) => set({
      isDrawerOpen: true,
      selectedId: returnOrderId,
    }, false, 'returnOrder/openDrawer'),
    closeDrawer: () => set({
      isDrawerOpen: false,
      selectedId: null
    }, false, 'returnOrder/closeDrawer'),
  }),
  {
    name: 'Drawer Store',
    enabled: process.env.NODE_ENV === 'development',
  })
);

// --------------- No Devtools ------------------
export const useDrawerStore = create((set) => ({
  isDrawerOpen: false,
  selectedId: null,
  openDrawer: (returnOrderId: string) => set({
    isDrawerOpen: true,
    selectedId: returnOrderId,
  }),
  closeDrawer: () => set({
    isDrawerOpen: false,
    selectedId: null
  }),
}));
