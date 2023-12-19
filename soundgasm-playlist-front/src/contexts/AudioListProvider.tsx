import { ReactNode, createContext, useContext, useState } from "react";
import AudioListTestData from "../scripts/AudioListTestData";
import IAudio from "../scripts/IAudio";


interface AudioArrayContextValue { 
    audioList: IAudio[],
    setAudioList: React.Dispatch<React.SetStateAction<IAudio[]>>
}
const AudioArrayContext = createContext<AudioArrayContextValue | null>(null);

export default function AudioListProvider({ children } : { children: ReactNode }) {
    const starterArray: IAudio[] = []
    const [audioList, setAudioList] = useState<IAudio[]>(AudioListTestData);
    return (
        <AudioArrayContext.Provider value={{audioList, setAudioList}}>
            {children}
        </AudioArrayContext.Provider>
    )
}

export function useAudioListContext() { 
    const audioListContext = useContext(AudioArrayContext);
    if(audioListContext == null) throw new Error('useOnboardingContext must be inside a OnboardingProvider');
    return audioListContext;
}