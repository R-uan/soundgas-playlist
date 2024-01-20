import PlaylistTestData from "../scripts/PlaylistTestData";
import { ReactNode, createContext, useContext, useState } from "react";
import IPlaylist from "../scripts/IPlaylist";
import { NewPlaylistTestData } from "../scripts/NewPlaylistTestData";

interface AudioArrayContextValue {
	currentPlaylist: IPlaylist;
	setCurrentPlaylist: React.Dispatch<React.SetStateAction<IPlaylist>>;
}
const AudioArrayContext = createContext<AudioArrayContextValue | null>(null);

export default function PlaylistProvider({ children }: { children: ReactNode }) {
	const starterArray: IPlaylist = { name: "", playlist: [] };
	const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist>(starterArray);
	return (
		<AudioArrayContext.Provider value={{ currentPlaylist, setCurrentPlaylist }}>
			{children}
		</AudioArrayContext.Provider>
	);
}

export function usePlaylistContext() {
	const PlaylistContext = useContext(AudioArrayContext);
	if (PlaylistContext == null)
		throw new Error("useOnboardingContext be inside a OnboardingProvider");
	return PlaylistContext;
}
