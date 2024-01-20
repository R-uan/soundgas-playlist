import { Dispatch, SetStateAction } from "react";
import { usePlaylistContext } from "../../contexts/PlaylistProvider";
import Image from "next/image";
import { IoTrash } from "react-icons/io5";
export default function Playlist({
	playlistKey,
	trigger,
}: {
	playlistKey: string;
	trigger: Dispatch<SetStateAction<number>>;
}) {
	const { setCurrentPlaylist } = usePlaylistContext();
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
	return (
		<>
			<div className="relative w-full h-[30px] p-1 rounded-md bg-[#15181D] hover:bg-[#0F0F0F] text-center">
				<button onClick={DeletePlaylist} className="absolute right-3">
					<IoTrash />
				</button>
				<button className="w-full h-full rounded-md" onClick={SetAsCurrentPlaylist}>
					{name}
				</button>
			</div>
		</>
	);
}
