import express from "express";
import dotenv from "dotenv";
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
