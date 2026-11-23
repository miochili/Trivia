import type { PackApi } from "../generate";
import geography from "./geography";
import history from "./history";
import science from "./science";
import art from "./art";
import popculture from "./pop_culture";
import sports from "./sports";
import food from "./food";
import nature from "./nature";
import media from "./media";
import extras from "./extras";
import media2 from "./media2";
import extras2 from "./extras2";

/** Question packs, run after the built-in families. Each fills one category. */
export const PACKS: ((api: PackApi) => void)[] = [geography, history, science, art, popculture, sports, food, nature, media, extras, media2, extras2];
