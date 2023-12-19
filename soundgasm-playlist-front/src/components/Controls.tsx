import { useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { Pause, Play, Previous, Next, Down, Up } from "../assets/Media/MediaHelper"

export default function Controls({ currentAudio } : { currentAudio: string }) {
    const { audioList } = useAudioListContext();
    const { currIndex, setCurrIndex } = useCurrentAudioContext();
    const audioPlayerRef = useRef<HTMLAudioElement>(null);
    const [currentVol, setCurrentVolume] = useState<number>(100);
    const [isPlaying, setPlaying] = useState(false);

    function handleTogglePlay() {
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

    return (
        <div className="flex flex-row gap-2 items-center p-3">
            <audio ref={audioPlayerRef} onPlay={() => setPlaying(true)} src={currentAudio} onEnded={handleNextAudio} autoPlay></audio>
            <div className="flex gap-5">
              {/* Play / Pause / Previous / Next */}
              <div className="flex flex-row align-middle w-fit gap-3">
                <button type="button" onClick={handlePreviousAudio}>
                  <img src={Previous} alt="Previous Audio" />
                </button>
                <button id="toggle-play" onClick={handleTogglePlay} type="button">
                  <img src={isPlaying ? Pause : Play} alt="pause" />
                </button>
                <button type="button" onClick={handleNextAudio}>
                  <img src={Next} alt="" />
                </button> 
              </div>
              {/* Volume Controls */}
              <div className="flex gap-2 items-center absolute right-36">
                <button onClick={handleVolumeDown}>
                  <img src={Down} alt="volume down" />
                </button>
                  <span className="text-2xl">{currentVol}</span>
                <button onClick={handleVolumeUp}>
                  <img src={Up} alt="volume up" />
                </button>
              </div>
            </div>
        </div>
    )
}