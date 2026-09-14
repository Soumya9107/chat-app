import { createContext, useContext } from "react";

export const WallpaperContext = createContext(null);

export function useWallpaper() {
    const ctx = useContext(WallpaperContext);

    if (!ctx) {
        throw new Error("useWallpaper must be used within WallpaperProvider");
    }
    return ctx;
}