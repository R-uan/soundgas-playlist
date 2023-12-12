import { useEffect, useState } from "react"
import Audio from "./Audio";
import { get } from "./GetInfo";
import IAudio from "./IAudio";

function App() {
  const [currIndex, setCurrIndex] = useState(-1)
  const [audioList, setList] = useState<IAudio[]>([]);
  const [currTitle, setCurrTitle] = useState<string>("");
  const [currLink, setCurrLink] = useState<string>("");

  async function AddAudio() {
    const audioLink = (document.getElementById("audio_link") as HTMLInputElement).value
    const newAudioData: IAudio = await get(audioLink);
    setList((old) => [...old, newAudioData])
    if(currIndex == -1) setCurrIndex(0);
  }

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
        <audio id="current-audio" src={currLink} autoPlay controls onEnded={()=> setCurrIndex(currIndex + 1)}></audio>
      </div>
      <div className="gap-2 m-5 w-[568px]">
        <div className="flex"> 
            <input id="audio_link" type="text" name="audio_link" className="w-full rounded pl-1 bg-[#0f1114]" />
            <button onClick={async () => {
              await AddAudio();
              (document.getElementById("audio_link") as HTMLInputElement).value = ""
            }} className="bg-[#0f1114] h-[24px] w-[58px] ml-1 rounded">Click</button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
        {
          audioList ?  
          audioList.map((audio) => {
            let m = <Audio data={audio} />
            return m  
        }) : null
        }   
        </div>   
      </div>
    </div>
  )
}

export default App
