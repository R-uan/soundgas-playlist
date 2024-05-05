import PlaylistTestData from "../scripts/PlaylistTestData";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import IPlaylist from "../scripts/IPlaylist";
import { NewPlaylistTestData } from "../scripts/NewPlaylistTestData";

interface AudioArrayContextValue {
	currentPlaylist: IPlaylist;
	setCurrentPlaylist: React.Dispatch<React.SetStateAction<IPlaylist>>;
}
const AudioArrayContext = createContext<AudioArrayContextValue | null>(null);

export default function PlaylistProvider({ children }: { children: ReactNode }) {
	const starter_playlist: IPlaylist = { name: "", playlist: [] };
	const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist>(starter_playlist);

	useEffect(() => {
		function doThing() {
			const storedData = localStorage.getItem("cl$current_audio_list");
			if (storedData) {
				setCurrentPlaylist(JSON.parse(storedData));
			}
		}
		doThing();
	}, []);

	useEffect(() => {
		function doThing() {
			localStorage.setItem("cl$current_audio_list", JSON.stringify(currentPlaylist));
		}
		doThing();
	}, [currentPlaylist]);

	return (
		<AudioArrayContext.Provider value={{ currentPlaylist, setCurrentPlaylist }}>{children}</AudioArrayContext.Provider>
	);
}

export function usePlaylistContext() {
	const PlaylistContext = useContext(AudioArrayContext);
	if (PlaylistContext == null) throw new Error("useOnboardingContext be inside a OnboardingProvider");
	return PlaylistContext;
}
