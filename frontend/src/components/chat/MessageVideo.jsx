import { isImageKitUrl, withTransform } from "../../lib/imagekit";

// Chat videos are stored on ImageKit, so we let ImageKit optimize delivery
// on the fly via URL transformations (compressed + sized for the bubble).
// Note: q-auto isn't enabled for video on this account (returns 400), so use a fixed quality.
// https://imagekit.io/docs/video-transformation
const VIDEO_TRANSFORM = "q-80,w-640";
const POSTER_TRANSFORM = "q-80,w-640";

/** ImageKit can extract a poster frame by appending `/ik-thumbnail.jpg`. */
function buildPosterUrl(url) {
    if (!isImageKitUrl(url)) return undefined;
    const [path] = url.split("?");
    return withTransform(`${path}/ik-thumbnail.jpg`, POSTER_TRANSFORM);
}

/** ImageKit-optimized chat video with an auto-generated poster frame. */
export function MessageVideo({ src }) {
    const optimizedSrc = withTransform(src, VIDEO_TRANSFORM);
    const posterSrc = buildPosterUrl(src);

    return (
        <video
            src={optimizedSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
            className="mb-1.5 max-h-52 max-w-full rounded-lg object-contain sm:max-h-64 sm:rounded-xl"
        />
    );
}