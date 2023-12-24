import Audio from "./Audio";
import { useRef } from "react";
import IAudio from "../scripts/IAudio";
import { GetAudioInfo } from "../scripts/GetAudioInfo";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

export default function AddAudio() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { currentIndex, setCurrentIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();

    async function AddAudio() {
        const input = inputRef.current
        if(input) { 
            const inputValue = input.value;
            if(!inputValue) return;
            input.value = "";
            try {
                const newAudioData: IAudio = await GetAudioInfo(inputValue);
                if(newAudioData == null) return;
                setAudioList((old) => [...old, newAudioData])
            } catch (error) { 
                console.log(`Unexpected Error: ${error}`) 
            };

            if(currentIndex == -1) setCurrentIndex(0);
        }
    }

    let count = 0;
    async function ClearAudioList() {
        count++;
        if(count == 2) { 
            const empty: [] = [];
            setAudioList(empty);
            count = 0;
        } 
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) { 
        if(event.key === "Enter") { AddAudio() }
    }

    return ( 
        <div className="gap-2 m-5 mt-0 w-[685px] h-[650px] z-0 overflow-auto">
            <div className="flex sticky top-0 z-50 h-8 bg-[#15181D]"> 
                <input aria-label="audio link goes here" ref={inputRef} type="text" name="audio_link" className="w-full rounded h-[24px] pl-1 bg-[#0f1114] border-[#00000015] border-2" onKeyDown={(event) => handleKeyPress(event)} />
                <div className="relative flex justify-center h-fit w-fit ml-1 rounded ">
                    <button aria-label="add audio" onClick={AddAudio} className="bg-[#0f1114] h-[24px] w-[68px] rounded hover:bg-[#00000070] border-[#00000015] border-2 text-center text-sm">Add</button>
                </div>
                <div className="has-tooltip relative flex flex-row justify-center h-fit w-fit ml-1 rounded ">
                    <div>
                        <button aria-label="clear audio list" onClick={ClearAudioList} className="bg-[#b91414] h-[24px] w-[68px] rounded hover:bg-[#931515] text-sm  border-[#00000015] border-2">
                            Clear 
                        </button>
                    </div>
                    <span className="tooltip invisible absolute top-full right-[0.5px] text-center mt-2 rounded p-1 bg-[#931515] border-[#00000015] border-2 w-[170px] z-50">
                        Click twice to <br />
                        clear the audio list
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 bottom-0">
            { audioList!.map((audio, index) => (<Audio key={index} index={index} data={audio} />)) }   
            </div>    
        </div>
    )
}