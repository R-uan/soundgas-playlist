import { usePlaylistContext } from "@/app/contexts/PlaylistProvider";
import { useRef, useState, useEffect } from "react";
import Playlist from "./Playlist";
import IPlaylist from "@/app/scripts/IPlaylist";

export default function PlaylistsList() {
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const playlistName = useRef<HTMLInputElement | null>(null);
	const [playlistKeys, setPlaylistKeys] = useState<string[]>([]);
	const [trigger, setTrigger] = useState(0);

	useEffect(() => {
		function GetPlayListsKeys() {
			const keys = Object.keys(localStorage);
			const Regex = new RegExp("^(pl\\$)(.*)", "i");
			const PlaylistKeys = keys.filter((ele) => {
				return ele.match(Regex);
			});

			setPlaylistKeys(PlaylistKeys);
		}
		GetPlayListsKeys();
	}, [trigger]);

	function SavePlayList() {
		const input = playlistName.current;
		if (input && currentPlaylist.playlist.length > 0) {
			const NewPlaylist: IPlaylist = {
				name: input.value,
				playlist: currentPlaylist.playlist,
			};
			const name = "pl$" + input.value.split(" ").join("_");
			localStorage.setItem(name, JSON.stringify(NewPlaylist));
			setCurrentPlaylist(NewPlaylist);
			setTrigger(Math.random() * 1000);
		}
	}

	return (
		<div className="bg-[#0F1114] h-fit w-[250px] flex flex-col justify-start items-center rounded-md p-2 gap-2">
			<input
				type="text"
				ref={playlistName}
				name="playlist-name"
				className="w-full rounded pl-3 bg-[#15181D] border-[#00000015]"
				placeholder="Enter playlist name"
			/>
			<button
				onClick={SavePlayList}
				className="border-[#00000036] border-2 p-1 bg-[#15181D] hover:bg-[#0F0F0F] w-full rounded-md">
				Save Current Playlist
			</button>
			<hr />
			<div className="w-full max-h-[200px] overflow-auto">
				<div className="h-fit w-full flex flex-col gap-1">
					{playlistKeys.map((key) => (
						<Playlist key={key} playlistKey={key} trigger={setTrigger} />
					))}
				</div>
			</div>
		</div>
	);
}
