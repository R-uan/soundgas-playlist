import IAudio from "../scripts/IAudio";
import { Trash, Play_24, MoveUp, MoveDown } from "@/app/assets/Media/MediaHelper";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import IPlaylist from "../scripts/IPlaylist";

export default function Audio({ data, index }: { data: IAudio; index: number }) {
	const isCurrentStyle =
		"flex items-center w-[685px] h-fit bg-[#343541] rounded-lg relative p-2 pl-4";
	const isNotCurrentStyle =
		"flex items-center w-[685px] h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4";

	const { currentIndex, setCurrentIndex } = useCurrentAudioContext();
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const [isCurrent, setIsCurrent] = useState(false);

	let { title, performer, originalUrl } = data;
	/* title.length > 50 ? (title = title.slice(0, 51) + "...") : null; */

	function handlePlayNow() {
		setCurrentIndex(index);
	}

	function handleDeletion() {
		const PlaylistClone = currentPlaylist.playlist.filter((_, i) => i != index);
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		setCurrentPlaylist(NewPlaylistArray);
		setCurrentIndex(-1);
	}

	function handleMoveUp() {
		if (index == 0) return;
		if (currentIndex === index - 1) {
			setCurrentIndex(index);
		}
		let PlaylistClone = currentPlaylist.playlist.slice();
		const temp = PlaylistClone[index - 1];
		PlaylistClone[index - 1] = PlaylistClone[index];
		PlaylistClone[index] = temp;
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		if (isCurrent) setCurrentIndex(index - 1);
		setCurrentPlaylist(NewPlaylistArray);
	}

	function handleMoveDown() {
		if (index == currentPlaylist.playlist.length - 1) return;
		if (currentIndex === index + 1) {
			setCurrentIndex(index);
		}
		let PlaylistClone = currentPlaylist.playlist.slice();
		const temp = PlaylistClone[index + 1];
		PlaylistClone[index + 1] = PlaylistClone[index];
		PlaylistClone[index] = temp;
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		if (isCurrent) setCurrentIndex(index + 1);
		setCurrentPlaylist(NewPlaylistArray);
	}

	useEffect(() => {
		if (currentIndex == index) setIsCurrent(true);
		else setIsCurrent(false);
	}, [currentIndex]);

	return (
		<div className={isCurrent ? isCurrentStyle : isNotCurrentStyle}>
			<div className="flex flex-col overflow-hidden">
				<div className="m-[3px] h-fit w-[520px]">
					<h3
						className={`leading-tight text-nowrap w-fit h-fit text-lg ${
							title && title.length > 48 ? "overflown-title" : null
						}`}>
						<a href={originalUrl} target="_blank">
							{title}
						</a>
					</h3>
					<span className="text-sm">{performer}</span>
				</div>
			</div>
			{/* Play now */}
			<div className="absolute right-3 flex gap-6 items-center h-full">
				<button className="hover:opacity-70" aria-label="play now" onClick={handlePlayNow}>
					<Image src={Play_24} alt="play now" />
				</button>
				{/* Delete audio */}
				<button
					className="hover:opacity-70"
					aria-label="delete audio"
					onClick={handleDeletion}>
					<Image src={Trash} alt="remove audio" />
				</button>
				{/* Move UP/DOWN */}
				<div className="flex flex-col gap-3">
					<button
						className="hover:opacity-70"
						aria-label="move up"
						onClick={handleMoveUp}>
						<Image src={MoveUp} alt="move up" />
					</button>
					<button
						className="hover:opacity-70"
						aria-label="move down"
						onClick={handleMoveDown}>
						<Image src={MoveDown} alt="move down" />
					</button>
				</div>
			</div>
		</div>
	);
}
