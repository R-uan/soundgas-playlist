import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import IAudio from "../scripts/IAudio"

export default function Audio({ data, index } : { data: IAudio, index: number }) {
    const { audioList, setAudioList } = useAudioListContext();
    const { setCurrIndex } = useCurrentAudioContext();
    let { title } = data
    title.length > 62 ? title = title.slice(0, 61) + "..." : null

    function handleClick() { setCurrIndex(index) }
    function handleDeletion() {
        const newList = audioList.filter((_, i) => i != index)
        setAudioList(newList);
    }

    return (
        <div className="flex items-center w-[568px] h-[32px] bg-[#0f1114] rounded-lg relative">
            <button className="h-max w-max rounded-lg" onClick={handleClick}>
                <span className="text-center m-2">{title}</span>
            </button>
            <button className="absolute right-3" onClick={handleDeletion}>delete</button>
        </div>
    )
}