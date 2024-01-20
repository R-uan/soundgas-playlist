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

	function ExportPlaylist() {
		const DataToExport: IPlaylist[] = [];
		playlistKeys.forEach((Key) => {
			const Data = localStorage.getItem(Key);
			if (Data) DataToExport.push(JSON.parse(Data));
		});
		if (DataToExport) {
			const Bloeb = new Blob([JSON.stringify(DataToExport)], { type: "application/json" });
			const UREL = URL.createObjectURL(Bloeb);
			const Link = document.createElement("a");
			Link.href = UREL;
			Link.download = "soundgasm_playlists.json";
			document.body.appendChild(Link);
			Link.click();
			document.body.removeChild(Link);
			URL.revokeObjectURL(UREL);
		}
	}

	function ImportPlaylist(event: React.ChangeEvent<HTMLInputElement>) {
		const File = event.target.files![0];
		const Reader = new FileReader();
		Reader.onload = (e) => {
			try {
				if (e.target != null && typeof e.target.result == "string") {
					const Base64Content = e.target.result.split(",")[1];
					const DecodedContent = atob(Base64Content);
					const JAYSON: IPlaylist[] = JSON.parse(DecodedContent);
					JAYSON.forEach((Playlist) => {
						const Key = "pl$" + Playlist.name.split(" ").join("_");
						localStorage.setItem(Key, JSON.stringify(Playlist));
					});
					setTrigger(Math.random() * 1000);
				}
			} catch (error) {
				console.log(error);
			}
		};
		Reader.readAsDataURL(File);
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
				className="border-[#00000036] border-[1px] p-1 bg-[#15181D] hover:border-[white] hover:bg-[#0F0F0F] w-full rounded-md">
				Save Current Playlist
			</button>
			<div className="flex w-full gap-2">
				<button
					onClick={ExportPlaylist}
					className="border-[#00000036] border-[1px] p-1 bg-[#15181D] hover:border-[white] hover:bg-[#0F0F0F] w-full rounded-md">
					Export
				</button>
				<div className="w-full">
					<label
						htmlFor="import-playlist"
						className="border-[#00000036] border-[1px] p-1 bg-[#15181D] hover:border-[white] hover:bg-[#0F0F0F] w-full rounded-md text-center block cursor-pointer;">
						Import
					</label>
					<input
						onChange={ImportPlaylist}
						className="hidden"
						type="file"
						name="import-playlist"
						id="import-playlist"
					/>
				</div>
				{/* <button
					onClick={ExportPlaylist}
					className="border-[#00000036] border-[1px] p-1 bg-[#15181D] hover:border-[white] hover:bg-[#0F0F0F] w-full rounded-md">
					Teste
				</button> */}
			</div>
			<hr />
			<div className="w-full max-h-[300px] overflow-auto">
				<div className="h-fit w-full flex flex-col gap-1">
					{playlistKeys.map((key) => (
						<Playlist key={key} playlistKey={key} trigger={setTrigger} />
					))}
				</div>
			</div>
		</div>
	);
}
