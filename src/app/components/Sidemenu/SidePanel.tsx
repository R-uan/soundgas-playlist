import { useCurrentAudioContext } from "@/app/contexts/CurrentAudioProvider";
import PlaylistsList from "./PlaylistsList";

export default function SidePanel() {
	const state = useCurrentAudioContext();
	return (
		<div className="absolute rounded flex flex-col items-center h-fit left-[50px] mt-5 gap-3">
			<div className="rainbow border-[1px] bg-[#0F1114] w-[250px] h-fit flex flex-col items-center p-2 rounded-md">
				<span className="text-lg font-bold">Supported Sites</span>
				<ol className="ml-5 list-disc">
					<li>Soundgasm.com</li>
					<li>c#.kemono.su</li>
				</ol>
			</div>
			<PlaylistsList />
		</div>
	);
}
