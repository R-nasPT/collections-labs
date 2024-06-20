import create from 'zustand';

interface UserState {
  user: User | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
