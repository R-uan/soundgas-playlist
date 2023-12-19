import axios from "axios";

export async function GetAudioInfo(url: string) {
    const audio = (await axios.post("http://localhost:8080/", { link: `${url}` })).data;
    return audio;
}
