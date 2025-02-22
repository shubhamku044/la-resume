import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Skills } from '@/types';

const initialState: Skills = [];

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<Skills>) => {
      state = action.payload;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state = state.filter((skill) => skill !== action.payload);
    },
  },
});

export const { setSkills, addSkill, removeSkill } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.skills;

export default skillsSlice.reducer;
