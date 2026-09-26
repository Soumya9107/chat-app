import { LoaderIcon } from "lucide-react";
import { APP_NAME, AppLogo } from "./AppLogo";

const PageLoader = () => {
    return (
        <div className="flex h-dvh items-center justify-center bg-background text-foreground">
            <div className="flex flex-col items-center gap-4">
                <AppLogo size={44} className="rounded-xl" />

                <div className="flex items-center gap-2 text-sm font-medium text-muted">
                    <LoaderIcon className="size-4 animate-spin text-accent" aria-hidden />
                    <span>Loading {APP_NAME}</span>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;