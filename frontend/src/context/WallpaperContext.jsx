import { useEffect, useState } from "react";
import { frameStyleFromUrl, getWallpaperById } from "../data/wallpapers";
import { WallpaperContext } from "./wallpaper";

const STORAGE_KEY = "chat-wallpaper-id";

function readStoredWallpaperId() {
    const wallpaperId = localStorage.getItem(STORAGE_KEY);
    if (wallpaperId) return wallpaperId;

    return "sonoma-horizon";
}

export function WallpaperProvider({ children }) {
    const [wallpaperId, setWallpaperIdState] = useState(readStoredWallpaperId);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, wallpaperId);
    }, [wallpaperId]);

    const wallpaper = getWallpaperById(wallpaperId);

    const setWallpaperId = (id) => {
        setWallpaperIdState(id);
    };

    const frameStyle = frameStyleFromUrl(wallpaper.url);

    return (
        <WallpaperContext.Provider value={{ wallpaperId, setWallpaperId, wallpaper, frameStyle }}>
            {children}
        </WallpaperContext.Provider>
    );
}