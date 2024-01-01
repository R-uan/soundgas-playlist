import { useEffect, useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import Playlist from "./Playlist";

export default function SidePanel() {
	const { currentAudioList } = useAudioListContext();
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
		if (input && currentAudioList.length > 0) {
			const name = "pl$" + input.value.split(" ").join("_");
			localStorage.setItem(name, JSON.stringify(currentAudioList));
			setTrigger(Math.random() * 1000);
		}
	}

	return (
		<div className="absolute rounded flex flex-col items-center h-fit left-[50px] mt-5 gap-3">
			<div className="bg-[#0F1114] w-[250px] h-fit flex flex-col items-center p-2 rounded-md">
				<span className="text-lg font-bold">Supported Sites</span>
				<ol className="ml-5 list-disc">
					<li>Soundgasm.com</li>
					<li>c#.kemono.su</li>
				</ol>
			</div>
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
		</div>
	);
}
