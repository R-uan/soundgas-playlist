import { useEffect, useRef, useState } from "react";
import { MdVolumeDown, MdVolumeUp } from "react-icons/md";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { IoPauseSharp, IoPlaySharp, IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoShuffleSharp } from "react-icons/io5";

export default function Controls() {
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const { audioIndex, setAudioIndex, audio } = useCurrentAudioContext();

	const audioPlayerRef = useRef<HTMLAudioElement>(null);
	const audioPlayer = audioPlayerRef.current;

	const [isLoaded, setIsLoaded] = useState(false);
	const [isPlaying, setPlaying] = useState(false);
	const [currentVol, setCurrentVolume] = useState<number>(100);

	const [currentTime, setCurrentTime] = useState<string>("00:00");
	const [totalDuration, setTotalDuration] = useState<string>("00:00");

	function handleTogglePlay() {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
			if (isPlaying) audioPlayer.pause();
			else audioPlayer.play();
			setPlaying(!isPlaying);
		}
	}

	function handleNextAudio() {
		if (audioIndex == currentPlaylist.playlist.length) return;
		setAudioIndex(audioIndex + 1);
	}

	function handlePreviousAudio() {
		if (audioIndex == 0) return;
		setAudioIndex(audioIndex - 1);
	}

	function handleVolumeUp() {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
			if (currentVol == 100) return;
			const newVolume = currentVol + 10;
			setCurrentVolume(newVolume);
			audioPlayer.volume = newVolume / 100;
		}
	}

	function handleVolumeDown() {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
			if (currentVol == 0) return;
			const newVolume = currentVol - 10;
			setCurrentVolume(newVolume);
			audioPlayer.volume = newVolume / 100;
		}
	}

	function handleOnAudioEnd() {
		setTimeout(() => setAudioIndex(audioIndex + 1), 3000);
		if (audioIndex == currentPlaylist.playlist.length) return;
	}

	function handleShuffle() {
		const array = currentPlaylist.playlist;
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		const NewCurrentIndex = array.findIndex((obj) => obj.title === audio?.title);
		if (NewCurrentIndex != -1) setAudioIndex(NewCurrentIndex);
		setCurrentPlaylist({ ...currentPlaylist, playlist: array });
	}

	function handleLoadMetaData() {
		if (audioPlayer) {
			const audioDuration = audioPlayer.duration;
			if (audioDuration < 3600) {
				const lessThanHour = new Date(audioPlayer.duration * 1000).toISOString().slice(14, 19);
				setTotalDuration(lessThanHour);
				setIsLoaded(true);
			} else {
				const moreThanHour = new Date(audioPlayer.duration * 1000).toISOString().slice(11, 19);
				setTotalDuration(moreThanHour);
				setIsLoaded(true);
			}
		}
	}

	function handleTimeUpdate() {
		if (audioPlayer && isPlaying && isLoaded) {
			const audioDuration = audioPlayer.duration;
			if (audioDuration < 3600) {
				const lessThanHour = new Date(audioPlayer.currentTime * 1000).toISOString().slice(14, 19);
				setCurrentTime(lessThanHour);
			} else {
				const moreThanHour = new Date(audioPlayer.currentTime * 1000).toISOString().slice(11, 19);
				setCurrentTime(moreThanHour);
			}
		}
	}

	// resets the ui if current audio is null
	useEffect(() => {
		if (audio == null) {
			setPlaying(false);
			setAudioIndex(-1);
			setTotalDuration("00:00");
			setCurrentTime("00:00");
		} else {
			setTotalDuration("00:00");
			setCurrentTime("00:00");
			setIsLoaded(false);
		}
	}, [audio]);

	return (
		<div className="flex flex-row left-0 bottom-0 justify-center w-screen h-[10vh] bg-[#0D0F12] z-50">
			<div className="flex flex-row p-3 gap-10 items-center">
				<audio
					ref={audioPlayerRef}
					onPlay={() => setPlaying(true)}
					src={audio?.rawAudioUrl ?? ""}
					onEnded={handleOnAudioEnd}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadMetaData}
					autoPlay></audio>
				<div className="flex flex-col h-fit p-1 w-[440px] overflow-hidden gap-[1px]">
					<div className="w-full h-fit mb-[4px]">
						<h1 className={`leading-tight text-nowrap w-fit h-fit text-lg overflow-auto ${audio?.title && audio.title.length > 48 ? "overflown-title" : null}`}>{audio?.title}</h1>
					</div>
					<div className="w-full p-[1px]">
						<h3 className="w-full text-sm overflow-hidden">{audio?.performer}</h3>
					</div>
				</div>
				<div className="flex flex-row align-middle w-fit gap-5">
					<button onClick={handleShuffle}>
						<IoShuffleSharp size={30} />
					</button>
					<button className="hover:opacity-70" aria-label="previousAudio audio" type="button" onClick={handlePreviousAudio}>
						<IoPlaySkipBackSharp size={30} />
					</button>
					<button className="hover:opacity-70" aria-label="toggle play" id="toggle-play" onClick={handleTogglePlay} type="button">
						{isPlaying ? <IoPauseSharp size={30} /> : <IoPlaySharp size={30} />}
					</button>
					<button className="hover:opacity-70" aria-label="nextAudio audio" type="button" onClick={handleNextAudio}>
						<IoPlaySkipForwardSharp size={30} />
					</button>
				</div>
				<div className="relative">
					<span className="absolute right-0 bottom-full">
						{currentTime} / {totalDuration}
					</span>
					<div>
						<div className="h-1 bg-white w-72"></div>
					</div>
					<span className="text-xs absolute">I don&#39;t know how to make a progress bar yet xD</span>
				</div>
				<div className="flex gap-5 items-center">
					<button className="hover:opacity-70" aria-label="volume down" onClick={handleVolumeDown}>
						<MdVolumeDown size={30} />
					</button>
					<span className="text-2xl">{currentVol}</span>
					<button className="hover:opacity-70" aria-label="volume up" onClick={handleVolumeUp}>
						<MdVolumeUp size={30} />
					</button>
				</div>
			</div>
		</div>
	);
}
