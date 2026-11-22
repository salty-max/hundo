import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { serialize } from "node:v8";
import type { TestProject } from "vitest/node";
import { make } from "../plugin";

/** Encode the real assets once before workers start, rather than once per suite competing for the same CPU. */
export default async function setup(project: TestProject) {
  const directory = mkdtempSync(join(tmpdir(), "hundo-home-tests-"));
  const path = join(directory, "page.bin");
  const refresh = async () => writeFileSync(path, serialize(await make()));
  try {
    await refresh();
    project.provide("homePage", path);
    project.onTestsRerun(refresh);
  } catch (error) {
    rmSync(directory, { recursive: true, force: true });
    throw error;
  }
  return () => rmSync(directory, { recursive: true, force: true });
}
