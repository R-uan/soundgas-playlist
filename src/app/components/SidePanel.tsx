import { useEffect, useRef, useState } from "react";
import { useAudioListContext } from "../contexts/AudioListProvider";
import Playlist from "./Playlist";

export default function SidePanel() {
	const { currentAudioList } = useAudioListContext();
	const playlistName = useRef<HTMLInputElement | null>(null);
	const [playlistKeys, setPlaylistKeys] = useState<string[]>([]);
	const [test, setTest] = useState(0);

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
	}, [test]);

	function SavePlayList() {
		const input = playlistName.current;
		if (input && currentAudioList.length > 0) {
			const name = "pl$" + input.value.split(" ").join("_");
			localStorage.setItem(name, JSON.stringify(currentAudioList));
			setTest(test + 1);
		}
	}

	return (
		<div className="absolute rounded flex flex-col items-center h-fit left-[50px] p-2 mt-5 gap-3">
			<div className="bg-[#0a0b11] w-[250px] h-fit flex flex-col items-center p-2 rounded-md">
				<span className="text-lg font-bold">Supported Sites</span>
				<ol className="ml-5 list-disc">
					<li>Soundgasm.com</li>
					<li>c#.kemono.su</li>
				</ol>
			</div>
			<div className="bg-[#0a0b11] h-fit w-[250px] flex flex-col justify-start items-center rounded-md p-2 gap-2">
				<input
					type="text"
					ref={playlistName}
					name="playlist-name"
					className="w-full rounded pl-3 bg-[#15181D] border-[#00000015]"
					placeholder="Playlist Name"
				/>
				<button
					onClick={SavePlayList}
					className="border-[#171522] border-2 p-1 bg-[#191825] hover:bg-[#393E46] w-full rounded-md">
					Save Current Playlist
				</button>
				<hr />
				<div className="h-fit w-full flex flex-col gap-1">
					{playlistKeys.map((key) => (
						<Playlist key={key} playlistKey={key} />
					))}
				</div>
			</div>
		</div>
	);
}
