import { createContext, useContext } from "react";
import { DEFAULT_THEME_PRESET_ID, HERO_UI_THEME_PRESETS } from "../data/herouiThemePresets";

export const ThemeContext = createContext(null);

const PRESET_IDS = new Set(HERO_UI_THEME_PRESETS.map((p) => p.id));

export function isValidThemePreset(presetId) {
    return PRESET_IDS.has(presetId);
}

/** apply preset to `<html>` immediately so `--accent` updates before paint. */
export function applyThemePresetToDocument(presetId) {
    const id = isValidThemePreset(presetId) ? presetId : DEFAULT_THEME_PRESET_ID;
    document.documentElement.setAttribute("data-theme-preset", id);
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}