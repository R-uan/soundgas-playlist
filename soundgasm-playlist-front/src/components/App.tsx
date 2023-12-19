import Controls from "./Controls";
import AddAudio from "./AddAudio";
import { useEffect, useState } from "react"
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";

function App() {
  const { audioList, setAudioList } = useAudioListContext();
  const { currIndex } = useCurrentAudioContext();
  
  const [currTitle, setCurrTitle] = useState<string | null>("");
  const [currLink, setCurrLink] = useState<string | null>("");

  useEffect(() => { 
    function CurrentAudio(title: string, link: string) { 
      setCurrTitle(title);
      setCurrLink(link);
    }
    CurrentAudio(audioList[currIndex]?.title, audioList[currIndex]?.audioLink)
  }, [currIndex])

  // check if there's data in the local storage
  useEffect(() => {
    const storedData = localStorage.getItem('audioList');
    if (storedData) {
      console.log(storedData)
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
        <div className="flex flex-row items-center left-0 absolute bottom-0 justify-center w-screen bg-[#00000064]">
          <span className="w-[580px] overflow-hidden text-center m-3 whitespace-nowrap absolute left-0">{currTitle}</span>
          <Controls currentAudio={currLink} /> 
        </div>
        <div className="gap-2 m-5 w-[568px]">
          <AddAudio />
        </div>
      </div>
  )
}

export default App
