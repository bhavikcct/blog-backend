import dotenv from "dotenv";
import { connectDB } from "./config/db";
import category from "./models/category";
import categoryData from "./data/categoryseed.json";

dotenv.config();

const seed = async () => {
  await connectDB();

  await category.deleteMany({});
  await category.insertMany(categoryData);

  console.log("✅ Category seeding done");
  process.exit(0);
};

seed();
