"use client";
import AddAudio from "./AddAudio";
import Controls from "./Controls";
import SidePanel from "./Sidemenu/Sidemenu";
import { useEffect, useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

function App() {
	const { currentIndex } = useCurrentAudioContext();
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();

	const [currentLink, setCurrentLink] = useState<string | null>("");
	const [currentTitle, setCurrentTitle] = useState<string | null>("");
	const [currentPerformer, setCurrentPerformer] = useState<string | null>("");

	useEffect(() => {
		function CurrentAudio() {
			if (currentIndex === -1) {
				setCurrentTitle(null);
				setCurrentLink(null);
				setCurrentPerformer(null);
			} else if (currentPlaylist.playlist[currentIndex]) {
				setCurrentTitle(currentPlaylist.playlist[currentIndex].title);
				setCurrentLink(currentPlaylist.playlist[currentIndex].rawAudioUrl);
				setCurrentPerformer(currentPlaylist.playlist[currentIndex].performer);
			}
		}
		CurrentAudio();
	}, [currentIndex]);

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

	// resets the controls ui on empty audio list
	useEffect(() => {
		function doThing() {
			if (currentPlaylist.playlist.length === 0) {
				setCurrentTitle(null);
				setCurrentLink(null);
			}
		}
		doThing();
	}, [currentPlaylist]);

	return (
		<div className="flex flex-row gap-5">
			<Controls
				currentAudio={currentLink}
				currentTitle={currentTitle}
				currentPerformer={currentPerformer}
			/>
			<SidePanel />
			<div className="gap-2 m-5 w-[685px]">
				<AddAudio />
			</div>
		</div>
	);
}

export default App;
