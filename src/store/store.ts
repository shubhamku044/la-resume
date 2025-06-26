import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  PURGE,
  PERSIST,
  PAUSE,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  educationReducer,
  personalInfoReducer,
  skillsReducer,
  projectReducer,
  experienceReducer,
  userDetailsReducer,
} from './slices';
import {
  personalInfoApi,
  statsApi,
  userDetailsApi,
  templateApi,
  paymentApi,
  jobApi,
  boardApi,
} from './services';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'userDetails',
    'personalInfo',
    'templateApi',
    'personalInfoApi',
    'statsApi',
    'paymentApi',
    'jobApi',
    'boardApi',
  ],
};

const rootReducers = combineReducers({
  personalInfo: personalInfoReducer,
  skills: skillsReducer,
  education: educationReducer,
  project: projectReducer,
  experience: experienceReducer,
  userDetails: userDetailsReducer,
  [userDetailsApi.reducerPath]: userDetailsApi.reducer,
  [personalInfoApi.reducerPath]: personalInfoApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [boardApi.reducerPath]: boardApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore RTK Query state paths for serialization checks
        ignoredPaths: [
          'templateApi',
          'personalInfoApi',
          'statsApi',
          'userDetailsApi',
          'paymentApi',
          'jobApi',
          'boardApi',
        ],
      },
      // Disable immutability check for RTK Query cache
      immutableCheck: {
        ignoredPaths: [
          'templateApi',
          'personalInfoApi',
          'statsApi',
          'userDetailsApi',
          'paymentApi',
          'jobApi',
          'boardApi',
        ],
      },
    })
      .concat(userDetailsApi.middleware)
      .concat(personalInfoApi.middleware)
      .concat(templateApi.middleware)
      .concat(paymentApi.middleware)
      .concat(jobApi.middleware)
      .concat(statsApi.middleware)
      .concat(boardApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
