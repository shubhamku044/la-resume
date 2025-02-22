import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Skills as SkillsType } from '@/types';

interface SkillsState {
  value: SkillsType;
}

const initialState: SkillsState = {
  value: [],
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<Skills>) => {
      state.value = action.payload;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((skill) => skill !== action.payload);
    },
  },
});

export const { setSkills, addSkill, removeSkill } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.skills;

export default skillsSlice.reducer;

export type Skills = string[];
