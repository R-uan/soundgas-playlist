import Audio from "./Audio";
import { useRef } from "react";
import IAudio from "../scripts/IAudio";
import { GetAudioInfo } from "../scripts/GetAudioInfo";
import { usePlaylistContext } from "../contexts/PlaylistProvider";
import { useCurrentAudioContext } from "../contexts/CurrentAudioProvider";
import IPlaylist from "../scripts/IPlaylist";

export default function AddAudio() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { currentIndex, setCurrentIndex } = useCurrentAudioContext();
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();
	const { name, playlist } = currentPlaylist;

	async function AddAudio() {
		try {
			const input = await navigator.clipboard.readText();
			const newAudioData: IAudio = await GetAudioInfo(input);
			if (newAudioData == null) return;
			const NewPlaylist = [...playlist, newAudioData];
			const NewPlaylistObject: IPlaylist = {
				name: currentPlaylist.name,
				playlist: NewPlaylist,
			};
			setCurrentPlaylist(NewPlaylistObject);
		} catch (error) {
			console.log(`Unexpected Error: ${error}`);
		}

		if (currentIndex == -1) setCurrentIndex(0);
	}

	let count = 0;
	async function ClearPlaylist() {
		count++;
		if (count == 2) {
			const UnsavedPlaylist: IPlaylist = { name: "", playlist: [] };
			setCurrentPlaylist(UnsavedPlaylist);
			count = 0;
		}
	}

	return (
		<div className="gap-2 m-5 mt-0 w-[685px] h-[650px] z-0 overflow-auto">
			<div className="flex justify-end sticky p-[5px] top-0 z-50 h-[38px] bg-[#15181D] ">
				<h1
					aria-label="playlist name"
					className="playlist-name text-xl outline outline-2 absolute left-[5px]">
					{name}
				</h1>
				<div className="relative flex justify-center h-fit w-fit ml-1 rounded">
					<button
						aria-label="add audio"
						onClick={AddAudio}
						className="bg-[#0f1114] h-[30px] p-1 w-fit rounded hover:bg-[#00000070] border-[#00000015] border-2 text-center text-sm">
						Add Audio From Clipboard
					</button>
				</div>
				<div className="has-tooltip relative flex flex-row justify-center h-fit w-fit ml-1 rounded ">
					<div>
						<button
							aria-label="clear audio list"
							onClick={ClearPlaylist}
							className="bg-[#b91414] h-[30px] w-[68px] rounded hover:bg-[#931515] text-sm  border-[#00000015] border-2">
							Clear
						</button>
					</div>
					<span className="tooltip invisible absolute top-full right-[0.5px] text-center mt-2 rounded p-1 bg-[#931515] border-[#00000015] border-2 w-[170px] z-50">
						Click twice to <br />
						clear the audio list
					</span>
				</div>
				<hr />
			</div>
			<div className="flex flex-col gap-2 mt-2 bottom-0">
				{currentPlaylist.playlist!.map((audio, index) => (
					<Audio key={index} index={index} data={audio} />
				))}
			</div>
		</div>
	);
}
