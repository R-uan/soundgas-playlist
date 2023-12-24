"use client"

import Controls from "./Controls";
import AddAudio from "./AddAudio";
import { useEffect, useState } from "react"
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import SidePanel from "./SidePanel";

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
          <SidePanel />
        <div className="gap-2 m-5 w-[685px]">
          <AddAudio />
        S</div>
      </div>
  )
}

export default App
