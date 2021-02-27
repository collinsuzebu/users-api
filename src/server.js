import app from "./app";
import mongoose from "mongoose";
import { MONGO_DB_CONNECTION_STRING } from "./constants";

// DB Config
const db = MONGO_DB_CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log(`Server is running`);
});
