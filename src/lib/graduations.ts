import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { GraduationEvent } from "@/types/course";

const FILE = path.join(process.cwd(), "src/data/graduations.yaml");

export function getAllGraduations(): GraduationEvent[] {
  const content = fs.readFileSync(FILE, "utf-8");
  return yaml.load(content) as GraduationEvent[];
}

export function getGraduationsByType(type: string): GraduationEvent[] {
  return getAllGraduations().filter((g) => g.tipo === type);
}
