import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Project } from '@/types';

const initialState: Project[] = [];

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.findIndex((project) => project.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setProjects, addProject, removeProject, updateProject } = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project;

export default projectSlice.reducer;
