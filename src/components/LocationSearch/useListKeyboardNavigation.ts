import { useState } from "react";

export const useListKeyboardNavigation = (countItems: number | null):
    [(e: React.KeyboardEvent) => void, number, () => void] => {
    const [activeOption, setActiveOption] = useState<number>(-1);

    const canNavigate = () => countItems && countItems > 0;
    const resetActiveOption = () => setActiveOption(-1);

    const moveUp = (jumpToEnd: boolean = false) => {      
        if (!canNavigate) return;
        
        if (activeOption > 0) {
            setActiveOption(activeOption - 1);
        } 
        else if(jumpToEnd){
            setActiveOption(countItems! - 1);
        }
    }

    const moveDown = (jumpToStart: boolean = false) => {      
        if (!canNavigate) return;
        
        if (activeOption < countItems! - 1) {
            setActiveOption(activeOption + 1);
        } 
        else if(jumpToStart){
            setActiveOption(0);
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!canNavigate) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveUp();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveDown();
        } else if (e.key === "Tab") {
            e.preventDefault();
            e.shiftKey ? moveUp(true) : moveDown(true);
        } else if (e.key === "Escape") {
            e.preventDefault();
            resetActiveOption();
        }
    };

    return [onKeyDown, activeOption, resetActiveOption];
};