import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);

export default app;
