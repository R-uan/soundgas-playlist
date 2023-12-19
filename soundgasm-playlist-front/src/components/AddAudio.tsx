import Audio from "./Audio";
import { useRef } from "react";
import IAudio from "../scripts/IAudio";
import { GetAudioInfo } from "../scripts/GetAudioInfo";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

export default function AddAudio() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();

    async function AddAudio() {
        const input = inputRef.current
        if(input) { 
            const inputValue = input.value;
            input.value = "";
            try {
                const newAudioData: IAudio = await GetAudioInfo(inputValue);
                setAudioList((old) => [...old, newAudioData])
            } catch (error) { console.log(`Olha o erro ${error}`) }
            if(currIndex == -1) setCurrIndex(0);
        }
    }

    return ( 
        <div className="gap-2 m-5 w-[568px]">
            <div className="flex"> 
                <input ref={inputRef} type="text" name="audio_link" className="w-full rounded pl-1 bg-[#0f1114]" />
                <button onClick={AddAudio} className="bg-[#0f1114] h-[24px] w-[58px] ml-1 rounded">Click</button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
            { audioList!.map((audio, index) => (<Audio key={index} index={index} data={audio} />)) }   
            </div> 
        </div>
        
    )
}