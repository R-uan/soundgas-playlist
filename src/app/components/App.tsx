"use client"

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
      <div className="flex flex-row gap-5">
          <Controls currentAudio={currLink} currentTitle={currTitle} currentPerformer={currPerformer} /> 
        <div className="absolute rounded flex flex-col items-center bg-[#0f1114] w-[250px] h-fit left-[50px] p-2 mt-5">
          <span className="text-lg font-bold">Supported Sites</span>
          <ol className="ml-5 list-disc">
            <li>Soundgasm.com</li>
            <li>c#.kemono.su</li>
          </ol>
        </div>
        <div className="gap-2 m-5 w-[685px]">
          <AddAudio />
        </div>
      </div>
  )
}

export default App
