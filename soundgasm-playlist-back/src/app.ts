import axios from "axios";
import * as cheerio from "cheerio";

const url = "https://soundgasm.net/u/v_silvermoon/Thank-you-for-3-years-lets-celebrate";

export async function GetAudioInfo(url: string) {
    const html = (await axios.get(url)).data;

    const Reg = new RegExp("(?<=sounds/)(.*)(?=.m4a)", "gmi");
    const rawAudioId = cheerio.load(html)("script").text().match(Reg);
    const rawAudioLink =
        rawAudioId != null ? `https://media.soundgasm.net/sounds/${rawAudioId[0]}.m4a` : null;

    const title = cheerio.load(html)(".jp-title").text();

    return { title: title, audioLink: rawAudioLink };
}
