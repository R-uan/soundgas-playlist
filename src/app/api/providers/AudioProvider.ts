import IAudio from "@/app/scripts/IAudio";
import KemonoProvider from "./KemonoProvider";
import SoundgasmProvider from "./SoundgasmProvider";

const KemonoReg = new RegExp("kemono.su/data", "gi");
const SoundgasmReg = new RegExp("soundgasm.net", "gi");

export default async function AudioProvider(url: string) {
    const KemonoMatch = url.match(KemonoReg);
    const SoundgasmMatch = url.match(SoundgasmReg);
    try {
        if (SoundgasmMatch) {
            const Soundgasm = await SoundgasmProvider(url);
            return Soundgasm;
        } else if (KemonoMatch) {
            const Kemono: IAudio = KemonoProvider(url);
            return Kemono;
        }
    } catch (error) {
        throw error;
    }
}
