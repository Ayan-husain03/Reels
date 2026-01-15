import app from "./src/app.js";
import connectDb from "./src/db/db.js";
import dotenv from "dotenv";
dotenv.config("/.env");

connectDb();
app.listen(3000, () => {
  console.log(`you server is running on 3000`);
});
