import IAudio from "../scripts/IAudio"
import { Trash, Play_24 } from "../assets/Media/MediaHelper";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

export default function Audio({ data, index } : { data: IAudio, index: number }) {
    const { setCurrIndex } = useCurrentAudioContext();
    const { audioList, setAudioList } = useAudioListContext();
    
    let { title, performer, originalUrl } = data
    title.length > 50 ? title = title.slice(0, 51) + "..." : null

    function handleClick() { setCurrIndex(index) }
    function handleDeletion() { setAudioList(audioList.filter((_, i) => i != index)); }

    return (
        <div className="flex items-center w-[568px] h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4">
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