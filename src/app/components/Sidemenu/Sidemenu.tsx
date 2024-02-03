import PlaylistsList from "./PlaylistsList";
import SupportedSites from "./SupportedSites";

export default function Sidemenu() {
	return (
		<div className="absolute rounded flex flex-col items-center h-fit left-[50px] mt-5 gap-3">
			<SupportedSites />
			<PlaylistsList />
		</div>
	);
}
