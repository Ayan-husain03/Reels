import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

connectDb();
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
app.listen(3000, () => {
  console.log(`you server is running on 3000`);
});
