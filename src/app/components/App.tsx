"use client";

import Controls from "./Controls";
import AddAudio from "./AddAudio";
import { useEffect, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import SidePanel from "./Sidemenu/Sidemenu";

function App() {
	const { currentAudioList, setCurrentAudioList } = useAudioListContext();
	const { currentIndex } = useCurrentAudioContext();

	const [currentPerformer, setCurrentPerformer] = useState<string | null>("");
	const [currentTitle, setCurrentTitle] = useState<string | null>("");
	const [currentLink, setCurrentLink] = useState<string | null>("");

	useEffect(() => {
		function CurrentAudio() {
			if (currentIndex === -1) {
				setCurrentTitle(null);
				setCurrentLink(null);
				setCurrentPerformer(null);
			} else if (currentAudioList[currentIndex]) {
				setCurrentTitle(currentAudioList[currentIndex].title);
				setCurrentLink(currentAudioList[currentIndex].rawAudioUrl);
				setCurrentPerformer(currentAudioList[currentIndex].performer);
			}
		}
		CurrentAudio();
	}, [currentIndex]);

	// check if there's data in the local storage
	useEffect(() => {
		function doThing() {
			const storedData = localStorage.getItem("cl$current_audio_list");
			if (storedData) {
				setCurrentAudioList(JSON.parse(storedData));
			}
		}
		doThing();
	}, []);

	// Set local storage on audio list change
	useEffect(() => {
		function doThing() {
			localStorage.setItem("cl$current_audio_list", JSON.stringify(currentAudioList));
		}
		doThing();
	}, [currentAudioList]);

	// resets the controls ui on empty audio list
	useEffect(() => {
		function doThing() {
			if (currentAudioList.length === 0) {
				setCurrentTitle(null);
				setCurrentLink(null);
			}
		}
		doThing();
	}, [currentAudioList]);

	return (
		<div className="flex flex-row gap-5">
			<Controls
				currentAudio={currentLink}
				currentTitle={currentTitle}
				currentPerformer={currentPerformer}
			/>
			<SidePanel />
			<div className="gap-2 m-5 w-[685px]">
				<AddAudio />S
			</div>
		</div>
	);
}

export default App;
