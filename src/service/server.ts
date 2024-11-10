import express  from "express";
import config from "config";
import router from "../router/router";

const port = config.get<number>("PORT");

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(port, async () => {
        console.log(`Application online : http://localhost:${port}`)
});