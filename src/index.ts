import express from "express";
import morgan from "morgan";
import itemRoutes from "./routes/items.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/items", itemRoutes);
app.use(errorHandler);
app.listen(3000, () => console.log(`Server is running on port: 3000 `));
