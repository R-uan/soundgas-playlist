import { useAudioListContext } from "../contexts/AudioListProvider";

export default function Playlist({ playlistKey }: { playlistKey: string }) {
	const { currentAudioList, setCurrentAudioList } = useAudioListContext();
	const name = playlistKey.split("$")[1].split("_").join(" ");

	function SetAsCurrentPlaylist() {
		const playlist = localStorage.getItem(playlistKey);
		if (playlist) {
			setCurrentAudioList(JSON.parse(playlist));
		}
	}
	return (
		<>
			<div className="w-full h-[30px] p-1 rounded-md bg-[#191825] hover:bg-[#393E46] text-center">
				<button className="w-full h-full rounded-md" onClick={SetAsCurrentPlaylist}>
					{name}
				</button>
			</div>
		</>
	);
}
