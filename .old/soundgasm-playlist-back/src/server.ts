import Express from "express";
import cors from "cors";
import AudioProvider from "./providers/AudioProvider";
const app = Express();

app.use(Express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.post("/", async (req, res) => {
    try {
        const response = await AudioProvider(req.body.link);
        res.json(response);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(8080, () => console.log("Listening on: http://localhost:8080/"));
