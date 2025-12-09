// store/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  categories: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

const initialState: FilterState = {
  categories: [],
  tags: [],
  sizes: [],
  colors: [],
  priceRange: [0, 1000],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.indexOf(action.payload);
      if (index > -1) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(action.payload);
      }
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const index = state.tags.indexOf(action.payload);
      if (index > -1) {
        state.tags.splice(index, 1);
      } else {
        state.tags.push(action.payload);
      }
    },
    setSizes: (state, action: PayloadAction<string[]>) => {
      state.sizes = action.payload;
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const index = state.sizes.indexOf(action.payload);
      if (index > -1) {
        state.sizes.splice(index, 1);
      } else {
        state.sizes.push(action.payload);
      }
    },
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const index = state.colors.indexOf(action.payload);
      if (index > -1) {
        state.colors.splice(index, 1);
      } else {
        state.colors.push(action.payload);
      }
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    clearAllFilters: (state) => {
      state.categories = [];
      state.tags = [];
      state.sizes = [];
      state.colors = [];
      state.priceRange = [0, 1000];
    },
    initializeFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      if (action.payload.categories) state.categories = action.payload.categories;
      if (action.payload.tags) state.tags = action.payload.tags;
      if (action.payload.sizes) state.sizes = action.payload.sizes;
      if (action.payload.colors) state.colors = action.payload.colors;
      if (action.payload.priceRange) state.priceRange = action.payload.priceRange;
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setTags,
  toggleTag,
  setSizes,
  toggleSize,
  setColors,
  toggleColor,
  setPriceRange,
  clearAllFilters,
  initializeFilters,
} = filterSlice.actions;

export default filterSlice.reducer;