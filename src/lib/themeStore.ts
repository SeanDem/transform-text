import { writable } from "svelte/store";
import type { Theme } from "./themes";

export const themeStore = writable<Theme>();
