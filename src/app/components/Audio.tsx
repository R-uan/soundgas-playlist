import IAudio from "../scripts/IAudio"
import { Trash, Play_24, MoveUp, MoveDown } from "@/app/assets/Media/MediaHelper";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Audio({ data, index } : { data: IAudio, index: number }) {
    const isCurrentStyle = "flex items-center w-[685px] h-fit bg-[#343541] rounded-lg relative p-2 pl-4";
    const isNotCurrentStyle = "flex items-center w-[685px] h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4"

    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();
    const [ isCurrent, setIsCurrent ] = useState(false);
    
    let { title, performer, originalUrl } = data
    title.length > 50 ? title = title.slice(0, 51) + "..." : null

    function handleClick() { setCurrIndex(index) }
    function handleDeletion() { 
        setAudioList(audioList.filter((_, i) => i != index)); 
        setCurrIndex(-1);
    }

    useEffect(() => { 
        if(currIndex == index) setIsCurrent(true);
        else setIsCurrent(false);
    }, [currIndex])

    function handleMoveUp() {
        if(index == 0) return; 
        let audioListClone = audioList.slice();
        const temp = audioListClone[index - 1];
        audioListClone[index - 1] = audioListClone[index];
        audioListClone[index] = temp;
        if(isCurrent) setCurrIndex(index - 1);
        setAudioList(audioListClone);
    }

    function handleMoveDown() { 
        if(index == audioList.length - 1) return; 
        let audioListClone = audioList.slice();
        const temp = audioListClone[index + 1];
        audioListClone[index + 1] = audioListClone[index];
        audioListClone[index] = temp;
        if(isCurrent) setCurrIndex(index + 1);
        setAudioList(audioListClone);
    }

    return (
        <div className={isCurrent ? isCurrentStyle : isNotCurrentStyle}>
            <div className="flex flex-col">
                <span className="text-lg">
                    <a href={originalUrl} target="_blank">
                        {title}
                    </a>
                </span>
                <span className="text-sm">{performer}</span>
            </div>
            {/* Play now */}
            <div className="absolute right-3 flex gap-6 items-center h-full">
                <button className="hover:opacity-70" aria-label="play now" onClick={handleClick}>
                    <Image src={Play_24} alt="play now" />
                </button>
            {/* Delete audio */}
                <button className="hover:opacity-70" aria-label="delete audio" onClick={handleDeletion}>
                    <Image src={Trash} alt="remove audio" />
                </button>
            {/* Move UP/DOWN */}
                <div className="flex flex-col gap-3">
                    <button className="hover:opacity-70" aria-label="move up" onClick={handleMoveUp}>
                        <Image src={MoveUp} alt="move up" />
                    </button>
                    <button className="hover:opacity-70" aria-label="move down" onClick={handleMoveDown}>
                        <Image src={MoveDown} alt="move down" />
                    </button>
                </div>
            </div>
        </div>
    )
}