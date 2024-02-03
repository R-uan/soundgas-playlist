import { Dispatch, SetStateAction } from "react";
import { IoTrash, IoReloadSharp } from "react-icons/io5";
import { usePlaylistContext } from "../../contexts/PlaylistProvider";

export default function Playlist({
	playlistKey,
	trigger,
}: {
	playlistKey: string;
	trigger: Dispatch<SetStateAction<number>>;
}) {
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const name = playlistKey.split("$")[1].split("_").join(" ");

	function SetAsCurrentPlaylist() {
		const playlist = localStorage.getItem(playlistKey);
		if (playlist) {
			setCurrentPlaylist(JSON.parse(playlist));
		}
	}
	function DeletePlaylist() {
		localStorage.removeItem(playlistKey);
		trigger(Math.random() * 1000);
	}

	function UpdatePlaylist() {
		localStorage.setItem(playlistKey, JSON.stringify(currentPlaylist));
	}

	return (
		<>
			<div className="relative flex items-center w-full h-[30px] p-1 pl-[7px] pr-[7px] rounded-md bg-[#15181D] hover:bg-[#0F0F0F] text-center">
				<button onClick={DeletePlaylist} className="flex right-3">
					<IoTrash />
				</button>
				<button className="w-full h-full rounded-md" onClick={SetAsCurrentPlaylist}>
					{name}
				</button>
				<button className="flex right-3" onClick={UpdatePlaylist}>
					<IoReloadSharp />
				</button>
			</div>
		</>
	);
}
