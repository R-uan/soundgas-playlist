import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import IAudio from "../scripts/IAudio";
import { usePlaylistContext } from "./PlaylistProvider";

interface CAC {
	audio: IAudio | null;
	setAudio: React.Dispatch<SetStateAction<IAudio | null>>;
	audioIndex: number;
	setAudioIndex: React.Dispatch<SetStateAction<number>>;
}
const CurrentAudioContext = createContext<CAC | null>(null);
export default function CurrentAudioProvider({ children }: { children: ReactNode }) {
	const [audio, setAudio] = useState<IAudio | null>(null);
	const [audioIndex, setAudioIndex] = useState<number>(-1);
	const { currentPlaylist } = usePlaylistContext();

	useEffect(() => {
		if (audioIndex < currentPlaylist.playlist.length && audioIndex >= 0) {
			setAudio(currentPlaylist.playlist[audioIndex]);
		}
	}, [audioIndex]);

	useEffect(() => {
		if (currentPlaylist.playlist.length === 0) setAudio({ title: "", originalUrl: "", performer: "", rawAudioUrl: "" });
	}, [currentPlaylist]);

	return <CurrentAudioContext.Provider value={{ audio, setAudio, audioIndex, setAudioIndex }}>{children}</CurrentAudioContext.Provider>;
}

export function useCurrentAudioContext() {
	const context = useContext(CurrentAudioContext);
	if (!context) throw new Error("Current audio context error");
	return context;
}
