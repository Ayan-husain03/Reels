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
    } finally {
      set({ loading: false });
    } 
  },
  logout: async function () {
    try {
      await api.get("/user/logout"); 
      set({ user: null });
    } catch (error) {
      console.log(error.response?.message || "error while logout");
    }
  },
}));

export default useAuthStore;
