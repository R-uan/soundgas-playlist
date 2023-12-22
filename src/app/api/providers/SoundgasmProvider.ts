import axios from "axios";
import * as cheerio from "cheerio";
import IAudio from "@/app/scripts/IAudio";

export default async function SoundgasmProvider(url: string): Promise<IAudio> {
    try {
        const HTML = (await axios.get(url)).data;
        const Performer = GetPeformer(url);
        const RawAudio = GetRawAudio(HTML);
        const AudioTitle = cheerio.load(HTML)(".jp-title").text();

        const audioData: IAudio = {
            title: AudioTitle,
            performer: Performer!,
            originalUrl: url,
            rawAudioUrl: RawAudio,
        };
        return audioData;
    } catch (error) {
        throw error;
    }
}

function GetPeformer(url: string) {
    const Reg = new RegExp("(?<=https://soundgasm.net/u/)(.*)(?=/)", "gi");
    const Match = url.match(Reg);
    if (Match === null) throw new Error("Invalid URL: performer not found");
    return Match[0];
}

function GetRawAudio(html: any) {
    const Reg = new RegExp("(?<=sounds/)(.*)(?=.m4a)", "gmi");
    const AudioId = cheerio.load(html)("script").text().match(Reg);
    if (AudioId === null) throw new Error("Invalid URL: AudioId not found.");
    const AudioUrl = `https://media.soundgasm.net/sounds/${AudioId[0]}.m4a`;
    return AudioUrl;
}
