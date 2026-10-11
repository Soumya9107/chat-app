import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query
 */
export function useMediaQuery(query) {
    return useSyncExternalStore(
        (onChange) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        () => false,
    );
}