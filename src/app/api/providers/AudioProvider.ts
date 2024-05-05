import IAudio from "@/app/scripts/IAudio";
import KemonoProvider from "./KemonoProvider";
import SoundgasmProvider from "./SoundgasmProvider";

const KemonoReg = new RegExp("kemono.su/data", "gi");
const SoundgasmReg = new RegExp("soundgasm.net", "gi");

export default async function AudioProvider(url: string) {
	const KemonoMatch = url.match(KemonoReg);
	const SoundgasmMatch = url.match(SoundgasmReg);
	const AudioTypes = [".mp3", ".wav", ".ogg", ".aac", ".flac"];
	try {
		if (SoundgasmMatch) {
			const Soundgasm: IAudio = await SoundgasmProvider(url);
			return Soundgasm;
		} else if (KemonoMatch) {
			const Kemono: IAudio = KemonoProvider(url);
			return Kemono;
		} else if (AudioTypes.includes(url.split(".")[url.split(".").length - 1])) {
			return {
				originalUrl: url,
				rawAudioUrl: url,
				title: "Generic Audio",
				performer: "Not Informed",
			};
		}
	} catch (error) {
		throw error;
	}
}
