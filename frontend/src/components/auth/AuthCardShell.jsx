const cardClassName = [
    "relative overflow-hidden rounded-[1.75rem]",
    "border border-black/8 bg-white/75 backdrop-blur-2xl",
    "shadow-[0_32px_90px_-24px_rgba(0,0,0,0.18),0_0_1px_rgba(0,0,0,0.06)]",
    "dark:border-white/12 dark:bg-[#141416]/82",
    "dark:shadow-[0_40px_100px_-28px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
].join(" ");

export function AuthCardShell({ children }) {
    return (
        <div className="relative z-10 mx-auto w-full max-w-105">
            <div className="relative">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-[1.85rem] bg-linear-to-b from-white/70 via-white/15 to-transparent opacity-80 dark:from-white/15 dark:via-white/5 dark:opacity-100"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[1.8rem] shadow-[0_0_0_1px_rgba(255,255,255,0.55)_inset] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                />

                <div className={cardClassName}>
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-24 top-0 size-56 rounded-full bg-accent/12 blur-3xl dark:bg-accent/18"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent dark:via-accent/40"
                    />

                    <div className="relative px-8 pb-9 pt-10 sm:px-10 sm:pb-10 sm:pt-11">{children}</div>
                </div>
            </div>
        </div>
    );
}