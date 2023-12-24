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
    function CurrentAudio() {
      if(audioList[currIndex]) {
        setCurrTitle(audioList[currIndex].title);
        setCurrLink(audioList[currIndex].rawAudioUrl);
        setCurrPerformer(audioList[currIndex].performer)
      } 
    }
    CurrentAudio()
  }, [currIndex])

  // check if there's data in the local storage
  useEffect(() => {
    function doThing() {
      const storedData = localStorage.getItem('audioList');
      if (storedData) {
        setAudioList(JSON.parse(storedData))
      }
    }
    doThing();
  }, []);

  // Set local storage on audio list change
  useEffect(() => { 
    function doThing() { 
      localStorage.setItem("audioList", JSON.stringify(audioList));
    }
    doThing();
  }, [audioList])

  // resets the controls ui on empty audio list
  useEffect(() => {
    function doThing() { 
      if(audioList.length === 0) { 
        setCurrTitle(null); 
        setCurrLink(null);
      }
    }
    doThing();
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
