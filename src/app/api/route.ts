import AudioProvider from "./providers/AudioProvider";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { link } = body;
		const data = await AudioProvider(link);
		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "given url invalid" }, { status: 418 });
	}
}
