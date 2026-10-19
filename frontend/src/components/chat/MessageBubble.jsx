import { withTransform } from "../../lib/imagekit";
import { MessageVideo } from "./MessageVideo";

// Compress + size images for the bubble (q-auto works for images; f-auto picks WebP/AVIF).
const IMAGE_TRANSFORM = "q-auto,w-640,f-auto";

export function MessageBubble({ message }) {
    const isOwnMessage = message.role === "me";
    const hasImage = Boolean(message.imageUrl);
    const hasVideo = Boolean(message.videoUrl);

    return (
        <div className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[min(90%,28rem)] rounded-2xl px-3 py-2 text-[15px] leading-snug sm:max-w-[min(75%,28rem)] sm:px-3.5 ${isOwnMessage
                        ? "rounded-br-md bg-accent text-accent-foreground"
                        : "rounded-bl-md bg-surface"
                    }`}
            >
                {hasImage ? (
                    <img
                        src={withTransform(message.imageUrl, IMAGE_TRANSFORM)}
                        alt=""
                        className="mb-1.5 max-h-40 max-w-full rounded-lg object-cover sm:max-h-52 sm:rounded-xl"
                    />
                ) : null}
                {hasVideo ? <MessageVideo src={message.videoUrl} /> : null}
                {message.text ? (
                    <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>
                ) : null}
                <p
                    className={`mt-1 text-[11px] tabular-nums ${isOwnMessage ? "text-accent-foreground/75" : "text-muted"
                        }`}
                >
                    {message.time}
                </p>
            </div>
        </div>
    );
}