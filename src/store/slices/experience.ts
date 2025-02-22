import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Experience } from '@/types';

const initialState: Experience[] = [];

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      return action.payload;
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.push(action.payload);
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      return state.filter((exp) => exp.id !== action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setExperiences, addExperience, removeExperience, updateExperience } =
  experienceSlice.actions;

export const selectExperiences = (state: RootState) => state.experience;

export default experienceSlice.reducer;
