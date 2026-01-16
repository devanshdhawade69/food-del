import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://devansh_db_user:Devansh1610_123@cluster0.ftcrm0w.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
