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
import { personalInfoApi, userDetailsApi } from './services';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userDetails'],
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
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userDetailsApi.middleware)
      .concat(personalInfoApi.middleware);
    /*
    .concat(() => (next) => (action) => {
      console.log('RTK Query action: ', action);
      return next(action);
    });
  */
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
