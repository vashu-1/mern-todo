import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: [],
  },
  reducers: {
    createlist: (state, action) => {
      state.lists = action.payload;
    },
  },
});
export const { createlist } = listSlice.actions;
export const selectlists = (state) => state.list.lists;

export default listSlice.reducer;
