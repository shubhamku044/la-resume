import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { PersonalInfo } from '@/types';

const initialState: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  jobTitle: '',
  linkedin: '',
  github: '',
  portfolio: '',
  twitter: '',
  summary: '',
  interests: [],
  languages: [],
};

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProfile: () => {
      return initialState;
    },
  },
});

export const { updateProfile, resetProfile } = personalInfoSlice.actions;

export const selectProfileInfo = (state: RootState) => state.personalInfo;

export default personalInfoSlice.reducer;
