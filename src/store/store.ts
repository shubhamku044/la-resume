import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  boardApi,
  jobApi,
  paymentApi,
  personalInfoApi,
  statsApi,
  templateApi,
  userDetailsApi,
} from './services';
import {
  educationReducer,
  experienceReducer,
  personalInfoReducer,
  projectReducer,
  skillsReducer,
  userDetailsReducer,
} from './slices';

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
