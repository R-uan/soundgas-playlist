import axios, { isAxiosError } from "axios";

export async function GetAudioInfo(url: string) {
    try {
        const request = await axios.post("http://localhost:8080/", { link: `${url}` });
        const audioData = request.data;
        return audioData;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status == 400) {
                return null;
            } else {
                throw error;
            }
        }
    }
}
