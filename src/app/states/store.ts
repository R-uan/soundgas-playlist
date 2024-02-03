import { configureStore } from "@reduxjs/toolkit";
import CurrentAudioIndexSlice from "./slices/currentAudioSlice";
export const store = configureStore({
	reducer: {
		index: CurrentAudioIndexSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
