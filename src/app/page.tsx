"use client";
import AddAudio from "./components/AddAudio";
import Controls from "./components/Controls";
import AudioList from "./components/AudioList";
import SidePanel from "./components/Sidemenu/SidePanel";
import AudioListProvider from "./contexts/PlaylistProvider";
import CurrentAudioProvider from "./contexts/CurrentAudioProvider";

export default function Home() {
	return (
		<body className="flex flex-col items-center bg-[#15181d] text-[rgb(223,223,223)]">
			<AudioListProvider>
				<CurrentAudioProvider>
					<div className="flex flex-row">
						<SidePanel />
						<div className="flex flex-col w-[50vw] h-[90vh] gap-[1vh] pt-[20px] pb-[5px]">
							<AddAudio />
							<AudioList />
						</div>
					</div>
					<Controls />
				</CurrentAudioProvider>
			</AudioListProvider>
		</body>
	);
}
