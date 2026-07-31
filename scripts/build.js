import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");

rmSync(output, { force: true, recursive: true });
mkdirSync(output, { recursive: true });

cpSync(resolve(root, "index.html"), resolve(output, "index.html"));
cpSync(resolve(root, "src"), resolve(output, "src"), { recursive: true });
cpSync(resolve(root, "public"), resolve(output, "public"), { recursive: true });

console.log("Static site prepared in dist/");
