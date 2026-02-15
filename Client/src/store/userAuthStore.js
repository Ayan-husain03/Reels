import { create } from "zustand";
import api from "../lib/axios";
const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  fetchUser: async function () {
    try {
      const res = await api.get("/user/me");
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  logout: () => {
    set({ user: null });
  },
}));

export default useAuthStore;
