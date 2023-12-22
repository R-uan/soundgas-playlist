import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface CurrentAudioContextValue { 
    currIndex: number,
    setCurrIndex: React.Dispatch<SetStateAction<number>>
}

const CurrentAudioContext = createContext<CurrentAudioContextValue | null>(null);

export default function CurrentAudioProvider({children} : {children: ReactNode}) { 
    const [currIndex, setCurrIndex] = useState<number>(-1);
    return(
        <CurrentAudioContext.Provider value={{currIndex, setCurrIndex}}>
            {children}
        </CurrentAudioContext.Provider>
    )
}

export function useCurrentAudioContext() { 
    const currentAudioContext = useContext(CurrentAudioContext);
    if(currentAudioContext == null) throw new Error('useOnboardingContext be inside a OnboardingProvider');
    return currentAudioContext;
}