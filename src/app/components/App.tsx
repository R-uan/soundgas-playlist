"use client";
import AddAudio from "./AddAudio";
import Controls from "./Controls";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import SidePanel from "./Sidemenu/Sidemenu";
import { useEffect, useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import AudioList from "./AudioList";

function App() {
	const currentIndex = useSelector((state: RootState) => state.index.value);
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();

	// check if there's data in the local storage
	useEffect(() => {
		function doThing() {
			const storedData = localStorage.getItem("cl$current_audio_list");
			if (storedData) {
				setCurrentPlaylist(JSON.parse(storedData));
			}
		}
		doThing();
	}, []);

	// Set local storage on audio list change
	useEffect(() => {
		function doThing() {
			localStorage.setItem("cl$current_audio_list", JSON.stringify(currentPlaylist));
		}
		doThing();
	}, [currentPlaylist]);

	return (
		<>
			<div className="flex flex-row">
				<SidePanel />
				<div className="flex flex-col w-[50vw] h-[90vh] gap-[1vh] pt-[20px] pb-[5px]">
					<AddAudio />
					<AudioList />
				</div>
			</div>
			<Controls />
		</>
	);
}

export default App;
