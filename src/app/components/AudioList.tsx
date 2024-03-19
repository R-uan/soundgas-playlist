import Audio from "./Audio";
import { usePlaylistContext } from "../contexts/PlaylistProvider";

export default function AudioList() {
	const { currentPlaylist } = usePlaylistContext();

	return (
		<div className="overflow-auto h-[95%] flex flex-col gap-2 bottom-0">
			{currentPlaylist.playlist!.map((audio, index) => (
				<Audio key={index} index={index} data={audio} />
			))}
		</div>
	);
}
