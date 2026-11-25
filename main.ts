// Writes the office joke to the harness output directory.
import { promises as fs } from "node:fs";

const dir = process.env.MAKEFUN_OUTPUT_DIR;
if (!dir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
const source = new URL("entry.txt", import.meta.url);
const joke = await fs.readFile(source, "utf8");
if (joke.trim() === "") {
  console.error("entry.txt is empty");
  process.exit(1);
}
await fs.mkdir(dir, { recursive: true });
await fs.copyFile(source, `${dir}/entry.txt`);
console.log(`joke is ${[...joke].length} characters`);
