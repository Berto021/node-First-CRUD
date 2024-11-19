import "dotenv/config";
import postgres from "postgres";

//process.env

export const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
