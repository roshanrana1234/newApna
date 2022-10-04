import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";

//import rotes
import userRoute from "./routes/user.js";
import customerRoute from "./routes/customer.js";
import adminRoute from "./routes/admin.js";

const port = process.env.PORT || "5000";
const DATABASE_URL =
  "mongodb+srv://pratham:lookman17@cluster1.vuxzs.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://roshan:lookman17@cluster0.1pjnl.mongodb.net/?retryWrites=true&w=majority

connectDB(DATABASE_URL);
export const app = express();

//  app.use(cookieParser())
app.use(express.json());
dotenv.config({ path: "./config.env" });
app.use(cors());

app.use(express.urlencoded({ extended: true }));

//rout
app.use("/api", userRoute);
app.use("/api", customerRoute);
app.use("/api", adminRoute);

app.listen(port, () => {
  console.log(`local host:${port}`);
});
