import { Dispatch, useState } from "react";

export const useListKeyboardNavigation = (countItems: number | null):
    [(e: React.KeyboardEvent) => void, number, React.Dispatch<React.SetStateAction<number>>] => {
    const [activeOption, setActiveOption] = useState<number>(-1);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!countItems || countItems == 0) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();

            if (activeOption > 0) {
                setActiveOption(activeOption - 1);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();

            if (activeOption < countItems - 1) {
                setActiveOption(activeOption + 1);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();

            if (e.shiftKey) {
                if (activeOption <= 0) {
                    setActiveOption(countItems - 1);
                }
                else {
                    setActiveOption(activeOption - 1);
                }
            }
            else {
                if (activeOption >= countItems - 1) {
                    setActiveOption(0);
                }
                else {
                    setActiveOption(activeOption + 1);
                }
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            setActiveOption(-1);
        }
    };

    return [onKeyDown, activeOption, setActiveOption];
};