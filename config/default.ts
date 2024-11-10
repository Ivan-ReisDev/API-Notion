import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.SERVER_PORT || 3001,
    NOTION_ID: process.env.NOTION_DATABASE_ID || "",
    NOTION_API_KEY: process.env.NOTION_API_KEY || ""
}