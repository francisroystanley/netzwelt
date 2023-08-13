import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => console.log(`Server is running on port ${port}.`));
