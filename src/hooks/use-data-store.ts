// store/apiStore.ts
import {create} from "zustand";

type ApiStore<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  setData: (data: T) => void;
  setError: (error: string) => void;
  setLoading: (isLoading: boolean) => void;
  fetchData: (url: string) => Promise<void>;
};

export const useApiStore = create<ApiStore<any>>((set) => ({
  data: null,
  error: null,
  isLoading: false,
  setData: (data) => set({ data }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  
  fetchData: async (url) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      const data = await response.json();

      // If the request is successful, update the state with the fetched data
      if (response.ok) {
        set({ data: data.success?.data || data, isLoading: false });
      } else {
        set({ error: "Failed to fetch data", isLoading: false });
      }
    } catch (error) {
      set({ error: "Error fetching data", isLoading: false });
    }
  },
}));
