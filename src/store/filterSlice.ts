
import { Filters } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FilterState {
  filters: Filters;
}

const initialState: FilterState = {
  filters: {
    categories: [],
    tags: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },

    clearAllFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { updateFilter, setFilters, clearAllFilters } =
  filterSlice.actions;


export default filterSlice.reducer