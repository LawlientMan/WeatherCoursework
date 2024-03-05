import { Dispatch, useState } from "react";

export const useListKeyboardNavigation = (countItems: number | null): 
[(e: React.KeyboardEvent) => void, number, React.Dispatch<React.SetStateAction<number>>] => {
    const [activeOption, setActiveOption] = useState<number>(-1);
    console.log("countItems" + countItems)

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!countItems || countItems == 0) return;

        console.log(" data.length" + countItems)
        if (e.key === 'ArrowUp') {
            console.log(" ArrowUp" + activeOption)

            e.preventDefault();
            if (activeOption <= 0)
                return;
            setActiveOption(activeOption - 1);

            console.log(" ArrowUp2" + activeOption)


        } else if (e.key === 'ArrowDown') {
            console.log(" ArrowDown" + activeOption)

            e.preventDefault();
            if (activeOption >= countItems - 1)
                return;
            setActiveOption(activeOption + 1);

            console.log(" ArrowDown2" + activeOption)
        } else if (e.key === "Tab" && e.shiftKey) {

            if (activeOption <= 0) {
                setActiveOption(countItems - 1);
            }
            else {
                setActiveOption(activeOption - 1);
            }

            console.log(" Tab and shift" + activeOption)

            e.preventDefault();
        } else if (e.key === "Tab") {

            if (activeOption >= countItems - 1) {
                setActiveOption(0);
            }
            else {
                setActiveOption(activeOption + 1);
            }

            console.log(" Tab" + activeOption)

            e.preventDefault();
        } else if (e.key === "Escape") {
            setActiveOption(-1);
            console.log(" Esc" + activeOption)
            e.preventDefault();
        } else if (e.shiftKey) {
            e.preventDefault();
        }
    };

    return [onKeyDown, activeOption, setActiveOption];
};