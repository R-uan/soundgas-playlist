"use client";
import { store } from "./states/store";
import { Provider } from "react-redux";
import App from "@/app/components/App";
import AudioListProvider from "./contexts/PlaylistProvider";
import CurrentAudioProvider from "./contexts/CurrentAudioProvider";

export default function Home() {
	return (
		<body className="flex flex-col items-center bg-[#15181d] text-[rgb(223,223,223)]">
			<Provider store={store}>
				<AudioListProvider>
					<CurrentAudioProvider>
						<App />
					</CurrentAudioProvider>
				</AudioListProvider>
			</Provider>
		</body>
	);
}
