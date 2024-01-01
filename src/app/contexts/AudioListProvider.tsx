import AudioListTestData from "../scripts/AudioListTestData";
import { ReactNode, createContext, useContext, useState } from "react";
import IAudio from "../scripts/IAudio";

interface AudioArrayContextValue {
	currentAudioList: IAudio[];
	setCurrentAudioList: React.Dispatch<React.SetStateAction<IAudio[]>>;
}
const AudioArrayContext = createContext<AudioArrayContextValue | null>(null);

export default function AudioListProvider({ children }: { children: ReactNode }) {
	const starterArray: IAudio[] = [];
	const [currentAudioList, setCurrentAudioList] = useState<IAudio[]>(AudioListTestData);
	return (
		<AudioArrayContext.Provider value={{ currentAudioList, setCurrentAudioList }}>
			{children}
		</AudioArrayContext.Provider>
	);
}

export function useAudioListContext() {
	const audioListContext = useContext(AudioArrayContext);
	if (audioListContext == null)
		throw new Error("useOnboardingContext be inside a OnboardingProvider");
	return audioListContext;
}
