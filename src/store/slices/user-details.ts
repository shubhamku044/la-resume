import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserDetailsPrisma } from '@/types/userDetails';

interface InitialState {
  userDetail: UserDetailsPrisma | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  userDetail: null,
  loading: false,
  error: null,
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetailsPrisma>) => {
      state.userDetail = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserDetails, setLoading, setError } = userDetailsSlice.actions;

export const userDetailsSkills = (state: RootState) => state.skills;

export default userDetailsSlice.reducer;