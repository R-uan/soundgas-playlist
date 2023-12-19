import Controls from "./Controls";
import AddAudio from "./AddAudio";
import { useEffect, useState } from "react"
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

function App() {
  const { audioList, setAudioList } = useAudioListContext();
  const { currIndex } = useCurrentAudioContext();
  
  const [currPerformer, setCurrPerformer] = useState<string | null>("");
  const [currTitle, setCurrTitle] = useState<string | null>("");
  const [currLink, setCurrLink] = useState<string | null>("");

  useEffect(() => { 
    function CurrentAudio(title: string, link: string, performer: string) { 
      setCurrTitle(title);
      setCurrLink(link);
      setCurrPerformer(performer)
    }
    CurrentAudio(audioList[currIndex]?.title, audioList[currIndex]?.rawAudioUrl, audioList[currIndex]?.performer)
  }, [currIndex])

  // check if there's data in the local storage
  useEffect(() => {
    const storedData = localStorage.getItem('audioList');
    if (storedData) {
      setAudioList(JSON.parse(storedData))
    }
  }, []);

  // Set local storage on audio list change
  useEffect(() => { 
    localStorage.setItem("audioList", JSON.stringify(audioList));
  }, [audioList])

  // resets the controls ui on empty audio list
  useEffect(() => {
    if(audioList.length === 0) { 
      setCurrTitle(null); 
      setCurrLink(null);
    }
  }, [audioList])

  return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center left-0 absolute bottom-0 justify-center w-screen bg-[#0D0F12]">
          <div className="flex flex-col h-fit absolute left-20 w-[468px]">
            <span className="w-[540px] h-8 text-lg overflow-auto whitespace-break-spaces">{currTitle}</span>
            <span className="w-[580px] text-sm overflow-hidden whitespace-nowrap">{currPerformer}</span>
          </div>
          <Controls currentAudio={currLink} /> 
        </div>
        <div className="gap-2 m-5 w-fit">
          <AddAudio />
        </div>
      </div>
  )
}

export default App
