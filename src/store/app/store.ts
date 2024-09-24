import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { apiSlice } from '../features/api/apiSlice'
import { appStateSlice } from "../features/appStateSlice/appStateSlice";

const rootReducer = combineReducers({
  appState: appStateSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>
export function setupStore(preloadedState?: Partial<RootState>){
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    enhancers: (getdefaultEnhancers) => getdefaultEnhancers(
      {
        autoBatch: {type:'tick'}
      }
    )
  })
}

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;