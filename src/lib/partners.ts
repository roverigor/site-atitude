import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Partner } from "@/types/course";

const FILE = path.join(process.cwd(), "src/data/partners.yaml");

export function getAllPartners(): Partner[] {
  const content = fs.readFileSync(FILE, "utf-8");
  return yaml.load(content) as Partner[];
}
