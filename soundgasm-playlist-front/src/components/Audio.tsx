import IAudio from "../scripts/IAudio"
import { Trash, Play_24 } from "../assets/Media/MediaHelper";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { useEffect, useState } from "react";

export default function Audio({ data, index } : { data: IAudio, index: number }) {
    const isCurrentStyle = "flex items-center w-[568px] h-fit bg-[black] rounded-lg relative p-2 pl-4";
    const isNotCurrentStyle = "flex items-center w-[568px] h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4"

    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();
    const [ isCurrent, setIsCurrent ] = useState(false);
    
    let { title, performer, originalUrl } = data
    title.length > 50 ? title = title.slice(0, 51) + "..." : null

    function handleClick() { setCurrIndex(index) }
    function handleDeletion() { setAudioList(audioList.filter((_, i) => i != index)); }

    useEffect(() => { 
        if(currIndex == index) setIsCurrent(true);
        else setIsCurrent(false);
    }, [currIndex])

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
            <div className="absolute right-3 flex gap-6 items-center h-full">
                <button onClick={handleClick}>
                    <img src={Play_24} alt="play now" />
                </button>
                <button onClick={handleDeletion}>
                    <img src={Trash} alt="remove audio" />
                </button>
            </div>
        </div>
    )
}