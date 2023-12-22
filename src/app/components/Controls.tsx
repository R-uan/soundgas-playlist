import { useEffect, useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { Pause, Play, Previous, Next, VolDown, VolUp } from "@/app/assets/Media/MediaHelper"
import Image from "next/image";

export default function Controls({ currentAudio } : { currentAudio: string | null }) {
  const { audioList } = useAudioListContext();
  const { currIndex, setCurrIndex } = useCurrentAudioContext();

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setPlaying] = useState(false);
  const [currentVol, setCurrentVolume] = useState<number>(100);

    function handleTogglePlay() {
        const audioPlayer = audioPlayerRef.current;
        if (audioPlayer) {
          if (isPlaying) audioPlayer.pause();
          else audioPlayer.play();
          setPlaying(!isPlaying);
        }
    };

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
        <div className="flex flex-row gap-2 items-center p-3">
            <audio ref={audioPlayerRef} onPlay={() => setPlaying(true)} src={currentAudio ? currentAudio : ""} onEnded={handleOnAudioEnd} autoPlay></audio>
            <div className="flex gap-5">
              {/* Play / Pause / Previous / Next */}
              <div className="flex flex-row align-middle w-fit gap-10">
                <button aria-label="previous audio" type="button" onClick={handlePreviousAudio}>
                  <Image src={Previous} alt="previous audio" />
                </button>
                <button aria-label="toggle play" id="toggle-play" onClick={handleTogglePlay} type="button">
                  <Image src={isPlaying ? Pause : Play} alt="pause" />
                </button>
                <button aria-label="next audio" type="button" onClick={handleNextAudio}>
                  <Image src={Next} alt="next audio" />
                </button> 
              </div>
              {/* Volume Controls */}
              <div className="flex gap-2 items-center absolute right-36">
                <button aria-label="volume down" onClick={handleVolumeDown}>
                  <Image src={VolDown} alt="volume down" />
                </button>
                  <span className="text-2xl">{currentVol}</span>
                <button aria-label="volume up" onClick={handleVolumeUp}>
                  <Image src={VolUp} alt="volume up" />
                </button>
              </div>
            </div>
        </div>
    )
}