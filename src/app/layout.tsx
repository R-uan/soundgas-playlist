import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Soundgasm Playlist",
	description: "Audio Playlist for soundgasm and kemono audios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <html lang="en">{children}</html>;
}
