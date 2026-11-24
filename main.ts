// One-Line Office Joke: 24-Hour Sprint
// Writes a single-line joke about office life to /output/entry.txt.
// Node 22 stdlib only. The joke follows the winning one-liner pattern:
// one concrete setup, then the agent acts on office tooling, and the
// kicker is an action — the meeting about declining meetings.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I set my agent to auto-decline meetings with no agenda. " +
  "It declined the standup, the retro, and the meeting about declining meetings.";

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry must end with sentence punctuation");
  }
}

function main(): void {
  validate(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  // Round-trip check: what landed on disk must be exactly the joke.
  const back = readFileSync(outPath, "utf8");
  if (back !== JOKE) {
    throw new Error("round-trip mismatch: entry.txt does not match the joke");
  }
  console.log(`wrote ${[...JOKE].length} characters to ${outPath}`);
}

main();
