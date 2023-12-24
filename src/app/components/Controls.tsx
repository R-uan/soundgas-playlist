import { useEffect, useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { Pause, Play, Previous, Next, VolDown, VolUp } from "@/app/assets/Media/MediaHelper"
import Image from "next/image";

export default function Controls({ currentAudio, currentTitle, currentPerformer } : { currentAudio: string | null, currentTitle: string | null, currentPerformer: string | null }) {
  const { audioList } = useAudioListContext();
  const { currIndex, setCurrIndex } = useCurrentAudioContext();

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const audioPlayer = audioPlayerRef.current;
  
  const [isPlaying, setPlaying] = useState(false);
  const [currentVol, setCurrentVolume] = useState<number>(100);
  
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [totalDuration, setTotalDuration] = useState<string | null>(null);
  
  function handleTogglePlay() {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      if (isPlaying) audioPlayer.pause();
      else audioPlayer.play();
      setPlaying(!isPlaying);
    }
  };

  useEffect(() => {
      if(currIndex === -1) setTotalDuration(null);
      else if(audioPlayer && isPlaying) setTotalDuration(new Date(audioPlayer?.duration * 1000).toISOString().slice(11,19));
      else if(audioList.length === 0) setTotalDuration(null);
    }, [isPlaying])

    function handleTimeUpdate() { 
      if(audioPlayer) {
        const currentTime = new Date(audioPlayer.currentTime * 1000).toISOString().slice(11, 19);
        if(isPlaying) setCurrentTime(currentTime)
      }
    }
    

    function handleOnAudioEnd() { 
      if(currIndex == audioList.length) return;
      setTimeout(() => setCurrIndex(currIndex + 1), 3000);
    };

    function handleNextAudio() { 
      if(currIndex == audioList.length) return;
      setCurrIndex(currIndex + 1);
    };

    function handlePreviousAudio() { 
      if(currIndex == 0) return;
      setCurrIndex(currIndex - 1);
    };

    function handleVolumeUp(){
      const audioPlayer = audioPlayerRef.current
      if(audioPlayer) {
        if(currentVol == 100) return;
        const newVolume = (currentVol + 10);
        setCurrentVolume(newVolume);
        audioPlayer.volume = newVolume / 100;
      }
    };

    function handleVolumeDown(){
      const audioPlayer = audioPlayerRef.current
      if(audioPlayer) {
        if(currentVol == 0) return;
        const newVolume = (currentVol - 10);
        setCurrentVolume(newVolume);
        audioPlayer.volume = newVolume / 100;
      }
    };

    // resets the ui if current audio is null
    useEffect(() => { 
      if(currentAudio == null){ 
        setPlaying(false); 
        setCurrIndex(-1); 
      } 
    }, [currentAudio])

    return (
      <div className="flex flex-row left-0 absolute bottom-0 justify-center w-screen h-[76px] bg-[#0D0F12] z-50">   
        <div className="flex flex-row p-3 gap-10 items-center">
            <audio ref={audioPlayerRef} onPlay={() => setPlaying(true)} src={currentAudio ? currentAudio : ""} onEnded={handleOnAudioEnd} onTimeUpdate={handleTimeUpdate} autoPlay></audio>
            {/* Current Audio Info */}
            <div className="flex flex-col h-fit w-[440px]">
              <span className="w-[440px] h-8 text-lg overflow-auto whitespace-break-spaces">{currentTitle}</span>
              <span className="w-[440px] text-sm overflow-hidden whitespace-nowrap">{currentPerformer}</span>
            </div>
              {/* Play / Pause / Previous / Next */}
              <div className="flex flex-row align-middle w-fit gap-5">
                <button className="hover:opacity-70" aria-label="previous audio" type="button" onClick={handlePreviousAudio}>
                  <Image src={Previous} alt="previous audio" />
                </button>
                <button className="hover:opacity-70" aria-label="toggle play" id="toggle-play" onClick={handleTogglePlay} type="button">
                  <Image src={isPlaying ? Pause : Play} alt="pause" />
                </button>
                <button className="hover:opacity-70" aria-label="next audio" type="button" onClick={handleNextAudio}>
                  <Image src={Next} alt="next audio" />
                </button> 
              </div>
              {/* Progress Bar */}
              <div className="relative">
                <span className="absolute right-0 bottom-full">{currentTime} / {totalDuration ? totalDuration : "00:00:00" }</span>
                <div>
                  <div className="h-1 bg-white w-72"></div>
                </div>
                <span className="text-xs absolute">I don't know how to make a progress bar yet xD</span>
              </div>
              {/* Volume Controls */}
              <div className="flex gap-5 items-center">
                <button className="hover:opacity-70" aria-label="volume down" onClick={handleVolumeDown}>
                  <Image src={VolDown} alt="volume down" />
                </button>
                  <span className="text-2xl">{currentVol}</span>
                <button className="hover:opacity-70" aria-label="volume up" onClick={handleVolumeUp}>
                  <Image src={VolUp} alt="volume up" />
                </button>
              </div>
            </div>
        </div>
    )
}