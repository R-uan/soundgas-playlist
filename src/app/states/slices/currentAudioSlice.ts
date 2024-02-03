import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CurrentAudioIndexState {
	value: number;
}

const InitialState: CurrentAudioIndexState = {
	value: 0,
};

const CurrentAudioIndexSlice = createSlice({
	name: "CurrentIndex",
	initialState: InitialState,
	reducers: {
		nextAudio: (state) => {
			state.value += 1;
		},
		previousAudio: (state) => {
			state.value -= 1;
		},
		jumpTo: (state, action: PayloadAction<number>) => {
			console.log(action);
			state.value = action.payload;
		},
	},
});

export const { nextAudio, previousAudio, jumpTo } = CurrentAudioIndexSlice.actions;
export default CurrentAudioIndexSlice.reducer;
