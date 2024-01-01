import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { Pause, Play, Previous, Next, VolDown, VolUp } from "@/app/assets/Media/MediaHelper";

export default function Controls({
	currentAudio,
	currentTitle,
	currentPerformer,
}: {
	currentAudio: string | null;
	currentTitle: string | null;
	currentPerformer: string | null;
}) {
	const { currentAudioList } = useAudioListContext();
	const { currentIndex, setCurrentIndex } = useCurrentAudioContext();

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
		if (currentIndex == currentAudioList.length) return;
		setCurrentIndex(currentIndex + 1);
	}

	function handlePreviousAudio() {
		if (currentIndex == 0) return;
		setCurrentIndex(currentIndex - 1);
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
		if (currentIndex == currentAudioList.length) return;
		setTimeout(() => setCurrentIndex(currentIndex + 1), 3000);
	}

	function handleLoadMetaData() {
		if (audioPlayer) {
			const audioDuration = audioPlayer.duration;
			if (audioDuration < 3600) {
				const lessThanHour = new Date(audioPlayer.duration * 1000)
					.toISOString()
					.slice(14, 19);
				setTotalDuration(lessThanHour);
				setIsLoaded(true);
			} else {
				const moreThanHour = new Date(audioPlayer.duration * 1000)
					.toISOString()
					.slice(11, 19);
				setTotalDuration(moreThanHour);
				setIsLoaded(true);
			}
		}
	}

	function handleTimeUpdate() {
		if (audioPlayer && isPlaying && isLoaded) {
			const audioDuration = audioPlayer.duration;
			if (audioDuration < 3600) {
				const lessThanHour = new Date(audioPlayer.currentTime * 1000)
					.toISOString()
					.slice(14, 19);
				setCurrentTime(lessThanHour);
			} else {
				const moreThanHour = new Date(audioPlayer.currentTime * 1000)
					.toISOString()
					.slice(11, 19);
				setCurrentTime(moreThanHour);
			}
		}
	}

	// resets the ui if current audio is null
	useEffect(() => {
		if (currentAudio == null) {
			setPlaying(false);
			setCurrentIndex(-1);
			setTotalDuration("00:00");
			setCurrentTime("00:00");
		} else {
			setTotalDuration("00:00");
			setCurrentTime("00:00");
			setIsLoaded(false);
		}
	}, [currentAudio]);

	return (
		<div className="flex flex-row left-0 absolute bottom-0 justify-center w-screen h-[76px] bg-[#0D0F12] z-50">
			<div className="flex flex-row p-3 gap-10 items-center">
				<audio
					ref={audioPlayerRef}
					onPlay={() => setPlaying(true)}
					src={currentAudio ? currentAudio : ""}
					onEnded={handleOnAudioEnd}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadMetaData}
					autoPlay></audio>
				{/* Current Audio Info */}
				<div className="flex flex-col h-fit w-[440px]">
					<span className="w-[440px] h-8 text-lg overflow-auto whitespace-break-spaces">
						{currentTitle}
					</span>
					<span className="w-[440px] text-sm overflow-hidden whitespace-nowrap">
						{currentPerformer}
					</span>
				</div>
				{/* Play / Pause / Previous / Next */}
				<div className="flex flex-row align-middle w-fit gap-5">
					<button
						className="hover:opacity-70"
						aria-label="previous audio"
						type="button"
						onClick={handlePreviousAudio}>
						<Image src={Previous} alt="previous audio" />
					</button>
					<button
						className="hover:opacity-70"
						aria-label="toggle play"
						id="toggle-play"
						onClick={handleTogglePlay}
						type="button">
						<Image src={isPlaying ? Pause : Play} alt="pause" />
					</button>
					<button
						className="hover:opacity-70"
						aria-label="next audio"
						type="button"
						onClick={handleNextAudio}>
						<Image src={Next} alt="next audio" />
					</button>
				</div>
				{/* Progress Bar */}
				<div className="relative">
					<span className="absolute right-0 bottom-full">
						{currentTime} / {totalDuration}
					</span>
					<div>
						<div className="h-1 bg-white w-72"></div>
					</div>
					<span className="text-xs absolute">
						I don&#39;t know how to make a progress bar yet xD
					</span>
				</div>
				{/* Volume Controls */}
				<div className="flex gap-5 items-center">
					<button
						className="hover:opacity-70"
						aria-label="volume down"
						onClick={handleVolumeDown}>
						<Image src={VolDown} alt="volume down" />
					</button>
					<span className="text-2xl">{currentVol}</span>
					<button
						className="hover:opacity-70"
						aria-label="volume up"
						onClick={handleVolumeUp}>
						<Image src={VolUp} alt="volume up" />
					</button>
				</div>
			</div>
		</div>
	);
}
