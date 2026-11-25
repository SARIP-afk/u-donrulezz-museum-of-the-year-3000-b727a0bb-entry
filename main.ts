// Write one museum label from the year 3000 to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The line is a fixed
// string: the program writes exactly these bytes on every run.
//
// The line (124 chars, 124 bytes) won an 8-candidate head-to-head against
// the judge brief: a CAPTCHA filed as a "Humanity Test", and the year-3000
// curator reports, straight-faced, that the machines passed it and the
// humans did not — a true absurdity about what the thing was for, with the
// punch in the last two sentences. Runner-up was the Close Door button.
// Full comparison:
// u-donrulezz-museum-of-the-year-3000-b727a0bb-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Humanity Test, 2024. Citizens proved they were human by identifying traffic lights. The machines passed. The humans did not.";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
// Count code points, not UTF-16 units, so the mirror matches the gate's
// character count exactly even for characters outside the BMP.
// Note: no trailing newline — writeFileSync writes exactly LINE, so the
// gated file is 124 chars / 124 bytes, matching the char count the gate
// measures.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${charCount} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf-8" });
