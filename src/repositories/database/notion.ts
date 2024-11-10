import config from "config";
import { Client } from "@notionhq/client";

const NOTION_API_KEY = config.get<string>("NOTION_API_KEY");
const notion = new Client({ auth: NOTION_API_KEY || "" });

export default notion;