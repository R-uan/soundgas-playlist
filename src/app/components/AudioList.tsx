import { usePlaylistContext } from "../contexts/PlaylistProvider";
import Audio from "./Audio";

export default function AudioList() {
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();

	return (
		<div className="overflow-auto h-[95%] flex flex-col gap-2 bottom-0">
			{currentPlaylist.playlist!.map((audio, index) => (
				<Audio key={index} index={index} data={audio} />
			))}
		</div>
	);
}
