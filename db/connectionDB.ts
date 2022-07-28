import mongoose from "mongoose";
import { logger } from "../logger";

// admin_user:password123@localhost:27017/my_database?authSource=admin

export const mongooseConnection = () => {
  try {
    return mongoose.connect(
      "mongodb://rootuser:rootpass@127.0.0.1:27017/users?authSource=admin",
      {}
    );
  } catch (error) {
    logger.error(error);
  }
};
