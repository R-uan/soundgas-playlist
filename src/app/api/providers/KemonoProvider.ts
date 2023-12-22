import IAudio from "@/app/scripts/IAudio";

export default function KemonoProvider(url: string): IAudio {
    return {
        originalUrl: url,
        performer: "Kemono Performer",
        rawAudioUrl: url,
        title: `Kemono Audio`,
    };
}
