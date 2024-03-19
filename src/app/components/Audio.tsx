import { useEffect, useState } from "react";
import { IoPlaySharp, IoTrash } from "react-icons/io5";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import IAudio from "../scripts/IAudio";
import IPlaylist from "../scripts/IPlaylist";

export default function Audio({ data, index }: { data: IAudio; index: number }) {
	const isCurrentStyle = "flex items-center w-full h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4 border border-[1px] border-[white]";
	const isNotCurrentStyle = "flex items-center w-full h-fit bg-[#0f1114] rounded-lg relative p-2 pl-4";

	const { audioIndex, setAudioIndex } = useCurrentAudioContext();
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const [isCurrent, setIsCurrent] = useState(false);

	let { title, performer, originalUrl } = data;
	/* title.length > 50 ? (title = title.slice(0, 51) + "...") : null; */

	function handlePlayNow() {
		setAudioIndex(index);
	}

	function handleDeletion() {
		const PlaylistClone = currentPlaylist.playlist.filter((_, i) => i != index);
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		if (audioIndex == index) {
			setAudioIndex(-1);
			setAudioIndex(audioIndex);
		}
		setCurrentPlaylist(NewPlaylistArray);
	}

	function handleMoveUp() {
		if (index == 0) return;
		if (audioIndex === index - 1) {
			setAudioIndex(index);
		}
		let PlaylistClone = currentPlaylist.playlist.slice();
		const temp = PlaylistClone[index - 1];
		PlaylistClone[index - 1] = PlaylistClone[index];
		PlaylistClone[index] = temp;
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		if (isCurrent) setAudioIndex(index - 1);
		setCurrentPlaylist(NewPlaylistArray);
	}

	function handleMoveDown() {
		if (index == currentPlaylist.playlist.length - 1) return;
		if (audioIndex === index + 1) {
			setAudioIndex(index);
		}
		let PlaylistClone = currentPlaylist.playlist.slice();
		const temp = PlaylistClone[index + 1];
		PlaylistClone[index + 1] = PlaylistClone[index];
		PlaylistClone[index] = temp;
		const NewPlaylistArray: IPlaylist = { ...currentPlaylist, playlist: PlaylistClone };
		if (isCurrent) setAudioIndex(index + 1);
		setCurrentPlaylist(NewPlaylistArray);
	}

	useEffect(() => {
		if (audioIndex == index) setIsCurrent(true);
		else setIsCurrent(false);
	}, [audioIndex]);

	return (
		<div className={isCurrent ? isCurrentStyle : isNotCurrentStyle}>
			<div className="flex flex-col overflow-hidden">
				<div className="m-[3px] h-fit w-[520px]">
					<h3 className={`leading-tight text-nowrap w-fit h-fit text-lg ${title && title.length > 48 ? "overflown-title" : null}`}>
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
					<IoPlaySharp size={20} />
				</button>
				{/* Delete audio */}
				<button className="hover:opacity-70" aria-label="delete audio" onClick={handleDeletion}>
					<IoTrash size={20} />
				</button>
				{/* Move UP/DOWN */}
				<div className="flex flex-col">
					<button className="hover:opacity-70" aria-label="move up" onClick={handleMoveUp}>
						<MdArrowDropUp size={30} />
					</button>
					<button className="hover:opacity-70" aria-label="move down" onClick={handleMoveDown}>
						<MdArrowDropDown size={30} />
					</button>
				</div>
			</div>
		</div>
	);
}
