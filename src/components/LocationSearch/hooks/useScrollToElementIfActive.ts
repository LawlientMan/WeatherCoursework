import { useEffect, useRef } from "react";

export const useScrollToElementIfActive = (isActive: boolean) => {
    const ref = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        if (isActive) {
            ref.current?.scrollIntoView({ block: "nearest" });
        }
    }, [isActive]);

    return ref;
} 