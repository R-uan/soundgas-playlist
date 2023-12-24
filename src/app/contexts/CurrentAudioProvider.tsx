import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface CurrentAudioContextValue { 
    currentIndex: number,
    setCurrentIndex: React.Dispatch<SetStateAction<number>>
}

const CurrentAudioContext = createContext<CurrentAudioContextValue | null>(null);

export default function CurrentAudioProvider({children} : {children: ReactNode}) { 
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    return(
        <CurrentAudioContext.Provider value={{currentIndex, setCurrentIndex}}>
            {children}
        </CurrentAudioContext.Provider>
    )
}

export function useCurrentAudioContext() { 
    const currentAudioContext = useContext(CurrentAudioContext);
    if(currentAudioContext == null) throw new Error('useOnboardingContext be inside a OnboardingProvider');
    return currentAudioContext;
}