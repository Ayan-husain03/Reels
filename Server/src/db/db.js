import mongoose, { connect } from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("error in mongodb connection", error);
  }
}

export default connectDb;
