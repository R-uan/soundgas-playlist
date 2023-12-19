import Express from "express";
import cors from "cors";
import { GetAudioInfo } from "./app";
const app = Express();

app.use(Express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.post("/", async (req, res) => {
    try {
        res.json(await GetAudioInfo(req.body.link));
    } catch (error) {
        res.status(400).send("Invalid link");
    }
});

app.listen(8080, () => console.log("Listening on: http://localhost:8080/"));
