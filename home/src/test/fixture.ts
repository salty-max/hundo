import { readFileSync } from "node:fs";
import { deserialize } from "node:v8";
import { inject } from "vitest";
import type { Made } from "../plugin";

declare module "vitest" {
  interface ProvidedContext {
    homePage: string;
  }
}

/** Each worker gets its own Map and Buffers, generated fresh by the run's global setup. */
export const homePage = (): Made => deserialize(readFileSync(inject("homePage")));
