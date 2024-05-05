import axios, { isAxiosError } from "axios";
const api = "https://audio-playlist-ru.netlify.app/api";
const BackEndURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3099/api";

export async function GetAudioInfo(url: string) {
	try {
		const request = await axios.post(BackEndURL, {
			link: `${url}`,
		});
		const audioData = request.data;
		return audioData;
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response?.status == 400) {
				return null;
			} else {
				console.log(error);
				throw error;
			}
		}
	}
}
