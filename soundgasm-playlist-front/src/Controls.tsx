import { useRef, useState } from "react";
import { useCurrentAudioContext } from "./contexts/CurrentAudioProvider";
import { useAudioListContext } from "./contexts/AudioListProvider";
import { Pause, Play, Previous, Next } from "./assets/Media/MediaHelper"
export default function Controls({ currentAudio } : { currentAudio: string }) {
    const { audioList } = useAudioListContext();
    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const audioPlayerRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setPlaying] = useState(false);

    const handleTogglePlay = () => {
        const audioPlayer = audioPlayerRef.current;
        if (audioPlayer) {
          if (isPlaying) audioPlayer.pause();
          else audioPlayer.play();
          setPlaying(!isPlaying);
        }
    };

    function handleNextAudio() { 
      if(currIndex == audioList.length) return;
      setCurrIndex(currIndex + 1);
    }

    function handlePreviousAudio() { 
      if(currIndex == 0) return;
      setCurrIndex(currIndex - 1);
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <audio ref={audioPlayerRef} src={currentAudio} onEnded={handleNextAudio} autoPlay controls></audio>
            <div className="flex align-middle w-fit gap-3">
              <button type="button" onClick={handlePreviousAudio}>
                <img src={Previous} alt="Previous Audio" />
              </button>
              
              <button id="toggle-play" onClick={handleTogglePlay} type="button">
                <img src={Pause} alt="pause" />
              </button>
              <button type="button" onClick={handleNextAudio}>
                <img src={Next} alt="" />
              </button> 
            </div>
        </div>
    )
}