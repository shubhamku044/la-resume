import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Education } from '@/types';

const initialState: Education[] = [];

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    setEducations: (state, action: PayloadAction<Education[]>) => {
      return action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.push(action.payload);
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      return state.filter((education) => education.id !== action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.findIndex((education) => education.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setEducations, addEducation, removeEducation, updateEducation } =
  educationSlice.actions;

export const selectEducations = (state: RootState) => state.education;

export default educationSlice.reducer;
