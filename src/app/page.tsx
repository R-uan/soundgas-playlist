"use client";
import { store } from "./states/store";
import { Provider } from "react-redux";
import App from "@/app/components/App";
import AudioListProvider from "./contexts/PlaylistProvider";

export default function Home() {
	return (
		<Provider store={store}>
			<AudioListProvider>
				<App />
			</AudioListProvider>
		</Provider>
	);
}
