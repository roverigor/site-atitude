import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { TeamMember } from "@/types/course";

const FILE = path.join(process.cwd(), "src/data/team.yaml");

export function getAllTeamMembers(): TeamMember[] {
  const content = fs.readFileSync(FILE, "utf-8");
  const members = yaml.load(content) as TeamMember[];
  return members.sort((a, b) => a.ordem - b.ordem);
}
