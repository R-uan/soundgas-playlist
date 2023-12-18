import { useEffect, useState } from "react"
import Controls from "./Controls";
import AddAudio from "./AddAudio";
import { useAudioListContext } from "./contexts/AudioListProvider";
import { useCurrentAudioContext } from "./contexts/CurrentAudioProvider";

function App() {
  const { audioList } = useAudioListContext();
  const { currIndex } = useCurrentAudioContext();
  const [currTitle, setCurrTitle] = useState<string>("");
  const [currLink, setCurrLink] = useState<string>("");

  useEffect(() => { 
    function CurrentAudio(title: string, link: string) { 
      setCurrTitle(title);
      setCurrLink(link);
    }
    CurrentAudio(audioList[currIndex]?.title, audioList[currIndex]?.audioLink)
  }, [currIndex])

  return (
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center m-5 w-[568px]">
          <div className="w-[568px] text-center m-3 break-words">{currTitle}</div>
          <Controls currentAudio={currLink} /> 
        </div>
        <div className="gap-2 m-5 w-[568px]">
          <AddAudio />
        </div>
      </div>
  )
}

export default App
