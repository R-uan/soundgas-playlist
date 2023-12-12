import Express from "express";
import cors from "cors";
import { GetAudioInfo } from "./app";
const app = Express();

app.use(Express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.post("/", async (req, res) => {
    res.json(await GetAudioInfo(req.body.link));
});

app.listen(8080, () => {
    console.log("Yepi");
});
